const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Import Cloudinary storage
const upload = multer({ storage }); // Initialize multer

// Import all your models
const Project = require('../models/project.model');
const Contractor = require('../models/contractor.model');
const User = require('../models/user.model');

// @route   GET /api/admin/dashboard-summary
// @desc    Get summary data for admin dashboard
// @access  Private, Admin
router.get('/dashboard-summary', [auth, admin], async (req, res) => {
    try {
        const projectCount = await Project.countDocuments();
        const contractorCount = await Contractor.countDocuments();
        const userCount = await User.countDocuments();
        res.json({ projectCount, contractorCount, userCount });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private, Admin
router.get('/users', [auth, admin], async (req, res) => {
    try {
        // Populating the full contractorProfile to get all details
        const users = await User.find().populate('contractorProfile');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private, Admin
router.put('/users/:id/role', [auth, admin], async (req, res) => {
    try {
        const { role } = req.body;
        if (role !== 'admin' && role !== 'contractor') {
            return res.status(400).json({ msg: 'Invalid role.' });
        }
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/users/:id
// @desc    Update a user's full details
// @access  Private, Admin
router.put('/users/:id', [auth, admin, upload.fields([{ name: 'dpImageFile', maxCount: 1 }, { name: 'fullImageFile', maxCount: 1 }])], async (req, res) => {
    const { name, email, username, phone, password, role, companyRole, description, quotes } = req.body;
    
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update User model fields
        if (email) user.email = email;
        if (username) user.username = username;
        if (phone) user.phone = phone;
        if (role) user.role = role;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        await user.save();

        // Update associated Contractor model fields
        const contractorProfileUpdates = {
            name,
            companyRole,
            description,
            quotes,
            contact: { email, num: phone }
        };

        // Check for uploaded files and add to updates
        if (req.files['dpImageFile']) {
            contractorProfileUpdates.dpimageurl = req.files['dpImageFile'][0].path;
        }
        if (req.files['fullImageFile']) {
            contractorProfileUpdates.fullimageurl = req.files['fullImageFile'][0].path;
        }

        await Contractor.findByIdAndUpdate(user.contractorProfile, contractorProfileUpdates);

        res.json({ msg: 'User updated successfully' });

    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) { // Handle duplicate key errors
            return res.status(400).json({ msg: 'Email, username, or phone number is already in use.' });
        }
        res.status(500).send('Server Error');
    }
});


// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private, Admin
router.delete('/users/:id', [auth, admin], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Also delete the associated contractor profile
        await Contractor.findByIdAndDelete(user.contractorProfile);
        await User.findByIdAndDelete(req.params.id);
        
        res.json({ msg: 'User and associated profile removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/admin/users
// @desc    Add a new user by an admin
// @access  Private, Admin
router.post('/users', [auth, admin, upload.fields([{ name: 'dpImageFile', maxCount: 1 }, { name: 'fullImageFile', maxCount: 1 }])], async (req, res) => {
    const { name, email, username, phone, password, role, companyRole, description, quotes } = req.body;

    if (!username && !email && !phone) {
        return res.status(400).json({ msg: 'Please enter a username, email, or phone number.' });
    }
     if (!password) {
        return res.status(400).json({ msg: 'Password is required.' });
    }

    try {
        let userQuery = [];
        if (email) userQuery.push({ email });
        if (username) userQuery.push({ username });
        if (phone) userQuery.push({ phone });

        if (userQuery.length > 0) {
            const existingUser = await User.findOne({ $or: userQuery });
            if (existingUser) {
                 return res.status(400).json({ msg: 'A user with this email, username, or phone already exists.' });
            }
        }

        const contractorData = { 
            name: name || 'New User', 
            companyRole, 
            description, 
            quotes, 
            contact: { email, num: phone } 
        };
        if (req.files['dpImageFile']) {
            contractorData.dpimageurl = req.files['dpImageFile'][0].path;
        }
        if (req.files['fullImageFile']) {
            contractorData.fullimageurl = req.files['fullImageFile'][0].path;
        }

        const newContractor = new Contractor(contractorData);
        const contractor = await newContractor.save();

        const newUser = new User({
            email, username, phone, password,
            role: role || 'contractor',
            contractorProfile: contractor._id
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();

        res.status(201).json({ msg: 'User created successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

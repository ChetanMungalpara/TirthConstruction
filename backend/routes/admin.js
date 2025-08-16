
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

// Import all your models
const Project = require('../models/project.model');
const Contractor = require('../models/contractor.model');
const User = require('../models/user.model');
// ... import other models as needed

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
        const users = await User.find().populate('contractorProfile', 'name');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user role
// @access  Private, Admin
router.put('/users/:id', [auth, admin], async (req, res) => {
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

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private, Admin
router.delete('/users/:id', [auth, admin], async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
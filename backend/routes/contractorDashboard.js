const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const Project = require('../models/project.model');
const Contractor = require('../models/contractor.model');
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Import our Cloudinary storage config
const upload = multer({ storage }); // Initialize multer with our storage config

// @route   GET /api/contractor-dashboard/my-projects
// @desc    Get all projects for the logged-in contractor
// @access  Private
router.get('/my-projects', auth, async (req, res) => {
    try {
        const projects = await Project.find({ contractorIds: req.user.contractorId });
        res.json(projects);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/contractor-dashboard/my-profile
// @desc    Update the logged-in contractor's own profile (text-based fields)
// @access  Private
router.put('/my-profile', auth, async (req, res) => {
    try {
        const contractor = await Contractor.findById(req.user.contractorId);
        if (!contractor) {
            return res.status(404).json({ msg: 'Contractor profile not found' });
        }
        
        const { role, ...updatableData } = req.body;

        const updatedContractor = await Contractor.findByIdAndUpdate(
            req.user.contractorId,
            { $set: updatableData },
            { new: true }
        );
        res.json(updatedContractor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/contractor-dashboard/upload-dp
// @desc    Upload a new display picture for the logged-in contractor
// @access  Private
router.post('/upload-dp', [auth, upload.single('dpimage')], async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded.' });
        }
        
        // req.file.path contains the secure URL from Cloudinary
        const contractor = await Contractor.findByIdAndUpdate(
            req.user.contractorId,
            { dpimageurl: req.file.path },
            { new: true }
        );

        res.json({ 
            msg: 'Display picture updated successfully!',
            dpimageurl: contractor.dpimageurl 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/contractor-dashboard/upload-full-image
// @desc    Upload a new full image for the logged-in contractor
// @access  Private
router.post('/upload-full-image', [auth, upload.single('fullimage')], async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded.' });
        }
        
        const contractor = await Contractor.findByIdAndUpdate(
            req.user.contractorId,
            { fullimageurl: req.file.path },
            { new: true }
        );

        res.json({ 
            msg: 'Full image updated successfully!',
            fullimageurl: contractor.fullimageurl 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
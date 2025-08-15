// TirthConstruction/backend/routes/contractorDashboard.js
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const Project = require('../models/project.model');
const Contractor = require('../models/contractor.model');

// @route   GET /api/contractor-dashboard/my-projects
// @desc    Get all projects for the logged-in contractor
// @access  Private
router.get('/my-projects', auth, async (req, res) => {
    try {
        // req.user.contractorId comes from the JWT
        const projects = await Project.find({ contractorIds: req.user.contractorId });
        res.json(projects);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/contractor-dashboard/my-profile
// @desc    Update the logged-in contractor's own profile
// @access  Private
router.put('/my-profile', auth, async (req, res) => {
    try {
        const contractor = await Contractor.findById(req.user.contractorId);
        if (!contractor) {
            return res.status(404).json({ msg: 'Contractor profile not found' });
        }
        
        // Update fields from req.body
        const updatedContractor = await Contractor.findByIdAndUpdate(
            req.user.contractorId,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedContractor);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


// Add other contractor-specific routes here (e.g., create a project)
// Always protect them with [auth]

module.exports = router;
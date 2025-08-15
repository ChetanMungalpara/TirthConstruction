// TirthConstruction/backend/routes/admin.js
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

// Example: Admin can create a new contractor profile
// @route   POST /api/admin/contractors
// @desc    Create a new contractor
// @access  Private, Admin
router.post('/contractors', [auth, admin], async (req, res) => {
    // ... logic to create a new Contractor ...
    res.json({ msg: "Contractor created by admin" });
});


// Add all other full-CRUD routes for Admin here (Projects, Users, Events, etc.)
// Always protect them with [auth, admin]

module.exports = router;
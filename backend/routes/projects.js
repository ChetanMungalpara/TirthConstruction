// TirthConstruction/backend/routes/projects.js
const router = require('express').Router();
let Project = require('../models/project.model');

// --- GET ALL PROJECTS (No change here) ---
router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

// --- GET A SINGLE PROJECT BY ITS ID (Modify this route) ---
router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
        // ADD THE .populate() CALLS HERE
        .populate('contractorIds', 'name role dpimageurl') // Populates contractors, but only includes their name, role, and image URL fields.
        .populate('statusId')     // Populates the entire 'Status' document.
        .populate('typeId')       // Populates the entire 'TypeOfWork' document.
        .then(project => {
            if (!project) {
                return res.status(404).json('Error: Project not found');
            }
            res.json(project);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
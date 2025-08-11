const router = require('express').Router();
let Project = require('../models/project.model');

// --- GET ALL PROJECTS ---
// Handles GET requests to the URL: /api/projects/
router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

// --- GET A SINGLE PROJECT BY ITS CUSTOM ID ---
// Handles GET requests to URLs like: /api/projects/P0001
router.route('/:id').get((req, res) => {
    Project.findOne({ id: req.params.id }) // Use findOne with your custom 'id' field
        .then(project => {
            if (!project) {
                return res.status(404).json('Error: Project not found');
            }
            res.json(project);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// You can add routes for adding, updating, and deleting projects here later
// for your contractor dashboard.
// router.route('/add').post(...)
// router.route('/update/:id').post(...)
// router.route('/delete/:id').delete(...)

module.exports = router;
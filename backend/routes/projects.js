
const router = require('express').Router();
let Project = require('../models/project.model');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
// --- GET ALL PROJECTS (No change here) ---
router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

// --- GET A SINGLE PROJECT BY ITS ID (Modify this route) ---
router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
        .populate('contractorIds', 'name role dpimageurl') 
        .populate('statusId')     
        .populate('typeId')       
        .then(project => {
            if (!project) {
                return res.status(404).json('Error: Project not found');
            }
            res.json(project);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
// @route   POST /api/projects/add
// @desc    Add a new project
// @access  Private
router.post('/add', [auth, admin], async (req, res) => {
    try {
        const projectData = req.body;
        delete projectData._id; // Ensure _id is removed

        const newProject = new Project(projectData);
        const project = await newProject.save();
        res.status(201).json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/projects/update/:id
// @desc    Update a project
// @access  Private
router.put('/update/:id', [auth, admin], async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // This option returns the document after the update
        );
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE /api/projects/delete/:id
// @desc    Delete a project
// @access  Private
router.delete('/delete/:id', [auth, admin], async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        await project.deleteOne(); // Use deleteOne() on the document
        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
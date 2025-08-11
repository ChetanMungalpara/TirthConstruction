
const router = require('express').Router();
let TypeOfWork = require('../models/typeOfWork.model');

// This handles GET requests to http://localhost:5000/api/work-types/
router.route('/').get((req, res) => {
    TypeOfWork.find()
        .then(workTypes => res.json(workTypes))
        .catch(err => res.status(400).json('Error: ' + err));
});

// We can add routes for adding new types later
// router.route('/add').post(...)

module.exports = router;
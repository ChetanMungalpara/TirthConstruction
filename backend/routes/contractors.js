const router = require('express').Router();
let Contractor = require('../models/contractor.model');

// Handles GET requests to /api/contractors/
router.route('/').get((req, res) => {
    Contractor.find()
        .then(contractors => res.json(contractors))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
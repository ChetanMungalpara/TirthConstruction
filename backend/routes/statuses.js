
const router = require('express').Router();
let Status = require('../models/status.model');

router.route('/').get((req, res) => {
    Status.find()
        .then(statuses => res.json(statuses))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

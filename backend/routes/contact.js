
const router = require('express').Router();
let ContactFormSubmission = require('../models/contactForm.model');

// Handles POST requests to /api/contact/submit
router.route('/submit').post((req, res) => {
    const { name, email, phone, message } = req.body;

    const newSubmission = new ContactFormSubmission({
        name,
        email,
        phone,
        message,
    });

    newSubmission.save()
        .then(() => res.json('Message submitted successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

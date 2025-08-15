// TirthConstruction/backend/routes/dashboard.js
const router = require('express').Router();
const auth = require('../middleware/auth.middleware'); // <-- Import the guard
const User = require('../models/user.model'); // To get user data

// @route   GET /api/dashboard/user
// @desc    Get current logged-in user's data
// @access  Private

// Here, 'auth' is our middleware. It runs *before* the main (req, res) function.
// If the token is invalid, the user will never even reach the main function.
router.get('/user', auth, async (req, res) => {
    try {
        // Because the 'auth' middleware ran successfully,
        // we have access to req.user.id
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
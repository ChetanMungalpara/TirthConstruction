
const router = require('express').Router();
const auth = require('../middleware/auth.middleware'); // <-- Import the guard
const User = require('../models/user.model'); // To get user data

// @route   GET /api/dashboard/user
// @desc    Get current logged-in user's data
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        // We add .populate() here to fetch the linked contractor details
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('contractorProfile');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
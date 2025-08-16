const router = require('express').Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user.model');
const auth = require('../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');

// Helper function to send OTP email
async function sendOtpEmail(email, otp) {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: `"Tirth Construction Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Verification OTP",
        html: `<p>Your One-Time Password (OTP) for verification is: <b>${otp}</b></p><p>This OTP will expire in 10 minutes.</p>`,
    });
    console.log("Message sent to real email: %s", info.messageId);
}

// @route   POST /api/user/request-verification
// @desc    Request an OTP to verify a new email or phone number
// @access  Private
router.post('/request-verification', [auth], async (req, res) => {
    // ... (This route remains the same as before)
    const { field, value } = req.body;
    if (!field || !value) {
        return res.status(400).json({ msg: 'Field and value are required.' });
    }
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return res.status(400).json({ msg: 'Invalid email format.' });
    }
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        const otp = crypto.randomInt(100000, 999999).toString();
        user.verificationOtp = await bcrypt.hash(otp, 10);
        user.verificationOtpExpires = Date.now() + 600000;
        if (field === 'email') {
            user.pendingEmail = value;
            await sendOtpEmail(value, otp);
        }
        await user.save();
        res.json({ msg: `OTP sent successfully to ${value}` });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ msg: `This ${field} is already in use.` });
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/user/confirm-verification
// @desc    Confirm the OTP and finalize the email/phone change
// @access  Private
router.post('/confirm-verification', [auth], async (req, res) => {
    // ... (This route remains the same as before)
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ msg: 'OTP is required.' });
    try {
        const user = await User.findOne({ _id: req.user.id, verificationOtpExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ msg: 'OTP is invalid or has expired.' });
        const isMatch = await bcrypt.compare(otp, user.verificationOtp);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid OTP.' });
        let updatedField = {};
        if (user.pendingEmail) {
            user.email = user.pendingEmail;
            updatedField = { field: 'email', value: user.email };
        }
        user.pendingEmail = undefined;
        user.verificationOtp = undefined;
        user.verificationOtpExpires = undefined;
        await user.save();
        res.json({ msg: 'Verification successful!', updatedField });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/user/account
// @desc    Update user's own account details (username, phone)
// @access  Private
router.put('/account', auth, async (req, res) => {
    const { username, phone } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        if (username) user.username = username;
        if (phone) user.phone = phone;
        await user.save();
        res.json({ msg: 'Account details updated successfully.' });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ msg: 'Username or phone already in use.' });
        res.status(500).send('Server Error');
    }
});

// --- NEW: Route to check username availability ---
// @route   POST /api/user/check-username
// @desc    Check if a username is already taken
// @access  Private
router.post('/check-username', auth, async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ msg: 'Username is required.' });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== req.user.id) {
            return res.status(400).json({ msg: 'Username is already taken.' });
        }
        res.json({ msg: 'Username is available!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- UPDATED: Password change route no longer requires old password ---
// @route   PUT /api/user/change-password
// @desc    Change user's own password
// @access  Private
router.put(
    '/change-password',
    [
        auth,
        check('newPassword', 'Password must be at least 8 characters and contain an uppercase letter, a lowercase letter, a number, and a special character.')
            .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { newPassword } = req.body;
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            await user.save();

            res.json({ msg: 'Password changed successfully.' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// --- NEW: Route to unlink Google account ---
// @route   PUT /api/user/unlink-google
// @desc    Unlink Google OAuth from user account
// @access  Private
router.put('/unlink-google', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.googleId = undefined;
        await user.save();
        res.json({ msg: 'Google account unlinked successfully.', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
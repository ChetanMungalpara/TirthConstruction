const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const User = require('../models/user.model');
const Contractor = require('../models/contractor.model');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

async function sendPasswordResetEmail(email, otp) {
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
        subject: "Your Password Reset OTP",
        html: `<p>Your One-Time Password (OTP) for resetting your password is: <b>${otp}</b></p><p>This OTP will expire in 10 minutes.</p>`,
    });
    console.log("Password Reset OTP sent to: %s", email);
}

// --- MANUAL REGISTRATION ---
router.post('/register', [auth, admin], async (req, res) => {
    // This route remains the same
    const { email, password, username, phone, contractorId, role } = req.body;
    try {
        const contractor = await Contractor.findById(contractorId);
        if (!contractor) return res.status(404).json({ msg: 'Contractor profile not found' });
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User with this email already exists' });
        user = new User({ email, password, username, phone, contractorProfile: contractorId, role: role || 'contractor' });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// --- MANUAL LOGIN ---
router.post('/login', async (req, res) => {
    // This route remains the same
    const { identifier, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }, { phone: identifier }] });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
        if (!user.password) return res.status(400).json({ msg: 'Please log in with Google.' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
        const payload = { user: { id: user.id, contractorId: user.contractorProfile, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// --- GOOGLE OAUTH ROUTES ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), (req, res) => {
    const payload = { user: { id: req.user.id, contractorId: req.user.contractorProfile, role: req.user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) throw err;
        res.redirect(`${process.env.FRONTEND_DASHBOARD_URL}?token=${token}`);
    });
});

// --- FORGOT PASSWORD - STEP 1: REQUEST OTP ---
router.post('/forgot-password', async (req, res) => {
    const { identifier } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
        if (!user) {
            return res.status(200).json({ msg: 'If an account with that identifier exists, an OTP has been sent.' });
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        user.resetPasswordOtp = await bcrypt.hash(otp, 10);
        user.resetPasswordOtpExpires = Date.now() + 600000;
        await user.save();
        if (user.email) {
            await sendPasswordResetEmail(user.email, otp);
        }
        res.json({ msg: 'If an account with that identifier exists, an OTP has been sent.' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// --- NEW COMBINED ROUTE for resetting password with OTP ---
// @route   POST /api/auth/reset-with-otp
// @desc    Verify OTP and set a new password in one step
router.post(
    '/reset-with-otp',
    [
        check('identifier', 'Identifier is required').not().isEmpty(),
        check('otp', 'OTP must be 6 digits').isLength({ min: 6, max: 6 }),
        check('password', 'Password must be at least 8 characters').isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { identifier, otp, password } = req.body;
        try {
            const user = await User.findOne({
                $or: [{ email: identifier }, { phone: identifier }],
                resetPasswordOtpExpires: { $gt: Date.now() } // Check if OTP is not expired
            });

            if (!user) {
                return res.status(400).json({ msg: 'Invalid OTP or session has expired. Please try again.' });
            }
            
            const isMatch = await bcrypt.compare(otp, user.resetPasswordOtp);
            if (!isMatch) {
                return res.status(400).json({ msg: 'The OTP you entered is incorrect.' });
            }

            // --- If OTP is valid, reset the password ---
            user.password = await bcrypt.hash(password, 10);
            user.resetPasswordOtp = undefined;
            user.resetPasswordOtpExpires = undefined;
            await user.save();

            // --- Log the user in by creating a session JWT ---
            const payload = { user: { id: user.id, contractorId: user.contractorProfile, role: user.role } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            
            res.json({ token });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// --- 2. FORGOT PASSWORD - STEP 2: VERIFY OTP ---
// @route   POST /api/auth/verify-otp
// @desc    Verify the OTP submitted by the user
router.post('/verify-otp', async (req, res) => {
    const { identifier, otp } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { phone: identifier }],
            resetPasswordOtpExpires: { $gt: Date.now() } // Check if OTP is not expired
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
        }

        const isMatch = await bcrypt.compare(otp, user.resetPasswordOtp);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
        }

        // OTP is correct. We can now allow a password reset.
        // For security, we'll sign a short-lived token that proves OTP verification.
        const payload = { user: { id: user.id } };
        const resetToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });

        res.json({ resetToken });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// --- 3. FORGOT PASSWORD - STEP 3: RESET PASSWORD ---
// @route   POST /api/auth/reset-password
// @desc    Set the new password using the reset token
router.post('/reset-password', async (req, res) => {
    const { resetToken, password } = req.body;

    if (!resetToken) {
        return res.status(401).json({ msg: 'No authorization token provided.' });
    }

    try {
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);

        if (!user) {
            return res.status(400).json({ msg: 'Invalid token. User not found.' });
        }

        // Hash new password
        user.password = await bcrypt.hash(password, 10);
        // Clear the OTP fields
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpires = undefined;
        
        await user.save();

        // Automatically log the user in by creating a standard session JWT
        const payload = { user: { id: user.id, contractorId: user.contractorProfile } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(401).json({ msg: 'Token is not valid or has expired.' });
    }
});


module.exports = router;

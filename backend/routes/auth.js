// This new file contains all authentication-related API endpoints.

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user.model');
const Contractor = require('../models/contractor.model'); // To link on registration




async function sendPasswordResetEmail(email, otp) {
    // IMPORTANT: Create a test account at https://ethereal.email/create
    // and add the credentials to your .env file.
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.ETHEREAL_USER,
            pass: process.env.ETHEREAL_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: '"Tirth Construction Support" <support@tirth.com>',
        to: email,
        subject: "Your Password Reset OTP",
        html: `<p>Your One-Time Password (OTP) for resetting your password is: <b>${otp}</b></p><p>This OTP will expire in 10 minutes.</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL will be logged to the console. You can open this URL in a browser to see the sent email.
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// --- 1. MANUAL REGISTRATION (For Admin Use) ---
// @route   POST /api/auth/register
// @desc    Register a new contractor's login credentials.
// @access  Private (should be protected by an admin middleware later)
router.post('/register', async (req, res) => {
    const { email, password, username, phone, contractorId, role } = req.body; 

    try {
        // Check if contractor profile exists
        const contractor = await Contractor.findById(contractorId);
        if (!contractor) {
            return res.status(404).json({ msg: 'Contractor profile not found' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        user = new User({
            email,
            password,
            username,
            phone,
            contractorProfile: contractorId,
            role: role || 'contractor',
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// --- 2. MANUAL LOGIN ---
// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Find user by email, username, or phone number
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }, { phone: identifier }],
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        
        if (!user.password) {
            return res.status(400).json({ msg: 'Please log in with Google.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create JWT Payload
        const payload = {
            user: {
                id: user.id,
                contractorId: user.contractorProfile,
                role: user.role, 
            },
        };

        // Sign and return token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }, // Token expires in 1 day
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// --- 3. GOOGLE OAUTH ROUTES ---
// @route   GET /api/auth/google
// @desc    Initiate Google OAuth login flow
// @access  Public
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback URL
// @access  Public
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), (req, res) => {
    // On successful authentication, Passport attaches the user to req.user.
    // We now create a JWT for them.
    const payload = {
        user: {
            id: req.user.id,
            contractorId: req.user.contractorProfile,
            role: req.user.role,
        },
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
        (err, token) => {
            if (err) throw err;
            // Redirect user to the frontend dashboard with the token
            // The frontend will need to grab this token from the URL.
            res.redirect(`http://localhost:5173/dashboard.html?token=${token}`);
        }
    );
});

// --- 1. FORGOT PASSWORD - STEP 1: REQUEST OTP ---
// @route   POST /api/auth/forgot-password
// @desc    User provides email/phone, backend sends OTP
router.post('/forgot-password', async (req, res) => {
    const { identifier } = req.body;
    try {
        const user = await User.findOne({ 
            $or: [{ email: identifier }, { phone: identifier }]
        });

        if (!user) {
            // Send a generic message for security reasons
            return res.status(200).json({ msg: 'If an account with that identifier exists, an OTP has been sent.' });
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        user.resetPasswordOtp = await bcrypt.hash(otp, 10);
        user.resetPasswordOtpExpires = Date.now() + 600000; // 10 minutes from now

        await user.save();

        // Send the OTP via email (or SMS in a real app)
        // For now, we only support email.
        if (user.email) {
            await sendPasswordResetEmail(user.email, otp);
        }
        
        // We always send a success message to prevent user enumeration attacks.
        res.json({ msg: 'If an account with that identifier exists, an OTP has been sent.' });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


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

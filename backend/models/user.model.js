const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
    },
    username: { 
        type: String, 
        unique: true, 
        sparse: true, // Allows multiple null values but unique for actual values
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: { 
        type: String,
    },
    googleId: {
        type: String,
    },
    role: {
        type: String,
        enum: ['contractor', 'admin'],
        default: 'contractor',
    },
    contractorProfile: { 
        type: Schema.Types.ObjectId, 
        ref: 'Contractor', 
        required: true 
    },
    
    // --- Fields for Password Reset ---
    resetPasswordOtp: { type: String },
    resetPasswordOtpExpires: { type: Date },

    // --- NEW FIELDS FOR EMAIL/PHONE VERIFICATION ---
    pendingEmail: { type: String, lowercase: true, trim: true },
    pendingPhone: { type: String, trim: true },
    verificationOtp: { type: String },
    verificationOtpExpires: { type: Date },

}, { 
    timestamps: true 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
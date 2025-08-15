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
        sparse: true,
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
    resetPasswordOtp: {
        type: String,
    },
    resetPasswordOtpExpires: {
        type: Date,
    },
}, { 
    timestamps: true 
});

const User = mongoose.model('User', userSchema);
module.exports = User;

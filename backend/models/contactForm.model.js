
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactFormSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String }, // Optional
    phone: { type: String, required: true },
    message: { type: String, required: true },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const ContactFormSubmission = mongoose.model('ContactFormSubmission', contactFormSchema);
module.exports = ContactFormSubmission;

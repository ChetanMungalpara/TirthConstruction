const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractorSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dpimageurl: { type: String, required: true },
    fullimageurl: { type: String },
    role: { type: String },
    quats: { type: String }, // Note: 'quats' likely means 'quotes'
    description: { type: String },
    skills: [{ type: String }], // An array of strings for skills
    contact: {
        num: { type: String },
        email: { type: String }
    },
    joiningDate: { type: Date },
    birthdate: { type: Date },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }] // Links to Project documents
}, {
    timestamps: true,
});

const Contractor = mongoose.model('Contractor', contractorSchema);

module.exports = Contractor;
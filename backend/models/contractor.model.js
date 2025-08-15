const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractorSchema = new Schema({
    name: { type: String, required: true },
    dpimageurl: { type: String, required: true },
    fullimageurl: { type: String },
    role: { type: String },
    quotes: { type: String },
    description: { type: String },
    skills: [{ type: String }],
    
    projectsCount: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    contact: {
        num: { type: String },
        email: { type: String }
    },
    joiningDate: { type: Date },
    birthdate: { type: Date },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
}, {
    timestamps: true,
});

const Contractor = mongoose.model('Contractor', contractorSchema);

module.exports = Contractor;
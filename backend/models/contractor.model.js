const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define sub-schema first
const certificationSchema = new Schema({
    name: { type: String },
    authority: { type: String },
    year: { type: Number },
}, { _id: false });

const contractorSchema = new Schema({
    name: { type: String, required: true },
    dpimageurl: { 
        type: String, 
        default: 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=No+Image' 
    },
    fullimageurl: { 
        type: String,
        default: 'https://placehold.co/600x800/EFEFEF/AAAAAA&text=No+Image' 
    },
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
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    
    // New fields from previous step
    companyRole: { type: String, default: 'Partner' },
    specializations: [{ type: String }],
    
    // This line will now work correctly
    certifications: [certificationSchema],

}, {
    timestamps: true,
});

const Contractor = mongoose.model('Contractor', contractorSchema);

module.exports = Contractor;

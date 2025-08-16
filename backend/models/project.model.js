
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const galleryItemSchema = new Schema({
    imgurl: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    className: { type: String }
}, { _id: false });

const progressTimelineItemSchema = new Schema({
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String },
    imagesUrls: [{ type: String }]
}, { _id: false });

const projectSchema = new Schema({
    title: { type: String, required: true },

    typeId: { 
        type: Schema.Types.ObjectId, 
        ref: 'TypeOfWork', // This MUST match the model name in typeOfWork.model.js
        required: true 
    },

    statusId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Status', // This MUST match the model name in status.model.js
        required: true 
    },

    description: { type: String, required: true },
    imgurl: { type: String, required: true },
    startdate: { type: Date },
    endDate: { type: Date },

    // --- CHANGE #3: Use an array of ObjectIds and ref for Contractors ---
    contractorIds: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Contractor' // This MUST match the model name in contractor.model.js
    }],

    details: {
        client: { type: String },
        location: { type: String },
        about: { type: String }
    },
    progressTimeline: [progressTimelineItemSchema],
    gallery: [galleryItemSchema]
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
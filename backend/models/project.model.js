const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the nested gallery objects
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

// The main project schema
const projectSchema = new Schema({
    // We use the default MongoDB `_id` and don't need a custom one.
    // Your frontend can use the `_id` field.
    id: { type: String, required: true, unique: true }, // Keeping your custom ID for now
    title: { type: String, required: true },
    typeId: { type: String, required: true },
    statusId: { type: String, required: true },
    description: { type: String, required: true },
    imgurl: { type: String, required: true },
    startdate: { type: Date },
    endDate: { type: Date },
    contractorIds: [{ type: String }], // Array of contractor IDs
    details: {
        client: { type: String },
        location: { type: String },
        about: { type: String }
    },
    progressTimeline: [progressTimelineItemSchema], // Array of progress items
    gallery: [galleryItemSchema] // Array of gallery items
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

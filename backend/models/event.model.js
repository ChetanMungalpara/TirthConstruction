
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imagesrc: { type: String, required: true }
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String }
}, {
    timestamps: true,
});

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;

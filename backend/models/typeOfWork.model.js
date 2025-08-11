
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const typeOfWorkSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    type: { type: String, required: true }
}, {
    timestamps: true,
});

const TypeOfWork = mongoose.model('TypeOfWork', typeOfWorkSchema);

module.exports = TypeOfWork;
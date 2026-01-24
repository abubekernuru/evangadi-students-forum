const mongoose = require('mongoose');

const questionSchema  = new mongoose.Schema({
    title: {
        type: String,
        required
    },
    content: {
        type: String,
        required
    },
    userRef: {
        type: String,
        required
    }
}, {timestamps: true});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;


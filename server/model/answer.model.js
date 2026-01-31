const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    questionRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    }, 
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Answer = mongoose.model("Answer", answerSchema)
module.exports = Answer;


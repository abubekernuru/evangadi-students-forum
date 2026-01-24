const Question = require("../model/question.model");

const createQuestion = async (req, res, next) => {
    const {title, content, userRef} = req.body;
    const newQuestion = new Question({title, content, userRef})
    await newQuestion.save();
    res.status(200).json(newQuestion)
}

module.exports = { createQuestion }
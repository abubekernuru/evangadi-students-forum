const Question = require("../model/question.model");

const createQuestion = async (req, res, next) => {
    try {
        const {title, content, userRef} = req.body;
        const newQuestion = new Question({title, content, userRef})
        await newQuestion.save();
        res.status(200).json(newQuestion)
    } catch (error) {
        next(error)
    }
}

const mongoose = require('mongoose');

const getQuestion = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid question id' });
        }

        const question = await Question.findById(id)
            .populate('userRef', 'username avatar');

        if(!question){
            return res.status(404).json({message: 'Question not found'});
        }
        res.status(200).json(question);

    } catch (error) {
        next(error)
    }
}

const getAllQuestions = async (req, res, next) => {
    try {
        const allQuestions = await Question.find().populate('userRef').sort({createdAt: -1});
        res.status(200).json(allQuestions);
    } catch (error) {
        next(error)
    }
}

module.exports = { createQuestion, getQuestion, getAllQuestions }
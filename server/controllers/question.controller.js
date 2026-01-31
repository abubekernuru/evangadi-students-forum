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

const getQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id)
            .populate('userRef', 'username avatar');
    
        if(!question){
            return res.status(404).json({message: 'Question not found'});
        }
        res.status(200).json(question);
        
    } catch (error) {
        next(error)
    }
}

module.exports = { createQuestion, getQuestion }
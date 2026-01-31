const Answer = require("../model/answer.model");


const postAnswer = async(req, res, next)=>{
    try {
        const newAnswer = new Answer({
            content: req.body.content,
            questionRef: req.params.id,
            userRef: req.user.id
        })
        await newAnswer.save();
        res.status(201).json(newAnswer);
    } catch (error) {
        next(error)
    }
}

module.exports = postAnswer;
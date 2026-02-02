const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const { createQuestion, getQuestion, getAllQuestions } = require("../controllers/question.controller.js");

const router = express.Router();

router.post('/', authMiddleware, createQuestion);
router.get('/:id', authMiddleware, getQuestion);
router.get('/', getAllQuestions)


module.exports = router;
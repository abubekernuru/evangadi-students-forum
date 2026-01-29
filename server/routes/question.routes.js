const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const { createQuestion, getQuestion } = require("../controllers/question.controller.js");

const router = express.Router();

router.post('/', authMiddleware, createQuestion);
router.get('/:id', authMiddleware, getQuestion);


module.exports = router;
const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const { createQuestion } = require("../controllers/question.controller.js");

const router = express.Router();

router.post('/', authMiddleware, createQuestion)


module.exports = router;
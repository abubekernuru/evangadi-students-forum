const express = require("express");
const postAnswer = require("../controllers/answer.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.post('/:id', authMiddleware, postAnswer)

module.exports = router;
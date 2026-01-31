const express = require("express");
const {postAnswer, getAnswer} = require("../controllers/answer.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.post('/:id', authMiddleware, postAnswer)
router.get('/:id', authMiddleware, getAnswer)

module.exports = router;
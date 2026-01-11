const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/auth.controller.js');
const {checkUser} = require('../controllers/user.controllers.js');
const {authMiddleware} = require('../middleware/authMiddleware.js')

router.post('/signup', signup)
router.post('/signin', signin)

router.get('/checkuser', authMiddleware, checkUser)

module.exports = router;
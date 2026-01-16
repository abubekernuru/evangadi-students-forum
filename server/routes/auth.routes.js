const express = require('express');
const router = express.Router();
const { signup, signin, google } = require('../controllers/auth.controller.js');
const {checkUser} = require('../controllers/user.controllers.js');
const {authMiddleware} = require('../middleware/authMiddleware.js')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', google)

router.get('/checkuser', authMiddleware, checkUser)

module.exports = router;
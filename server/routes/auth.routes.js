const express = require('express');
const router = express.Router();
const { signup, signin, google, signout } = require('../controllers/auth.controller.js');
const {checkUser} = require('../controllers/user.controllers.js');
const {authMiddleware} = require('../middleware/auth.middleware.js')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', google)
router.get('/signout',authMiddleware, signout)

router.get('/checkuser', authMiddleware, checkUser)

module.exports = router;
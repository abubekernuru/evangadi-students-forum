const express = require('express');
const router = express.Router();

const {updateProfile} = require('../controllers/user.controller');

router.put('/update/:id', updateProfile);

module.exports = router;
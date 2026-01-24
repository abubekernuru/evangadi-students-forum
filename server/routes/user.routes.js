const express = require('express');
const router = express.Router();

const {updateUser} = require('../controllers/user.controllers.js');
const {deleteUser} = require('../controllers/user.controllers.js');
const { authMiddleware } = require('../middleware/auth.middleware.js');

router.put('/update/:id', authMiddleware, updateUser);
router.delete('/delete/:id', authMiddleware, deleteUser);

module.exports = router;
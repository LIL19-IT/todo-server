const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validate');
const { login, register } = require('../controllers/users');

router.post('/login', login);
router.post('/register', validate, register);

module.exports = router;
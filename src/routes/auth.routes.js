const express = require('express');
const router = express.Router();

const {login, register, logout, refresh, me} = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const createUserSchema = require('../validations/user.validation');
const auth = require('../middlewares/auth.middleware');

router.post('/login', login);
router.post('/register', validate(createUserSchema), register);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.get('/me', auth(), me);

module.exports = router;
const express = require('express');

const userControler = require('../controller/user.controller');
const userValidation = require('../middleware/user.validation');

const router = express.Router();

router.post('/',
 userValidation.loginFieldsValidation,
 userControler.loginValidation);

module.exports = router;

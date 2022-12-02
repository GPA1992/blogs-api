const express = require('express');

const userControler = require('../controller/user.controler');
const userValidation = require('../middleware/user.validation');
/* const validateJWT = require('../auth/validateJWT'); */

const router = express.Router();

router.post('/login',
 userValidation.loginFieldsValidation,
 userControler.loginValidation);
router.post('/user', userValidation.newUserValidation, userControler.addNewUser);

module.exports = router;

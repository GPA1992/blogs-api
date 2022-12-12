const express = require('express');

const userControler = require('../controller/user.controller');
const userValidation = require('../middleware/user.validation');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', userValidation.newUserValidation, userControler.addNewUser);
router.get('/', validateJWT, userControler.getAlluser);
router.get('/:id', validateJWT, userControler.getUserById);
router.delete('/me', validateJWT, userControler.deleteMainUser);

module.exports = router;

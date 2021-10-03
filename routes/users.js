var express = require('express');
var router = express.Router();
const controller = require('../controllers/usersController');

// Login y register

router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/register2', controller.register2);
router.get('/error', controller.error);

module.exports = router;
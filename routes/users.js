var express = require('express');
var router = express.Router();
const controller = require('../controllers/usersController');

// rutas para el login y el register (hay 2 versiones del register)
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/register2', controller.register2);
router.post('/createUser',);
router.get('/error', controller.error);

module.exports = router;
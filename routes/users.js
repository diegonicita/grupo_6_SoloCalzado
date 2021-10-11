var express = require('express');
var router = express.Router();
const multer = require('multer')
const controller = require('../controllers/usersController');

// Preparando el login para recibir imágenes

const storage = multer.diskStorage({
    destination:function(req,file,cb){},
    filename:function(req,file,cb){}
})

const upload = multer({storage});

// rutas para el login y el register (hay 2 versiones del register)
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/register2', controller.register2);
router.post('/createUser',);
router.get('/error', controller.error);

module.exports = router;
let express = require('express');
let router = express.Router();
const multer = require('multer')
const {body} = require('express-validator');
const path = require('path');
const controller = require('../controllers/usersController');
const { userInfo } = require('os');

// Preparando el login para recibir imágenes

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/avatars')
    },
    filename:function(req,file,cb){
        let filename = `avatar-${Date.now()}-img-${path.extname(file.originalname)}`;
        cb(null,filename);
    }
})

const upload = multer({storage});

// Validaciones login 
const loginValidations = [
	body('usuario').notEmpty().withMessage('Debes completar el campo'),
	body('password').notEmpty().withMessage('Debes completar el campo')
];
const registerValidations = [
    body('firstName').notEmpty().withMessage('Debes completar el campo'),
    body('lastName').notEmpty().withMessage('Debes completar el campo'),
    body('email').notEmpty().withMessage('Debes completar el campo'),
    body('user').notEmpty().withMessage('Debes completar el campo'),
    body('password').notEmpty().withMessage('Debes completar el campo')
];

// rutas para el login y el register
router.get('/login', controller.login);
router.post('/login',loginValidations,controller.processLogin);
router.get('/register', controller.register);
router.post('/register', upload.single('avatar'), registerValidations ,controller.processRegister);
router.get('/error', controller.error);

module.exports = router;
let express = require('express');
let router = express.Router();
const multer = require('multer')
const {body} = require('express-validator');
const path = require('path');
const controller = require('../controllers/usersController');
const { userInfo } = require('os');

// MIDDLEWARES

const userLevelAuthMiddleware = require('../middlewares/userLevelAuthMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

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
    body('firstName')
        .notEmpty().withMessage('Debes completar el campo')
        .isLength({min:2,max:undefined}).withMessage('El nombre debe contener al menos 2 letras'),
    body('lastName').
        notEmpty().withMessage('Debes completar el campo')
        .isLength({min:2,max:undefined}).withMessage('El apellido debe contener al menos 2 letras'),
    body('email')
        .notEmpty().withMessage('Debes completar el campo')
        .isEmail().withMessage('Debes ingresar un formato de email válido'),
    body('user').notEmpty().withMessage('Debes completar el campo'),
    body('password')
        .notEmpty().withMessage('Debes completar el campo')
        .isLength({min:8,max:16}).withMessage('La contraseña debe contener entre 8 y 20 caracteres'),
    body('avatar')
        .custom(file=>{
            let fileType = path.extname(file);
            if (fileType != '.png' || fileType != '.jpg' || fileType != '.jpeg' || fileType != '.gif' ){
                throw new Error('Debes ingresar un archivo de tipo jpg, jpeg, gif o png');
            }
        })
]
// rutas para el login y el register
router.get('/login', authMiddleware ,controller.login);
router.post('/login',loginValidations,controller.processLogin);

router.get('/register', authMiddleware , controller.register);
router.post('/register', upload.single('avatar'), registerValidations ,controller.processRegister);

router.get('/profile', guestMiddleware, controller.profile);
router.post('/update', guestMiddleware, upload.single('avatar'), controller.update);

router.get('/list', guestMiddleware, userLevelAuthMiddleware({level : 3 }), controller.adminList);
router.get('/edit/:id', guestMiddleware, userLevelAuthMiddleware({level : 3 }), controller.adminEdit);
router.patch('/edit/:id', guestMiddleware, userLevelAuthMiddleware({level : 3 }), upload.single('avatar'), controller.adminUpdateById);

router.get('/logout', controller.logout);

router.get('/error', controller.error);



module.exports = router;
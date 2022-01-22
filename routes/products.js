var express = require('express');
var router = express.Router();
const multer = require('multer');
const controller = require('../controllers/productsController');
const {body} = require('express-validator');
const fs = require('fs');
const path = require('path');
const guestMiddleware = require('../middlewares/guestMiddleware');
const userLevelAuthMiddleware = require('../middlewares/userLevelAuthMiddleware')

// Preparando products para recibir archivos de imágenes

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        let folder = path.join(__dirname,'../public/images/products');
        cb(null,folder);
    },
    filename:function(req,file,cb){
        console.log(file);
        let imageName = 'product'+ Date.now() + path.extname(file.originalname);
        cb(null,imageName);
    }
})

const upload = multer({storage});

// Validaciones

const productValidation = [
    body('title')
        .notEmpty().withMessage('Debes completar el campo')
        .isLength({min:5,max:undefined}).withMessage('El titulo debe contener al menos 5 caracteres'),
    body('description').
        notEmpty().withMessage('Debes completar el campo')
        .isLength({min:20,max:undefined}).withMessage('La descripción debe contener al menos 20 caracteres'),
    body('price').
        notEmpty().withMessage('Debes completar el campo')
        .isDecimal({no_symbols: true}).withMessage('El precio debe ser numérico'),    
    body('images').custom((value, { req }) => {
        if (req.file != undefined)
        {
        let file = req.file;
        let extensionsAllowed = [".jpeg", ".jpg", ".png", ".gif"];   
        let fileExtension = path.extname(file.originalname);
        if (!extensionsAllowed.includes(fileExtension)) {
            throw new Error("Solo puedes usar archivos " + extensionsAllowed.join(", "));
            }    
        }
        return true;
      })
];

// Ruta para index de productos ( TODOS LOS PRODUCTOS )
router.get('/', controller.index);

// Ruta para el carrito de compras = productCart
router.get('/productCart', guestMiddleware, controller.productCart);
//router.post('/productCartAddItem', controller.productCartAddItem)
//router.post('/productCartDeleteItem', controller.productCartDeleteItem)

// Rutas para la creacion y edicion de productos: alta, baja y modificacion de productos

router.get('/create', guestMiddleware, userLevelAuthMiddleware({level : 3 }), controller.create);
router.post('/', guestMiddleware, userLevelAuthMiddleware({level : 3 }), upload.single('images'), productValidation, controller.store);

router.get('/edit/:id', guestMiddleware, userLevelAuthMiddleware({level : 2 }), controller.edit);
router.patch('/edit/:id', guestMiddleware, userLevelAuthMiddleware({level : 2 }), upload.single('images'), productValidation , controller.update);

// Ruta para mostrar los detalles de un producto
// Parametro ":id" puede tomar el valor 1 o 2
// 1 muestra tab con la descripcion
// 2 muestra tab con los talles disponibles
router.get('/:id/:tab?', controller.productDetail);
router.get('/error', controller.error);

router.delete('/:id', guestMiddleware, userLevelAuthMiddleware({level : 2 }), controller.destroy);

module.exports = router;

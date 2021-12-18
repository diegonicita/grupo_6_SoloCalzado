var express = require('express');
var router = express.Router();
const multer = require('multer');
const controller = require('../controllers/productsController');
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

// Ruta para index de productos ( TODOS LOS PRODUCTOS )
router.get('/', controller.index);

// Ruta para el carrito de compras = productCart
router.get('/productCart', guestMiddleware, controller.productCart);
router.post('/productCartAddItem', controller.productCartAddItem)
router.post('/productCartDeleteItem', controller.productCartDeleteItem)

// Rutas para la creacion y edicion de productos: alta, baja y modificacion de productos

router.get('/create', guestMiddleware, userLevelAuthMiddleware({level : 3 }), controller.create);
router.post('/', guestMiddleware, userLevelAuthMiddleware({level : 3 }), upload.single('images'), controller.store);

router.get('/edit/:id', guestMiddleware, userLevelAuthMiddleware({level : 3 }), controller.edit);
router.patch('/edit/:id', guestMiddleware, userLevelAuthMiddleware({level : 3 }), upload.single('images'), controller.update);

// Ruta para mostrar los detalles de un producto
// Parametro ":id" puede tomar el valor 1 o 2
// 1 muestra tab con la descripcion
// 2 muestra tab con los talles disponibles
router.get('/:id/:tab?', controller.productDetail);
router.get('/error', controller.error);

router.delete('/:id', guestMiddleware, userLevelAuthMiddleware({level : 3 }), controller.destroy);

module.exports = router;

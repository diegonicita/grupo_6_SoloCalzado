var express = require('express');
var router = express.Router();
const multer = require('multer');
const controller = require('../controllers/productsController');


// Preparando products para recibir archivos de imágenes

const storage = multer.diskStorage({
    destination:function(req,file,cb){},
    filename:function(req,file,cb){}
})

// Ruta para el carrito de compras = productCart
router.get('/productCart', controller.productCart);

// Rutas para la creacion y edicion de productos: alta, baja y modificacion de productos
// Parametro ":ABM" puede tomar el valor de "alta" o "modificacion"// 
router.get('/productABM/:ABM', controller.productABM);

// Ruta para mostrar los detalles de un producto
// Parametro ":id" puede tomar el valor 1 o 2
// 1 muestra una solapa con la descripcion
// 2 muestra una solapa con los talles disponibles
router.get('/productDetail/:id/:solapa', controller.productDetail);

router.get('/error', controller.error);

module.exports = router;

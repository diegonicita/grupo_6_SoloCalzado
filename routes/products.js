var express = require('express');
var router = express.Router();
const controller = require('../controllers/productsController');

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

var express = require('express');
var router = express.Router();
const controller = require('../controllers/productsController');

// rutas para los productos : Carrito, detalles, creacion y edicion de productos//

// Carrito de compras
router.get('/productCart', controller.productCart);
// Creacion y edicion de productos: 
// tambien llamado : Alta, Baja y Modificacion de productos
// :ABM puede tomar el valor de "alta" o "modificacion" para mostrar
// los formularios respectivos (de alta y modificacion).
router.get('/productABM/:ABM', controller.productABM);
// Para mosotrar los detalles de un producto
// con la solapa se cambia dos formas de ver: 1- con la descripcion
// y 2 con los talles disponibles ejemplo: productDetail/1/1 muestra
// la descripcion del producto 1
router.get('/productDetail/:id/:solapa', controller.productDetail);
router.get('/error', controller.error);

module.exports = router;
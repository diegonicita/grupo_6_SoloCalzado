const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Rutas para el index.ejs y para otras paginas que seguramente
// agreguemos mas adeltante como "acerca de nosotros", "contacto", "sucursales", "como comprar", etc

router.get('/', mainController.index);
router.get('/error', mainController.error);

module.exports = router;
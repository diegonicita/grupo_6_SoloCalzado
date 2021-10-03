const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Rutas para el index y para 
// cuando agreguemos otras paginas como "acerca de nosotros", 
// "contacto", etc

router.get('/', mainController.index);
router.get('/error', mainController.error);

module.exports = router;
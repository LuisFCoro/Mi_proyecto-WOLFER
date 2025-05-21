let express = require('express');
let router = express.Router();

const indexController = require('../controllers/indexController');

// Ruta para la página de inicio
router.get('/', indexController.index);

// Ruta para mostrar el formulario de contacto
router.get('/contacto', indexController.contacto);

// Ruta para procesar el formulario de contacto
router.post('/api/contacto', indexController.procesarContacto);

module.exports = router;

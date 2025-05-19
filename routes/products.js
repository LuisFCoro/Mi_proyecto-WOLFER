let express = require('express');
let router = express.Router();


const productsController = require('../controllers/productsController');



// Aqui las rutas
router.get('/', productsController.index);

router.get('/marcas', productsController.marcas);

// Mostrar el detalle de un producto por ID
router.get('/:id', productsController.show);




module.exports = router;
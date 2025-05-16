let express = require('express');
let router = express.Router();


const productsController = require('../controllers/productsController');



// Aqui las rutas
router.get('/', productsController.index);
router.get('/create', productsController.create);
router.post('/create', productsController.store);
router.get('/:id', productsController.show);
router.get('/edit/:id', productsController.edit);
router.post('/update/:id', productsController.update);
router.post('/delete/:id', productsController.destroy); // para eliminar




module.exports = router;
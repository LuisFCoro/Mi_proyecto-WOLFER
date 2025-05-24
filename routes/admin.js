const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');


const productValidator = require('../validators/productValidator');




// Configuración de multer para guardar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // carpeta donde guardar imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });
























// Productos
router.get('/products', adminController.index); // lista
router.get('/products/create', adminController.create); // form crear
router.post('/products', upload.single('imagenFile'), productValidator, adminController.store); // guardar nuevo producto con multer
router.get('/products/:id', adminController.show); // detalle
router.get('/products/:id/edit', adminController.edit); // form editar
router.post('/products/:id', upload.single('imagenFile'), productValidator, adminController.update); // guardar cambios
router.post('/products/:id/delete', adminController.destroy); // eliminar
router.post('/products/delete-multiple', adminController.destroyMultiple);



// Pedidos (rutas futuras)
router.get('/pedidos', (req, res) => res.render('admin/pedidos'));

// Colecciones
router.get('/colecciones', (req, res) => res.render('admin/colecciones'));

// Permisos
router.get('/mis-permisos', (req, res) => res.render('admin/permisos'));

// Configuración
router.get('/configuracion', (req, res) => res.render('admin/configuracion'));


module.exports = router;

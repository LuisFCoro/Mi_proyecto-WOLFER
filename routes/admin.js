const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta: /admin/products
router.get('/products', adminController.viewProducts);

module.exports = router;

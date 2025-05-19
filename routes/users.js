const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');

// === Configuración de Multer para subir avatar ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/avatars'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const tiposValidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (tiposValidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes JPG, JPEG, PNG o GIF.'));
    }
  }
});

// === Rutas ===

// Registro
router.get('/register', usersController.registerForm);
router.post('/register', upload.single('avatar'), usersController.register);

// Login
router.get('/login', usersController.loginForm);
router.post('/login', usersController.login);

// Logout
router.get('/logout', usersController.logout);

module.exports = router;

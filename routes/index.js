let express = require('express');
const path = require('path');

let router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/cv');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, 'cv-' + Date.now() + ext);
  }
});


const upload = multer({ storage });

const indexController = require('../controllers/indexController');














// Ruta para la página de inicio
router.get('/', indexController.index);

// Ruta para mostrar el formulario de contacto
router.get('/contacto', indexController.contacto);

// Ruta para procesar el formulario de contacto
router.post('/api/contacto', indexController.procesarContacto);


// ✅ Nuevas rutas
router.get('/sobreNosotros', indexController.sobreNosotros);
router.get('/locales', indexController.locales);
router.get('/trabaja-con-nosotros', indexController.trabajaConNosotros);
router.get('/blog', indexController.blog);
router.get('/envios', indexController.envios);
router.get('/devoluciones', indexController.devoluciones);


router.get('/preguntas-frecuentes', indexController.preguntasFrecuentes);
router.post('/api/trabajo', upload.single('cv'), indexController.procesarPostulacion);



module.exports = router;

const fs = require('fs');
const path = require('path');

const mensajesPath = path.join(__dirname, '../data/contacto.json');

const postulacionesPath = path.join(__dirname, '../data/postulaciones.json');

const leerMensajes = () => {
  if (!fs.existsSync(mensajesPath)) return [];
  const data = fs.readFileSync(mensajesPath, 'utf-8');
  return JSON.parse(data);
};

const guardarMensajes = (mensajes) => {
  fs.writeFileSync(mensajesPath, JSON.stringify(mensajes, null, 2));
};



// Lee las postulaciones existentes
const leerPostulaciones = () => {
  if (!fs.existsSync(postulacionesPath)) return [];
  const data = fs.readFileSync(postulacionesPath, 'utf-8');
  return JSON.parse(data);
};

// Guarda las postulaciones actualizadas
const guardarPostulaciones = (postulaciones) => {
  fs.writeFileSync(postulacionesPath, JSON.stringify(postulaciones, null, 2));
};




module.exports = {
  index: (req, res) => {
    res.render('index');
  },

  contacto: (req, res) => {
    res.render('contacto'); // Este archivo tiene que estar en views/contacto.ejs
  },

  procesarContacto: (req, res) => {
    const { nombre, email, provincia, localidad, mensaje } = req.body;

    const errores = [];
    if (!nombre || nombre.trim().length < 2) errores.push("Nombre inválido.");
    if (!email || !email.includes('@')) errores.push("Email inválido.");
    if (!mensaje || mensaje.trim().length < 10) errores.push("Mensaje muy corto.");

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    const mensajes = leerMensajes();
    mensajes.push({
      nombre,
      email,
      provincia,
      localidad,
      mensaje,
      fecha: new Date().toISOString()
    });
    guardarMensajes(mensajes);

    res.json({ ok: true, mensaje: 'Mensaje enviado con éxito.' });
  }, 

    sobreNosotros: (req, res) => {
    res.render('sobreNosotros'); // views/sobreNosotros.ejs
  },

  locales: (req, res) => {
    res.render('locales'); // views/locales.ejs
  },

  trabajaConNosotros: (req, res) => {
    res.render('trabajaConNosotros'); // views/trabajaConNosotros.ejs
  },

  blog: (req, res) => {
    res.render('blog'); // views/blog.ejs
  },

  devoluciones: (req, res) => {
    res.render('devoluciones'); // views/blog.ejs
  },

    envios: (req, res) => {
    res.render('envios'); // views/envio.ejs
  },


  preguntasFrecuentes: (req, res) => {
    res.render('preguntasFrecuentes'); // views/preguntasFrecuentes.ejs
  },

  procesarPostulacion: (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const cv = req.file ? req.file.filename : null;

  const errores = [];
  if (!nombre || nombre.trim().length < 2) errores.push("Nombre inválido.");
  if (!email || !email.includes('@')) errores.push("Email inválido.");
  if (!mensaje || mensaje.trim().length < 10) errores.push("Mensaje muy corto.");
  if (!cv) errores.push("Debe subir su CV.");

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  const postulaciones = leerPostulaciones();
  postulaciones.push({
    nombre,
    email,
    mensaje,
    cv,
    fecha: new Date().toISOString()
  });

  guardarPostulaciones(postulaciones);
  res.json({ ok: true, mensaje: 'Postulación enviada con éxito.' });
}


};

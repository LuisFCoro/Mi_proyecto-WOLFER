const fs = require('fs');
const path = require('path');

const mensajesPath = path.join(__dirname, '../data/contacto.json');

const leerMensajes = () => {
  if (!fs.existsSync(mensajesPath)) return [];
  const data = fs.readFileSync(mensajesPath, 'utf-8');
  return JSON.parse(data);
};

const guardarMensajes = (mensajes) => {
  fs.writeFileSync(mensajesPath, JSON.stringify(mensajes, null, 2));
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
  }
};

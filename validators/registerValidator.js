const validator = require('validator');

module.exports = (req, res, next) => {
  const errores = [];
  const { nombre, email, password } = req.body;

  if (!nombre || nombre.trim().length < 2) {
    errores.push('El nombre debe tener al menos 2 caracteres.');
  }

  if (!email || !validator.isEmail(email)) {
    errores.push('Email inválido.');
  }

  if (!password || password.length < 6) {
    errores.push('La contraseña debe tener al menos 6 caracteres.');
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
};

const validator = require('validator');

module.exports = (req, res, next) => {
  const errores = [];
  const { email, password } = req.body;

  if (!email || !validator.isEmail(email)) {
    errores.push('Email inválido.');
  }

  if (!password || password.length < 6) {
    errores.push('Contraseña incorrecta o muy corta.');
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
};

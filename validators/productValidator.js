module.exports = (req, res, next) => {
  const errores = [];
  const { nombre, precio, stock } = req.body;

  if (!nombre || nombre.trim().length < 2) {
    errores.push('Nombre del producto inválido.');
  }

  if (!precio || isNaN(precio) || Number(precio) <= 0) {
    errores.push('Precio inválido.');
  }

  if (!stock || isNaN(stock) || Number(stock) < 0) {
    errores.push('Stock inválido.');
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
};

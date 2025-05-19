const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const rutaProductos = path.join(__dirname, '../data/productos.json');

// Función para leer productos
function leerProductos() {
    const data = fs.readFileSync(rutaProductos, 'utf-8');
    return JSON.parse(data);
}

// Función para guardar productos
function guardarProductos(productos) {
    fs.writeFileSync(rutaProductos, JSON.stringify(productos, null, 2));
}





// -----------------------------------------------------------------------------------------------------------------------------






// Controlador
const productsController = {
        index: (req, res) => {
            const productos = leerProductos();
            res.render('products/productViews', { products: productos });
        },

             // Muestra el detalle de un producto
show: (req, res) => {
  const productos = leerProductos();
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (producto) {
    res.render('products/productDetall', { producto });
  } else {
    res.status(404).send('Producto no encontrado');
  }
},

marcas: (req, res) => {
  const productos = leerProductos();

  // Agrupar por marca automáticamente
  const productosPorMarca = {};

  productos.forEach(producto => {
    const marca = producto.marca || 'Sin marca'; // fallback por si falta el campo
    if (!productosPorMarca[marca]) {
      productosPorMarca[marca] = [];
    }
    productosPorMarca[marca].push(producto);
  });

  res.render('products/marcas', { productosPorMarca });
}

};

module.exports = productsController;

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
},

herramientas: (req, res) => {
  const productos = leerProductos();

  // Filtrar solo los de colección 'herramientas'
  const herramientas = productos.filter(p =>
    p.coleccion && p.coleccion.toLowerCase() === 'herramientas'
  );

  // Agrupar por etiquetas
  const agrupadosPorEtiqueta = {};

  herramientas.forEach(producto => {
    if (producto.etiquetas && Array.isArray(producto.etiquetas)) {
      producto.etiquetas.forEach(etiqueta => {
        if (!agrupadosPorEtiqueta[etiqueta]) {
          agrupadosPorEtiqueta[etiqueta] = [];
        }
        agrupadosPorEtiqueta[etiqueta].push(producto);
      });
    } else {
      if (!agrupadosPorEtiqueta['Sin etiqueta']) {
        agrupadosPorEtiqueta['Sin etiqueta'] = [];
      }
      agrupadosPorEtiqueta['Sin etiqueta'].push(producto);
    }
  });

  res.render('products/herramientas', {
    productosPorEtiqueta: agrupadosPorEtiqueta
  });
},

ofertas: (req, res) => {
  const productos = leerProductos();

  // Filtramos los productos que pertenecen a la colección "ofertas"
  const productosOferta = productos.filter(p => 
    p.coleccion && p.coleccion.toLowerCase() === 'ofertas'
  );

  // Agrupamos automáticamente por etiqueta
  const productosPorEtiqueta = {};

  productosOferta.forEach(producto => {
    if (!producto.etiquetas || producto.etiquetas.length === 0) {
      if (!productosPorEtiqueta["Sin etiqueta"]) {
        productosPorEtiqueta["Sin etiqueta"] = [];
      }
      productosPorEtiqueta["Sin etiqueta"].push(producto);
    } else {
      producto.etiquetas.forEach(etiqueta => {
        if (!productosPorEtiqueta[etiqueta]) {
          productosPorEtiqueta[etiqueta] = [];
        }
        productosPorEtiqueta[etiqueta].push(producto);
      });
    }
  });

  res.render('products/ofertas', { productosPorEtiqueta });
},

novedades: (req, res) => {
  const productos = leerProductos();

  // Filtrar solo productos de colección "Novedades"
  const novedades = productos.filter(p =>
    p.coleccion && p.coleccion.toLowerCase() === 'novedades'
  );

  res.render('products/novedades', {
    productos: novedades
  });
}



};

module.exports = productsController;

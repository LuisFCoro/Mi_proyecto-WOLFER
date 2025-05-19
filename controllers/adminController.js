const fs = require('fs');
const path = require('path');


const multer = require('multer');




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














// Configuración para guardar las imágenes en la carpeta /public/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    // Usamos fecha + nombre original para evitar conflictos
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos JPG, JPEG, PNG y GIF'));
    }
  }
});
































// -----------------------------------------------------------------------------------------------------------------------------






// Controlador
const adminController = {
        index: (req, res) => {
            const productos = leerProductos();
            res.render('admin/productViews', { 
  productos,
  usuarioLogueado: req.session.usuarioLogueado
});
  // mostrar lista de productos
        },

  create: (req, res) => {             // Formulario para crear productos
    res.render('admin/productAdd');  // nueva vista en views/admin/
},

  store: (req, res) => {
  const productos = leerProductos();

  const { nombre, precio, imagen, descripcion, marca, etiquetas, coleccion } = req.body;
  const archivoImagen = req.file;

  // --- Validaciones ---
  const errores = [];

  if (!nombre || nombre.trim().length < 5) {
    errores.push("El nombre debe tener al menos 5 caracteres.");
  }

  if (!descripcion || descripcion.trim().length < 20) {
    errores.push("La descripción debe tener al menos 20 caracteres.");
  }

  const precioNum = parseFloat(precio);
  if (isNaN(precioNum) || precioNum < 0.01) {
    errores.push("El precio debe ser mayor a 0.");
  }

  let imagenFinal = '';

  // Prioridad: imagen subida (archivo) > URL
  if (archivoImagen) {
    const ext = archivoImagen.mimetype;
    const extensionesValidas = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (!extensionesValidas.includes(ext)) {
      errores.push("Formato de imagen inválido. Solo JPG, JPEG, PNG, GIF.");
    } else {
      imagenFinal = '/uploads/' + archivoImagen.filename; // o como esté configurado multer
    }
  } else if (imagen && imagen.trim() !== '') {
    const extensiones = ['.jpg', '.jpeg', '.png', '.gif'];
    const urlValida = extensiones.some(ext => imagen.toLowerCase().endsWith(ext));

    if (!urlValida) {
      errores.push("La URL de la imagen debe terminar en .jpg, .jpeg, .png o .gif");
    } else {
      imagenFinal = imagen;
    }
  } else {
    errores.push("Debe ingresar una URL o subir un archivo de imagen.");
  }

  // Validar colección
  const coleccionesValidas = ['herramientas', 'ofertas', 'novedades'];
  if (coleccion && !coleccionesValidas.includes(coleccion.toLowerCase())) {
    errores.push("La colección debe ser 'herramientas', 'ofertas' o 'novedades'.");
  }


const maxId = productos.reduce((max, producto) => (producto.id > max ? producto.id : max), 0);




if (errores.length > 0) {
  return res.render('admin/productAdd', {  // Aquí también estaba mal, usabas 'admin/products'
    errores,
    old: req.body,
    usuarioLogueado: req.session.usuarioLogueado
  });
}


const nuevoProducto = {
  id: maxId + 1,
  nombre: nombre.trim(),
  precio: precioNum,
  imagen: imagenFinal,
  descripcion: descripcion.trim(),
  marca: marca || '',
  etiquetas: etiquetas ? etiquetas.split(',').map(e => e.trim()) : [],
  coleccion: coleccion || ''
};

productos.push(nuevoProducto);
guardarProductos(productos);


res.redirect('/admin/products');  // Correcto: redirigir a la lista




},


  show: (req, res) => {              // Muestra el detalle de un producto
    const productos = leerProductos();
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (producto) {
        res.send(`
            <h1>${producto.nombre}</h1>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <p><strong>Marca:</strong> ${producto.marca}</p>
            <p><strong>Colección:</strong> ${producto.coleccion}</p>
            <p><strong>Etiquetas:</strong> ${Array.isArray(producto.etiquetas) ? producto.etiquetas.join(', ') : 'Sin etiquetas'}</p>
            ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" width="200">` : ''}
        `);
    } else {
        res.send('Producto no encontrado');
    }
    },

    edit: (req, res) => {                             // funcion para mostrar formulario de los datos actuales del producto
        const productos = leerProductos();
        const id = parseInt(req.params.id);
        const producto = productos.find(p => p.id === id);
    
        if (producto) {
            res.render('admin/productEdit', { 
  producto,
  usuarioLogueado: req.session.usuarioLogueado
});

        } else {
            res.send('Producto no encontrado');
        }
    },
update: (req, res) => {
  const productos = leerProductos();
  const id = parseInt(req.params.id);
  const productoIndex = productos.findIndex(p => p.id === id);

  if (productoIndex === -1) return res.send('Producto no encontrado');

  const { nombre, precio, imagen, descripcion, marca, etiquetas, coleccion } = req.body;
  const archivoImagen = req.file;
  const coleccionesValidas = ['herramientas', 'ofertas', 'novedades'];
  let imagenFinal = '';

  // --- Validaciones básicas (puedes mejorar esto con JS en el front) ---
  if (archivoImagen) {
    const extensionesValidas = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (extensionesValidas.includes(archivoImagen.mimetype)) {
      imagenFinal = '/uploads/' + archivoImagen.filename;
    }
  } else if (imagen && imagen.trim() !== '') {
    const extensiones = ['.jpg', '.jpeg', '.png', '.gif'];
    const urlValida = extensiones.some(ext => imagen.toLowerCase().endsWith(ext));
    if (urlValida) {
      imagenFinal = imagen;
    }
  } else {
    imagenFinal = productos[productoIndex].imagen; // conserva imagen vieja si no cambian nada
  }

  productos[productoIndex] = {
    ...productos[productoIndex],
    nombre: nombre.trim(),
    precio: parseFloat(precio),
    imagen: imagenFinal,
    descripcion: descripcion.trim(),
    marca: marca || '',
    etiquetas: etiquetas ? etiquetas.split(',').map(e => e.trim()) : [],
    coleccion: coleccionesValidas.includes(coleccion?.toLowerCase()) ? coleccion : ''
  };

  guardarProductos(productos);
  res.redirect('/admin/products');
},



    destroy: (req, res) => {
        const id = parseInt(req.params.id);
        let productos = leerProductos();
        productos = productos.filter(p => p.id !== id);
        guardarProductos(productos);
        res.redirect('/admin/products');
    },

    destroyMultiple: (req, res) => {
  let ids = req.body.ids || [];
  ids = Array.isArray(ids) ? ids.map(id => parseInt(id)) : [parseInt(ids)];

  let productos = leerProductos();
  productos = productos.filter(p => !ids.includes(p.id));
  guardarProductos(productos);

  res.redirect('/admin/products');
}

    
    
    
};

module.exports = adminController;

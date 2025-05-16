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
            res.render('products/admin.ejs', { productos }); // 🔁 acá
        },

  create: (req, res) => {             // Formulario para crear productos
    res.render('products/productAdd');
},

  store: (req, res) => {              // Guarda un nuevo producto
    const productos = leerProductos();

    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: parseFloat(req.body.precio),
        imagen: req.body.imagen || '', // en caso de que no pongan imagen
        descripcion: req.body.descripcion || '',
        marca: req.body.marca || '',
        etiquetas: req.body.etiquetas ? req.body.etiquetas.split(',').map(e => e.trim()) : [],
        coleccion: req.body.coleccion || ''
    };

    productos.push(nuevoProducto);
    guardarProductos(productos);

    res.redirect('/products');
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
            res.render('products/productEdit', { producto });
        } else {
            res.send('Producto no encontrado');
        }
    },

    update: (req, res) => {                     //funcion para guardar los datos cambiados de los productos
        const productos = leerProductos();
        const id = parseInt(req.params.id);
    
        const productoIndex = productos.findIndex(p => p.id === id);
    
        if (productoIndex !== -1) {
            productos[productoIndex] = {
                ...productos[productoIndex], // conserva los datos viejos
                nombre: req.body.nombre,
                precio: parseFloat(req.body.precio),
                imagen: req.body.imagen,
                descripcion: req.body.descripcion,
                marca: req.body.marca,
                etiquetas: req.body.etiquetas ? req.body.etiquetas.split(',').map(e => e.trim()) : [],
                coleccion: req.body.coleccion
            };
    
            guardarProductos(productos);
            res.redirect('/products');
        } else {
            res.send('Producto no encontrado');
        }
    },

    destroy: (req, res) => {
        const id = parseInt(req.params.id);
        let productos = leerProductos();
        productos = productos.filter(p => p.id !== id);
        guardarProductos(productos);
        res.redirect('/products');
    }
    
    
    
};

module.exports = productsController;

const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../data/productos.json');

module.exports = {
    viewProducts: (req, res) => {
    const productos = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
    res.render('products/admin', { productos }); // pasamos los productos al EJS
    }
};

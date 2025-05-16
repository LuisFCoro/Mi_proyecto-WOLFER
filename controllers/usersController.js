const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');


const leerUsuarios = () => JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const guardarUsuarios = (data) => fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));


module.exports = {
    registerForm: (req, res) => {
        res.render('users/register');
    },




    register: (req, res) => {
    const usuarios = leerUsuarios();
    const { nombre, email, password } = req.body;

    if (usuarios.find(u => u.email === email)) {
        return res.send('El correo ya está registrado');
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        email,
        password,
        rol: 'cliente'
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    res.redirect('/users/login');
    },





    loginForm: (req, res) => {
    res.render('users/login');
    },




    login: (req, res) => {
    const usuarios = leerUsuarios();
    const { email, password } = req.body;

    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (!usuario) {
        return res.send('Credenciales inválidas');
    }

    // Guardar al usuario en sesión
    req.session.usuarioLogueado = usuario;
    res.redirect('/');
    },





    
    logout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
    }
};

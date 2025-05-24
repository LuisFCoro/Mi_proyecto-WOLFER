const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');



const leerUsuarios = () => {
  if (!fs.existsSync(usersPath)) {
    // Si no existe el archivo, retornamos un array vacío
    return [];
  }
  const data = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(data);
}

const guardarUsuarios = (data) => {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
}


















// Controlador
module.exports = {

    registerForm: (req, res) => {
  res.render('users/register', {
    old: {},
    errores: []
  });
},

  register: (req, res) => {
    const usuarios = leerUsuarios();
    const { nombre, email, password } = req.body;
    const archivo = req.file;

    const errores = [];

    // Nombre: mínimo 2 caracteres
    if (!nombre || nombre.trim().length < 2) {
      errores.push('El nombre y apellido deben tener al menos 2 caracteres.');
    }

    // Email: válido y no repetido
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!email || !emailValido) {
      errores.push('Debes ingresar un email válido.');
    } else if (usuarios.find(u => u.email === email)) {
      errores.push('El email ya está registrado.');
    }

    // Contraseña: 8+ caracteres, mayúscula, minúscula, número y símbolo
    const passwordValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    if (!password || !passwordValida) {
      errores.push('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial.');
    }

    // Imagen: si se subió, validar formato
    let imagen = '';
    if (archivo) {
      const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];
      const ext = path.extname(archivo.originalname).toLowerCase();
      if (!extensionesValidas.includes(ext)) {
        errores.push('Formato de imagen no válido.');
      } else {
        imagen = '/avatars/' + archivo.filename;
      }
    }

    // Si hay errores, borrar imagen si se subió y volver al formulario
    if (errores.length > 0) {
      if (archivo && fs.existsSync(archivo.path)) {
        fs.unlinkSync(archivo.path);
      }
      return res.render('users/register', {
        errores,
        old: req.body
      });
    }

    // Crear usuario
    const nuevoUsuario = {
      id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
      nombre: nombre.trim(),
      email: email.trim(),
      password,
      rol: 'cliente',
      avatar: imagen
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
  return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
}

    req.session.usuarioLogueado = usuario;
    return res.json({ ok: true });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }
};

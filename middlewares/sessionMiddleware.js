const session = require('express-session');

module.exports = {
    sessionConfig: session({
        secret: 'secretoWolfer',
        resave: false,
        saveUninitialized: false,
        cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 día

  }
    }),

userToLocals: (req, res, next) => {
    console.log("Usuario en sesión:", req.session.usuarioLogueado);

  if (req.session.usuarioLogueado) {
    // Si avatar está definido y no tiene slash al principio, lo ajustamos
    if (req.session.usuarioLogueado.avatar && !req.session.usuarioLogueado.avatar.startsWith('/')) {
      req.session.usuarioLogueado.avatar = '/avatars/' + req.session.usuarioLogueado.avatar;
    }
    res.locals.usuarioLogueado = req.session.usuarioLogueado;
  } else {
    res.locals.usuarioLogueado = null;
  }
  next();
}, 


};

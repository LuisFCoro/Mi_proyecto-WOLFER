const session = require('express-session');

module.exports = {
    sessionConfig: session({
        secret: 'secretoWolfer',
        resave: false,
        saveUninitialized: false
    }),

    userToLocals: (req, res, next) => {
        res.locals.usuarioLogueado = req.session.usuarioLogueado || null;
        next();
    }
};

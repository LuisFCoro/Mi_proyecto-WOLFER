var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();



// sesion midlleaware usuario
const { sessionConfig, userToLocals } = require('./middlewares/sessionMiddleware');
// Configuración de middlewares
app.use(sessionConfig);
app.use(userToLocals);




// zona de rutas/ definimos el ruetador
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let productsRouter = require('./routes/products');
const adminRoutes = require('./routes/admin');




// Definimos que nuestras vista ejs esta en la carpeta views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Hasta aca



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// cuando un usario haga click o escriba en una rutas llamada home, necesitamos que repsonda homeROuter

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRoutes);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');

var path = require('path');

var logger = require('morgan');
var hbs = require('hbs');
require('./hbs/helpers');

var cookieParser = require("cookie-parser");
var cookieSession = require('cookie-session');

// Controladores 
var indexRouter = require('./routes/index');
var clientesRouter = require('./routes/routes.clientes');
var usuariosRouter = require('./routes/routes.usuarios');
var ProveedorRouter = require('./routes/routes.proveedor');
var loginRouter = require('./routes/loginEmpleado');

// Database
const sequelize = require('./database/db');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.set('view engine', 'hbs'); 
hbs.registerPartials(__dirname + '/views/parciales', function (err) {});

// static folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + '/public'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Los middlewares cookieParser y cookieSession se encargan,
//  * respectivamente, de procesar las cookies y de gestionar la información de la
//  * sesión en éstas.

// Es necesario darle un nombre a la cookie, así como un par de claves para que
//  * el middleware firme los datos y un periodo de validez máximo.
//  * 
//  * El periodo de validez se expresa en milisegundos. Si se omite, la duración de
//  * la cookie será hasta el cierre de la sesión (cerrar navegador/salir del sistema).

app.use(cookieParser());
app.use(cookieSession({ name: 'sesion', //nombre de la cookie 
keys: ["secret1234", "secret1234"],  //claves de firma 
maxAge: 5 * 60 * 1000//caducidad [milisegundos] 
})) 

// rutas
app.use('/', indexRouter);
app.use('/cliente', clientesRouter);
app.use('/usuario', usuariosRouter);
app.use('/proveedor', ProveedorRouter);
app.use('/loginEmpleado', loginRouter);


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

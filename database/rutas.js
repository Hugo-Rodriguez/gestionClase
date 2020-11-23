// Rutas
express = require('express');
const app = express();

// app.use('/post', require(__dirname));

app.use('/cliente', require('./routes/routes.clientes'));

// module.exports = app;
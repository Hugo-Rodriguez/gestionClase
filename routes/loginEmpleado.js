var express = require('express');
// var Autor = require('../models/autor');
var Empleado = require('../models/models.clientes');

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render("loginEmpleado");
});

router.post('/', async function (req, res) {
    let {
        DNI,
        Password
    } = req.body;
    let emple = await Empleado.findOne({
        attributes: ['DNI', 'password', 'nombre', 'email'],
        where: {
            DNI,
            password
        }
    });
    if (emple) {
        req.session.emple = emple;
        //se fuerza el cierre de la sesión de usuario
        req.session.usuario = undefined;
         res.redirect("/cliente/" + DNI);
        
        


    } else {
        res.render("loginEmpleado", {
            error: "DNI o contraseña incorrectos"
        });
    }
})

router.get('/logoutEmple', function (req, res) {
    req.session = undefined;
    req.session.destroy();
    res.redirect("/");
});


module.exports = router;
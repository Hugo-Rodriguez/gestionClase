const express = require("express");
const router = express.Router();
const sequelize = require('../database/db');

// var Autor = require('../models/autor');
var Usuarios = require('../models/models.usuarios');


router.get('/', function (req, res, next) {
    res.render("usuarios/loginEmpleado");    
});


router.post('/', async function (req, res) {
    let {DNI, password} = req.body;
    let usuario = await Usuarios.findOne({
        attributes: ['DNI', 'nombre', 'apellido'],
        where: {
            DNI,
            password
        }
    });   
        if (usuario) {        
        //  res.json(usuario);        
        req.session.usuario = usuario;        
        res.redirect("/");
    } else {
        res.render("usuarios/loginEmpleado", {error: "DNI o contraseña incorrectos"});
    }
})

router.get('/logoutEmple', function (req, res) {
    req.session = undefined;
    req.session.destroy();
    res.redirect("/");
});


module.exports = router;


/* <script>

function desactivar(){
  document.getElementById('btnUsuario').style.display = 'none';
}

</script> */

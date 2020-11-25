const express = require("express");
const router = express.Router();
const sequelize = require('../database/db');

// modelo
const Usuarios = require("../models/models.usuarios");

// get Usuario Lista
router.get('/',  (req, res ) => 
  res.redirect('/')
)


// add Uusario

router.get("/nuevo", (req, res) =>  res.render("usuarios/frmUsuarios"));

/************** */

router.post('/nuevo', async function (req, res) {
  // Obtención de los datos del formulario
  let {DNI,nombre, apellido, email, direccion, localidad, cp, provincia, password, repassword, activo, tipo, foto} = req.body;

  if (password == repassword) {
    let usuario = new Usuarios({DNI,nombre, apellido, email, direccion, localidad, cp, provincia, activo,password, tipo, foto});
    try {
      await usuario.save();
      res.redirect("/");
    } catch(err) {
      res.render("usuarios/frmUsuarios", {error: err.message})        
    }
  } else {
    res.render("usuarios/frmUsuarios", {error: "Password no coincide"})
    //TODO: mostrar error
  }
})

/
// READ -- Listado de todos
router.get("/listado", (req, res) => {
  let usuarios = Usuarios.findAll().then((usuarios) => {
  
    res.render("usuarios/listadoUsuarios", { usuarios });
  });
});

// leo los datos por Clave 
router.get("/:id", (req, res) => {
  Usuarios.findByPk(req.params.id)
    .then((usuarios) => {      
      console.log(usuarios);
      console.log("ACTIVO: ",usuarios.activo);     

      res.render('usuarios/frmUsuariosEdit', {usuarios})
    })    
    .catch((err) => {
      res.json(err);
    });
});


// UPDATE - Actualizo datos
router.post("/:id", (req, res) => { 
  let password = req.body.password;
  let repassword = req.body.repassword;
  if (password == repassword) {
    Usuarios.update(
      {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        direccion: req.body.direccion,
        localidad: req.body.localidad,
        cp: req.body.cp,
        provincia: req.body.provincia,
        telefono: req.body.telefono,
        password: req.body.password,
        repassword: req.body.password,
        activo: req.body.activo,
        tipo : req.body.tipo,
        foto: req.body.foto
      },
      {
        where: {
          DNI: req.params.id,
        },
      }
    )
      .then((resultado) => {     
      
        res.redirect("/usuario/listado");
      })
      .catch((err) => {
        res.json({
          // status: 303,
          err,
        });
      });
   }else{
     var error = 'La contraseñas no coinciden';
   }  
});

// DELETE un Usuario
router.get("/borrar/:id", (req, res) => {
  Usuarios.findByPk(req.params.id).then((usuario) => {
    
    Usuarios.destroy({
      where: {
        DNI: req.params.id,
      },
    }).then((resultado) => {
      res.redirect("/usuario/listado");
    })
    .catch((err) => {
      res.json({
        status: 303,
        err,
      });
    });  ;
  });
});


router.put("/:id/imagen", (req, res) => { 
  console.log('para subir imagen', req.body)
});

module.exports = router;

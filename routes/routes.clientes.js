const express = require("express");
const router = express.Router();
const sequelize = require('../database/db');

// modelo
const Clientes = require("../models/models.clientes");

// get CLiente Lista
router.get('/',  (req, res ) => 
  
  Clientes.findAll()
    .then(clientes => {
      // console.log(clientes);
      // res.sendStatus(200);
      res.render('/', {clientes})
    })
    .catch(err => console.log("Error" + err)));


// add CLiente

router.get("/nuevo", (req, res) =>  res.render("frmClientes"));

/************** */

router.post('/nuevo', async function (req, res) {
  // Obtención de los datos del formulario
  let {DNI,nombre, apellido, email, direccion, localidad, cp, provincia, password, repassword, activo} = req.body;

  if (password == repassword) {
    let cliente = new Clientes({DNI,nombre, apellido, email, direccion, localidad, cp, provincia, activo,password});
    try {
      await cliente.save();
      res.redirect("/");
    } catch(err) {
      res.render("frmClientes", {error: err.message})        
    }
  } else {
    res.render("frmClientes", {error: "Password no coincide"})
    //TODO: mostrar error
  }
})



// READ -- Listado de todos
router.get("/listado", (req, res) => {
  let clientes = Clientes.findAll().then((clientes) => {
    // console.log(clientes);
    res.render("listadoClientes", { clientes });
  });
});

// leo los datos por Clave 
router.get("/:id", (req, res) => {
  Clientes.findByPk(req.params.id)
    .then((clientes) => {      
      console.log(clientes);
      console.log("ACTIVO: ",clientes.activo);
      //  res.render('frmClientes', {clientes})

      res.render('frmClientesEdit', {clientes})
    })    
    .catch((err) => {
      res.json(err);
    });
});


// UPDATE - Actualizo datos
router.post("/:id", (req, res) => { 
  let password = req.body.password;
  let repassword = req.body.repassword;
  // if (password == repassword) {
    Clientes.update(
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
        activo: req.body.activo
      },
      {
        where: {
          DNI: req.params.id,
        },
      }
    )
      .then((resultado) => {        
        res.redirect("/cliente/listado");
      })
      .catch((err) => {
        res.json({
          // status: 303,
          err,
        });
      });
    // }else{
    //   var error = 'La contraseñas no coinciden';
    // }  
});

// router.post("/editar/:id", (req, res) => {
//   if (req.body.operacion == "Actualizar") {
//     Clientes.update(
//       {
//         nombre: req.body.nombre,
//         apellido: req.body.apellido,
//         email: req.body.email,
//         direccion: req.body.direccion,
//         localidad: req.body.localidad,
//         cp: req.body.cp,
//         provincia: req.body.provincia,
//         telefono: req.body.telefono,
//         password: req.body.password,
//         repassword: req.body.password,
//         activo: req.body.activo,
//       },
//       {
//         where: {
//           DNI: req.params.id,
//         },
//       }
//     )
//       .then((resultado) => {
//         // res.json(resultado);
//         res.redirect("/")
//       })
//       .catch((err) => {
//         res.json({
//           status: 303,
//           err,
//         });
//       });
//   } else {
//     Clientes.destroy({
//       where: {
//         DNI: req.params.id,
//       },
//     }).then((resultado) => {
//       res.json(resultado);
//     });
//   }
// });


// DELETE un cliente
router.get("/borrar/:id", (req, res) => {
  Clientes.findByPk(req.params.id).then((clientes) => {
    // res.json(clientes);
    Clientes.destroy({
      where: {
        DNI: req.params.id,
      },
    }).then((resultado) => {
      res.redirect("/cliente/listado");
    })
    .catch((err) => {
      res.json({
        status: 303,
        err,
      });
    });  ;
  });
});

module.exports = router;

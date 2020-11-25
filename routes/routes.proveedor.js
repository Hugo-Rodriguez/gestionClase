const express = require("express");
const router = express.Router();
 const sequelize = require('../database/db');

// modelo
const Proveedor = require("../models/models.proveedores");

// get Usuario Lista
router.get('/',  (req, res ) => 

  res.redirect('/')

 );


// add Proveedor

router.get("/nuevo", (req, res) =>  res.render("proveedores/frmProveedor"));

/************** */

router.post('/nuevo', async function (req, res) {
  // Obtención de los datos del formulario
  let {DNI,razonsocial,nombre, apellido, email, direccion, localidad, cp, provincia,telefono} = req.body;

  
    let proveedor = new Proveedor({DNI,razonsocial, nombre, apellido, email, direccion, localidad, cp, provincia, telefono});
    try {
      await proveedor.save();
      res.redirect("/");
    } catch(err) {
      res.render("proveedores/frmProveedor", {error: err.message})        
    }
 
});


// READ -- Listado de todos
router.get("/listado", (req, res) => {
  let proveedores = Proveedor.findAll().then((proveedores) => {
  
    res.render("proveedores/listadoProveedor", { proveedores });
  });
});

// leo los datos por Clave 
router.get("/:id", (req, res) => {
  Proveedor.findByPk(req.params.id)
    .then((proveedores) => {      
      console.log(proveedores);      

      res.render('proveedores/frmProveedorEdit', {proveedores})
    })    
    .catch((err) => {
      res.json(err);
    });
});


// UPDATE - Actualizo datos
router.post("/:id", (req, res) => {   
  
    Proveedor.update(
      {
        razonsocial: req.body.razonsocial,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        direccion: req.body.direccion,
        localidad: req.body.localidad,
        cp: req.body.cp,
        provincia: req.body.provincia,
        telefono: req.body.telefono        
      },
      {
        where: {
          DNI: req.params.id,
        },
      }
    )
      .then((resultado) => {      
        res.redirect("/proveedor/listado");
      })
      .catch((err) => {
        res.json({
          status: "Error",          
          err,
        });
      });
   
});

// DELETE un Usuario
router.get("/borrar/:id", (req, res) => {
  Proveedor.findByPk(req.params.id).then((proveedor) => {
    
    Proveedor.destroy({
      where: {
        DNI: req.params.id,
      },
    }).then((resultado) => {
      res.redirect("/proveedor/listado");
    })
    .catch((err) => {
      res.json({
        status: "Error",   
        err,
      });
    });  ;
  });
});

module.exports = router;

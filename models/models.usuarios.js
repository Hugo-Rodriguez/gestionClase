
const { Model, DataTypes } = require("sequelize");
// const Sequelize = require('sequelize');
const sequelize = require("../database/db");

class Usuarios extends Model {}

Usuarios.init(
  {
    DNI: {
      type: DataTypes.STRING,
      // allowNull: false,
       primaryKey: true,
      // validate: {
      //   // notNull: {
      //     // msg: "el campo no puede ser nulo",
      //   },
        // isAlpha: {
        //   args: false,
        //   msg: "Debe contener solo letras",
        // },
        // len: {
        //   args: [3, 9],
        //   msg: "El DNI tiene que tener al menos 3 caracteres",
        // }
      // },
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // validate: {
      //   len: {
      //     args: [3, 50],
      //     msg: "El DNI tiene que tener al menos 3 caracteres",
      //   },
      // },
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
      // validate: {
      //   len: {
      //     args: [3, 100],
      //     msg: "El Apellido tiene que tener al menos 3 caracteres",
      //   },
      // },
      // allowNull defaults to true
    },
    direccion: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    localidad: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    cp: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    provincia: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "El campo tiene que ser un correo valido",
        },
      },
    },
    password: {
      type: DataTypes.STRING(42),
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    tipo: {
      type: DataTypes.ENUM('Basico','Admin'),
      allowNull: false,
      defaultValue: 'Basico'
    }
  },
  
  {
    sequelize,
    modelName: "usuarios",
    timestamps: false,
  }
);

module.exports = Usuarios;

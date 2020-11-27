
const { Model, DataTypes } = require("sequelize");
// const Sequelize = require('sequelize');
const sequelize = require("../database/db");

class TipoUsuario extends Model {}

TipoUsuario.init(
  {    
    descripcion: {
      type: DataTypes.STRING(20),
      allowNull: false
      // validate: {
      //   len: {
      //     args: [3, 50],
      //     msg: "El DNI tiene que tener al menos 3 caracteres",
      //   },
      // },
    }
  },  
  {
    sequelize,
    modelName: "tipousuario",
    tableName: 'tipousuario',
    timestamps: false,
  }
);

module.exports = TipoUsuario;

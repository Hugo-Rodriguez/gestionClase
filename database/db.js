const { Sequelize} = require('sequelize');
const { database } = require('../config');




const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: database.dialect
    }
);

// test DB 
sequelize.authenticate()
    .then(()=> console.log('Databases Conectada.......\n'))
    .catch(err => console.log('Error:' + err))

module.exports = sequelize ;
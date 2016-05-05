var Sequelize = require('sequelize');

var env = 'dev';
var configDB = require('./config/database.json')[env];
var password = configDB.password? configDB.password : null;

module.exports = new Sequelize(
    configDB.database,
    configDB.user,
    password,
    {
      // logging: console.log,
      host: 'localhost',
      dialect: configDB.driver,

      pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
  });

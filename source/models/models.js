var colors = require('colors');
var path = require('path');
var Sequelize = require('sequelize');

var connection = require(path.join(__dirname, '../', 'connection'));

var Direccion = connection.import(path.join(__dirname, 'direccion'));

exports.Direccion = Direccion;

connection.sync({
  force: true, // drop tables before create them
  logging: console.log
}).then(function() {
  console.log("Data base connection done!".bold.green);
  // Direccion.create({
  //   Calle: 'test Calle',
  //   Numero: 12,
  //   Ciudad: 'Pereira',
  //   Departamento: 'Risaralda'
  // });
  // Direccion.create({
  //   Calle: 'test Calle 2',
  //   Numero: 13,
  //   Ciudad: 'Pereira',
  //   Departamento: 'Risaralda'
  // });
}).catch(function(err) {
  console.log(colors.red.bold("Data base connection failed!\n" + err));
});

var colors = require('colors');
var path = require('path');
var Sequelize = require('sequelize');
var connection = require(path.join(__dirname, '../', 'connection'));


var Concesionario_Marca = connection.define('concesionarios_marca', {
  ID_Registro: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
},
{
  timestamps: false,
  freezeTableName: true
});

var Concesionario = connection.define('concesionario', {
  ID_Concesionario: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
},
{
  timestamps: false,
  freezeTableName: true
});

Concesionario.hasMany(Concesionario_Marca, {as: 'Id_Concesionario'});
Concesionario_Marca.belongsTo(Concesionario, {through: 'ConcesionarioMarca'});

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

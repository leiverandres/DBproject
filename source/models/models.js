var colors = require('colors');
var path = require('path');
var Sequelize = require('sequelize');
var connection = require(path.join(__dirname, '../', 'connection'));

var Direccion = connection.import(path.join(__dirname, 'direccion'));
var Marca = connection.import(path.join(__dirname, 'marca'));
var Concesionario = connection.import(path.join(__dirname, 'concesionario'));
var Concesionario_Marca = connection.import(path.join(__dirname, 'concesionario_marca'));
var Modelo = connection.import(path.join(__dirname, 'modelo'));
var Tipo_Persona = connection.import(path.join(__dirname, 'tipo_persona'));
var Persona = connection.import(path.join(__dirname, 'persona'));
var Direccion_Multa = connection.import(path.join(__dirname, 'direccion_multa'));
var Agente_Transito = connection.import(path.join(__dirname, 'agente_transito'));
var Matricula_Vehiculo = connection.import(path.join(__dirname, 'matricula_vehiculo'));
var Multa = connection.import(path.join(__dirname, 'multa'));

// connections =================================================================

Concesionario.belongsTo(Direccion, {foreignKey: 'ID_Direccion'});

Concesionario.belongsToMany(Marca, {as: 'Concesionario', through: Concesionario_Marca, foreignKey: 'ID_Concesionario'});
Marca.belongsToMany(Concesionario, {as: 'Marca', through: Concesionario_Marca, foreignKey: 'ID_Marca'});

Marca.hasMany(Modelo, {as: 'Marcas', foreignKey: 'ID_Marca'});

Tipo_Persona.hasMany(Persona, {as: 'Tipo', foreignKey: 'Tipo_Persona'});


// =============================================================================

exports.Direccion = Direccion;
exports.Marca = Marca;
exports.Concesionario = Concesionario;
exports.Concesionario_Marca = Concesionario_Marca;
exports.Modelo = Modelo;
exports.Tipo_Persona = Tipo_Persona;
exports.Persona = Persona;
exports.Direccion_Multa = Direccion_Multa;
exports.Agente_Transito = Agente_Transito;
exports.Matricula_Vehiculo = Matricula_Vehiculo;
exports.Multa = Multa;


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

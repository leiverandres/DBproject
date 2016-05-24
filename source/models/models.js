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
Direccion.hasOne(Persona, {as: 'Direccion', foreignKey: 'ID_Direccion'});

Modelo.belongsToMany(Persona, {as: 'Modelo', through: Matricula_Vehiculo, foreignKey: 'Modelo'});
Persona.belongsToMany(Modelo, {as: 'Propietario', through: Matricula_Vehiculo, foreignKey: 'NIT_Propietario'});

// Direccion.hasOne(Direccion_Multa, {as: 'Direccion', foreignKey:'ID_Direccion_simple'});
Direccion_Multa.belongsTo(Direccion, {foreignKey:'ID_Direccion'});

Agente_Transito.belongsTo(Persona, {as: 'NIT', foreignKey: 'NIT_Agente'});

Agente_Transito.belongsToMany(Persona, {as: 'Agente', through: Multa, foreignKey: 'ID_Agente'});
Persona.belongsToMany(Agente_Transito, {as: 'Persona', through: Multa, foreignKey: 'NIT_Persona'});
Multa.belongsTo(Matricula_Vehiculo, {foreignKey: 'Placa'});
Multa.belongsTo(Direccion_Multa, {foreignKey: 'Direccion_Multa'});

// =============================================================================

connection.sync({
  force: false, // drop tables before create them
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
  // Direccion.build({
  //   Calle: "17",
  //   Numero: 6,
  //   Ciudad: "Manizales",
  //   Departamento: "Caldas"
  // }).save().then(function (dir) {
  //   console.log("created:" + dir.ID_Direccion);
  //   Direccion_Multa.build({
  //     Carretera: "Carretera 5",
  //     Kilometro: "40",
  //   }).save().then(function (dir_mult) {
  //     console.log("direccion creada:" + dir_mult);
  //     dir_mult.setDireccion(dir);
  //     console.log("LA direccion as: " + dir.Direccion);
  //   });
  // });
}).catch(function(err) {
  console.log(colors.red.bold("Data base connection failed!\n" + err));
});

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
exports.sequelize = connection;

var colors = require('colors');
var path = require('path');
var Sequelize = require('sequelize');
var connection = require(path.join(__dirname, '../', 'connection'));

var Direccion = connection.import(path.join(__dirname, 'direccion'));
var Marca = connection.import(path.join(__dirname, 'marca'));
var Concesionario = connection.import(path.join(__dirname, 'concesionario'));
var Concesionario_Marca = connection.import(path.join(__dirname, 'concesionario_marca'));
var Modelo = connection.import(path.join(__dirname, 'modelo'));
var Persona = connection.import(path.join(__dirname, 'persona'));
var Direccion_Multa = connection.import(path.join(__dirname, 'direccion_multa'));
var Agente_Transito = connection.import(path.join(__dirname, 'agente_transito'));
var Matricula_Vehiculo = connection.import(path.join(__dirname, 'matricula_vehiculo'));
var Multa = connection.import(path.join(__dirname, 'multa'));

// connections =================================================================

Concesionario.belongsTo(Direccion, {foreignKey: 'ID_Direccion'});

// Concesionario.belongsToMany(Marca, {as: 'Concesionario', through: Concesionario_Marca, foreignKey: 'ID_Concesionario'});
// Marca.belongsToMany(Concesionario, {as: 'Marca', through: Concesionario_Marca, foreignKey: 'ID_Marca'});

Concesionario_Marca.belongsTo(Concesionario, {as: 'Concesionario', foreignKey: 'ID_Concesionario'});
Concesionario_Marca.belongsTo(Marca, {as: 'Marca', foreignKey: 'ID_Marca'});

Marca.hasMany(Modelo, {as: 'Marcas', foreignKey: 'ID_Marca'});

Direccion.hasOne(Persona, {as: 'Direccion', foreignKey: 'ID_Direccion'});

// Modelo.belongsToMany(Persona, {as: 'Modelo', through: Matricula_Vehiculo, foreignKey: 'Modelo'});
// Persona.belongsToMany(Modelo, {as: 'Propietario', through: Matricula_Vehiculo, foreignKey: 'NIT_Propietario'});

Matricula_Vehiculo.belongsTo(Modelo, {as: 'Modelo', foreignKey: 'ID_Modelo'});
Matricula_Vehiculo.belongsTo(Persona, {as: 'Propietario', foreignKey: 'NIT_Propietario'});

Direccion_Multa.belongsTo(Direccion, {as: 'Direccion', foreignKey:'ID_Direccion'});

Agente_Transito.belongsTo(Persona, {as: 'NIT', foreignKey: 'NIT_Agente'});

Multa.belongsTo(Persona, {as: 'Persona', foreignKey: 'NIT_Persona'});
Multa.belongsTo(Agente_Transito, {as: 'Agente_Transito', foreignKey: 'ID_Agente'});
Multa.belongsTo(Matricula_Vehiculo, {as: 'Matricula', foreignKey: 'Placa'});
Multa.belongsTo(Direccion_Multa, {as: 'dir_Multa', foreignKey: 'Direccion_Multa'});

// =============================================================================

connection.sync({
  force: true, // drop tables before create them
  logging: console.log
}).then(function() {
  console.log("Data base connection done!".bold.green);
  Direccion.create({
    Calle: 'test Calle',
    Numero: 12,
    Ciudad: 'Pereira',
    Departamento: 'Risaralda'
  });
  Direccion.create({
    Calle: 'test Calle 2',
    Numero: 13,
    Ciudad: 'Pereira',
    Departamento: 'Risaralda'
  });
  Agente_Transito.create({
    ID_Agente: 123,
    NIT: {
      NIT_Persona: 123456789,
      Nombres_Persona: "FIRST NAME",
      Apellidos_Persona: "LAST NAME",
      Fecha_Nacimiento: new Date(1995, 04, 05),
    }
  }, {
    include: [{
      model: Persona,
      as: 'NIT'
    }]
  });
  Direccion.build({
    Calle: "17",
    Numero: 6,
    Ciudad: "Manizales",
    Departamento: "Caldas"
  }).save().then(function (dir) {
    console.log("created:" + dir.ID_Direccion);
    Direccion_Multa.build({
      Carretera: "Carretera 5",
      Kilometro: "40",
    }).save().then(function (dir_mult) {
      console.log("direccion creada:" + dir_mult);
      dir_mult.setDireccion(dir);
      console.log("LA direccion as: " + dir.Direccion);
    });
  });
  // Matricula_Vehiculo.create({
  //   Matricula: 'RDN166',
  //   Fecha_Matricula: new Date,
  // }).then(function (matricula) {
  //   console.log("Matricula creada".green);
  // }).catch(function (err) {
  //   console.log("Error creacion".red);
  // });

}).catch(function(err) {
  console.log(colors.red.bold("Data base connection failed!\n" + err));
});

exports.Direccion = Direccion;
exports.Marca = Marca;
exports.Concesionario = Concesionario;
exports.Concesionario_Marca = Concesionario_Marca;
exports.Modelo = Modelo;
exports.Persona = Persona;
exports.Direccion_Multa = Direccion_Multa;
exports.Agente_Transito = Agente_Transito;
exports.Matricula_Vehiculo = Matricula_Vehiculo;
exports.Multa = Multa;
exports.sequelize = connection;

var models = require('./../models/models.js');

exports.multaForm = function (req, res) {
  var date = new Date();
  res.render('multas/multaForm', {date: date.toDateString()});
}

exports.retrieveAll = function (req, res) {
  models.multa.findAll({
  include: [
    { agente_transito: ID_Agente,  include: [
      { Persona: NIT_Persona }
      ]
    },
    { persona: NIT_Persona },
    { matricula_vehiculo: Placa },
    { direccion_multa: Direccion_Multa }
  ]
}).then(function (multas) {
  console.log(multas);
  res.render('multas/multasList', {multa: multas})
}).catch(function (err) {
  console.log(err);
  res.local.title = "No se pueden mostrar las Multas";
  res.end();
});
}

exports.add = function (req, res) {
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
  // Create Persona
  // matricula deberia estar creada

  // models.Direccion_Multa.create({
  //   Carretera: req.body.carreteraMulta,
  //   Kilometro: req.body.kilometroMulta,
  //   Direccion: {
  //     Calle: req.body.calleMulta,
  //     Numero: req.body.numeroMulta,
  //     Ciudad: req.body.ciudadMulta,
  //     Departamento: req.body.departamentoMulta
  //   }
  // }, {
  //   include: [{
  //     model: models.Direccion,
  //     as: 'Direccion'
  //   }]
  // }).then();

  models.Agente_Transito.findById(req.body.idAgente).then(function (agente) {
    models.Multa.create({
      Fecha_Multa: new Date,
      Ley_Infringida: req.body.ley,
      Importe_Multa: parseFloat(req.body.importe),
      Descripcion: req.body.descripcion,
      dir_Multa: {
        Carretera: req.body.carreteraMulta,
        Kilometro: req.body.kilometroMulta,
        Direccion: {
          Calle: req.body.calleMulta,
          Numero: req.body.numeroMulta,
          Ciudad: req.body.ciudadMulta,
          Departamento: req.body.departamentoMulta
        }
      }
    }, {
      include: [{
        model: models.Direccion_Multa,
        as: 'dir_Multa',
        include: [{
            model: models.Direccion,
            as: 'Direccion'
          }]
      }]
    }).then(function (multa) {
      console.log("Multa creada");
    }).catch(function (err) {

    });
  }).catch(function (err) {
    console.log("El agente no existe");
    res.render('multas/multaForm', {message: "El agente no esta registrado"});
  });

  // models.Agente_Transito.create({
  //   ID_Agente: 123456,
  //   NIT: {
  //     NIT_Persona: 1088328826,
  //     Nombres_Persona: "NOMBRES",
  //     Apellidos_Persona: "APELLIDOS",
  //     Fecha_Nacimiento: new Date()
  //   }
  // }, {
  //   include: [ {
  //     model: models.Persona,
  //     as: 'NIT'
  //   }]
  // });
  console.log(JSON.stringify(req.body));
  res.send("Hey i'm in post")
}

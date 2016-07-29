var models = require('./../models/models.js');
var colors = require('colors');

exports.multaForm = function (req, res) {
  var date = new Date();
  console.log("HEY I'M in multa form".green);
  res.render('multas/multaForm', {date: date.toDateString()});
}

exports.retrieveAll = function (req, res) {
  models.Multa.findAll({
  include: [
    { model: models.Agente_Transito,
      as: 'Agente_Transito',
      include: [{
        model: models.Persona,
        as: 'NIT'
      }]
    }, {
      model: models.Persona,
      as: 'Persona'
    }, {
      model: models.Matricula_Vehiculo,
      as: 'Matricula'
    }, {
      model: models.Direccion_Multa,
      as: 'dir_Multa',
      include: [{
        model: models.Direccion,
        as: 'Direccion'
      }]
    }
  ]}).then(function (multas) {
  res.render('multas/multasList', {multa: multas});
}).catch(function (err) {
  console.log(("error: " + err).red);
  res.local.title = "No se pueden mostrar las Multas";
  res.end();
});
}

exports.multaInfo = function (req, res) {
  models.Multa.findById(req.params.id_multa, {
    include: [
      { model: models.Agente_Transito,
        as: 'Agente_Transito',
        include: [{
          model: models.Persona,
          as: 'NIT'
        }]
      }, {
        model: models.Persona,
        as: 'Persona'
      }, {
        model: models.Matricula_Vehiculo,
        as: 'Matricula'
      }, {
        model: models.Direccion_Multa,
        as: 'dir_Multa',
        include: [{
          model: models.Direccion,
          as: 'Direccion'
        }]
      }
    ]
  }).then(function (multa) {
    console.log("Info de la multa obtenida".green);
    res.render('multas/multaDesc', {multa: multa});
  }).catch(function (err) {
    console.log("Erro obteniendo multa".red);
  });
}

// function getAgente(id) {
//   models.Agente_Transito.findById(id).then(function (agente) {
//     console.log(("Agente Obtenido. Agente : ===== " + agente).green);
//     return agente;
//   }).catch(function (err) {
//     console.log(("Error obteniendo agente. Error: " + err).red);
//   });
// };

// function getMatricula(id) {
//   models.Matricula_Vehiculo.findById(id).then(function (mat) {
//     // console.log(("Matricula obtenida. Matricula : ==== " + mat).green);
//     return mat;
//   }).catch(function (err) {
//     // console.log(("Error obteniendo matricula. Error : " + err).red);
//   });
// };

// exports.add = function (req, res) {
//   var agente = getAgente(req.body.idAgente);
//   var matricula = getMatricula(req.body.placa);
//   console.log(("Matricula obtenida. Matricula : ==== " + matricula).green);
//   console.log(("Agente Obtenido. Agente : ===== " + agente).green);
//   // if (agente === null) {
//   //   console.log("agente null".red);
//   // }
//   //
//   // if (matricula === null) {
//   //   console.log("matricula null".red);
//   // }
//   res.end();
// };

exports.add = function (req, res) {
  var cur_date = new Date();
  models.Matricula_Vehiculo.findOne({
    where: {
      Matricula: req.body.placa
    }
  }).then(function (matricula) {
    console.log("Matricula se encuentra registrada".green);
    models.Agente_Transito.findById(req.body.idAgente).then(function (agente) {
      console.log("El agente si existe".green);
      models.Multa.build({
        Fecha_Multa: cur_date,
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
      }).save().then(function (multa) {
        multa.setAgente_Transito(agente);
        // var new_Matricula = models.Matricula_Vehiculo.build({
        //   Matricula: req.body.placa,
        //   Fecha_Matricula: new Date()
        // });
        multa.setMatricula(matricula);
        models.Persona.findById(req.body.nitInfractor).then(function (persona) {
          console.log(persona.green);
          multa.setPersona(persona);
        }).catch(function (err) {
          console.log("No se encontro la persona".red);
          var person_date = req.body.fechaNacimiento;
          var date = person_date.split("/");
          multa.createPersona({
            NIT_Persona: req.body.nitInfractor,
            Nombres_Persona: req.body.nombres,
            Apellidos_Persona: req.body.apellidos,
            Fecha_Nacimiento: new Date(date[2], date[0], date[1])

          }).then(function (person) {
            console.log("Persona creada".green);
          }).catch(function (err) {
            console.log("Persona no pudo ser creada".red);
          });
        });
        console.log("Multa creada".green);
        res.redirect('/multas');
      }).catch(function (err) {
          console.log("Error creando multa".red);
          res.render('multas/multaForm', {message: "Error creando multa", date: date.toDateString()})
      });
    }).catch(function (err) {
      console.log("El agente no existe".red);
      res.render('multas/multaForm', {message: "El agente no esta registrado", date: date.toDateString()});
    });
  }).catch(function (err) {
    console.log("La matricula no esta registrada".red);
    res.render('multas/multaForm', {message: "La placa no esta registrada", date: date.toDateString()});
  });
}

var models = require('./../models/models.js');
var colors = require('colors');

exports.multaForm = function (req, res) {
  var date = new Date();
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
      as: 'dir_Multa'
    }
  ]}).then(function (multas) {
  console.log(multas);
  res.render('multas/multasList', {multa: multas});
  // res.end();
}).catch(function (err) {
  console.log(("error: " + err).red);
  res.local.title = "No se pueden mostrar las Multas";
  res.end();
});
}

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
        // multa.setMatricula(matricula);
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
        res.end();
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

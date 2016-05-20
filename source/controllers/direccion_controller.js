var models = require('./../models/models.js');

exports.retrieveAll = function(req, res) {
  models.Direccion.findAll().then(function(direcciones) {
    console.log("Entry");
    res.render('direcciones/dirList', {title: 'Direcciones de la base de datos', data: direcciones})
  }).catch(function(err) {
    res.json({error: true, message: "No se pudireron obtener las direcciones"});
  });
}

exports.add = function(req, res) {
  models.Direccion.build(
    {
      Calle: req.body.calle,
      Numero: req.body.numero,
      Ciudad: req.body.ciudad,
      Departamento: req.body.departamento
    }
  ).save().then(function(direccion) {
    console.log("Agrego la direccion");
    res.locals.title = "El dato fue insertado";
    res.redirect("/");
  }).catch(function(err) {
    console.log(err);
    res.locals.title = "El dato no pudo ser insertado";
    res.redirect("/");
  });
}

exports.dirForm = function(req, res) {
  res.render('direcciones/dirForm');
}

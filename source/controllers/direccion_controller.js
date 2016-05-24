var models = require('./../models/models.js');
var colors = require('colors');

exports.retrieveAll = function(req, res) {
  models.Direccion.findAll().then(function(direcciones) {
    console.log("Entry" + direcciones);
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

exports.update = function (req, res) {
  var values = {
    Calle: req.body.calle,
    Numero: req.body.numero,
    Ciudad: req.body.ciudad,
    Departamento: req.body.departamento
  };
  console.log("ID: dir: " + req.body.id_dir);
  models.Direccion.update(values ,{
    where: {
      ID_Direccion: req.body.id_dir
    }
  }).then(function (updated) {
    console.log("La direccion fue actualizada".green);
    console.log("updated : " + updated);
    res.redirect("/admin/direcciones");
  }).catch(function (err) {
    console.error("Un error durante la actualización, Error: " + err);
    res.render('error', {message: "Un error durante la actualización", error: err});
  });
}

exports.remove = function (req, res) {
  models.Direccion.destroy({
    where: {
      ID_Direccion: req.body.ID_Direccion
    }
  }).then(function () {
    console.log("La direccion fue eliminada".greem);
    res.redirect('/admin/direcciones')
  }).catch(function (err) {
    console.error("Un error durante la eliminacion. Error: " + err);
    res.redirect('/admin/direcciones')
  });
}

exports.dirForm = function(req, res) {
  res.render('direcciones/dirForm');
};

exports.editForm = function(req, res) {
  var id = req.params.id_dir;
  models.Direccion.findById(id).then(function (direccion) {
    console.log("Se encontro la direccion con id " + id);
    res.render('direcciones/dirEditForm', {dir: direccion});
  }).catch(function (err) {
    console.error("No se pudo obtener direccion. Error: "+ err);
    res.end();
  });
}

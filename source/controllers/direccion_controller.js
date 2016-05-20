var models = require('./../models/models.js');

exports.retrieveAll = function(req, res) {
  models.Direccion.findAll().then(function(direcciones) {
    console.log("Entry");
    res.render('direcciones/dirList', {title: 'Direcciones de la base de datos', data: direcciones})
  }).catch(function(err) {
    res.json({error: true, message: "No se pudireron obtener las direcciones"});
  });
}

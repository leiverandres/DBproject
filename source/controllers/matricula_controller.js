var models = require('./../models/models.js');

exports.matriculaForm = function(req, res) {
  var date = new Date();
  res.render('matriculaVehiculo/matriculaForm', {date: date.toDateString()});
}

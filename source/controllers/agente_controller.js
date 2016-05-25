var models = require('./../models/models.js');

exports.agentForm = function(req, res){
  var date = new Date();
  res.render('agentes/agenteForm', {date: date.toDateString()});
}

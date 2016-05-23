exports.multaForm = function(req, res) {
  var date = new Date();
  res.render('multas/multaForm', {date: date.toDateString()});
}

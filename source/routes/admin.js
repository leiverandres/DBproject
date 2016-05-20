var express = require('express');
var controllers = require('./../controllers/direccion_controller')
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome'});
});

router.get('/direcciones', controllers.retrieveAll);


module.exports = router;

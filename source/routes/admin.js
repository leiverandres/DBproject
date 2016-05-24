var express = require('express');
var controllers = require('./../controllers/direccion_controller')
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome'});
});

router.get('/direcciones', controllers.retrieveAll);
router.post('/direcciones', controllers.add);
router.get('/direcciones/add', controllers.dirForm);
router.delete('/direcciones/remove', controllers.remove);

module.exports = router;

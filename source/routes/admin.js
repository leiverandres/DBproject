var express = require('express');
var dirControllers = require('./../controllers/direccion_controller');
var matControllers = require('./../controllers/matricula_controller');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome'});
});

router.get('/direcciones', dirControllers.retrieveAll);
router.post('/direcciones', dirControllers.add);
router.get('/direcciones/add', dirControllers.dirForm);
router.delete('/direcciones/remove', dirControllers.remove);

router.get('/matriculas/add', matControllers.matriculaForm);

module.exports = router;

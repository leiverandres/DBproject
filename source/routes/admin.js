var express = require('express');
var dirControllers = require('./../controllers/direccion_controller');
var matControllers = require('./../controllers/matricula_controller');
var agentController = require('./../controllers/agente_controller');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome'});
});

router.get('/direcciones', dirControllers.retrieveAll);
router.post('/direcciones', dirControllers.add);
router.put('/direcciones/update', dirControllers.update);
router.delete('/direcciones/remove', dirControllers.remove);
router.get('/direcciones/add', dirControllers.dirForm);
router.get('/direcciones/edit/:id_dir', dirControllers.editForm);

router.get('/agentes/add', agentController.agentForm);
router.get('/matriculas/add', matControllers.matriculaForm);

module.exports = router;

var express = require('express');
var controller = require('./../controllers/multas_controller');
router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Ultimas Multas'});
});

// localhost:port/multas with post
router.post('/', controller.add);

router.get('/add', controller.multaForm);

module.exports = router;

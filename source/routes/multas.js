var express = require('express');
var controller = require('./../controllers/multas_controller');
router = express.Router();

router.get('/', controller.retrieveAll);
router.get('/:id_multa', controller.multaInfo);

// localhost:port/multas with post
router.post('/', controller.add);

router.get('/add', controller.multaForm);

module.exports = router;

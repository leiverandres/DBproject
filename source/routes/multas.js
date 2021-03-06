var express = require('express');
var controller = require('./../controllers/multas_controller');
router = express.Router();

router.get('/', controller.retrieveAll);
// localhost:port/multas with post
router.post('/', controller.add);
router.get('/add', controller.multaForm);
router.get('/:id_multa', controller.multaInfo);

module.exports = router;

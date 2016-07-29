var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("HERE all");
  res.render('index', { title: 'Transito DB' });
});

module.exports = router;

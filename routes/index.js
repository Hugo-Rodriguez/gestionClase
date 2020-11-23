var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gestion CLientes', condition: false });
});


router.get('/demo', function(req, res, next) {
  res.render('demo', { attr: 'Controlador CLientes' });
});

module.exports = router;

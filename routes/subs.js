var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('detail', { title: req.query.name, bundle: '/dist/detail_bundle.js' });
});

module.exports = router;

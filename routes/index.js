var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '逛', bundle: '/dist/index_bundle.js' });
});
router.get('/guang', function(req, res, next) {
  res.render('index', { title: '逛', bundle: '/dist/index_bundle.js' });
});
router.get('/chi', function(req, res, next) {
  res.render('index', { title: '吃', bundle: '/dist/index_bundle.js' });
});
router.get('/mai', function(req, res, next) {
  res.render('index', { title: '买', bundle: '/dist/index_bundle.js' });
});
router.get('/wan', function(req, res, next) {
  res.render('index', { title: '玩', bundle: '/dist/index_bundle.js' });
});
router.get('/other', function(req, res, next) {
  res.render('index', { title: '其他', bundle: '/dist/index_bundle.js' });
});

router.get('/login', function(req, res, next) {
    res.render('index', { title: '登录管理后台', bundle: '/dist/login_bundle.js' });
});

module.exports = router;

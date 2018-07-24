var express = require('express');
var router = express.Router();

/* GET home page. */
//测试上传
router.get('/upload', function (req, res, next) {
    res.render('upload');
});


router.get('/', function(req, res, next) {
    res.render('index', { title: '逛', bundle: '/dist/index_bundle.js' });
});
router.get('/eat', function(req, res, next) {
  res.render('index', { title: '吃', bundle: '/dist/index_bundle.js' });
});
router.get('/enjoy', function(req, res, next) {
  res.render('index', { title: '玩', bundle: '/dist/index_bundle.js' });
});
router.get('/stroll', function(req, res, next) {
  res.render('index', { title: '逛', bundle: '/dist/index_bundle.js' });
});
router.get('/detail', function(req, res, next) {
    res.render('index', { title: '详情', bundle: '/dist/index_bundle.js' });
});

router.get('/login', function(req, res, next) {
    res.render('index', { title: '登录后台', bundle: '/dist/login_bundle.js' });
});

router.get('/registration', function(req, res, next) {
    res.render('index', { title: '欢迎注册！', bundle: '/dist/reg_bundle.js' });
});

module.exports = router;

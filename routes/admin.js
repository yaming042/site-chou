var express = require('express');
var utils = require('../controller/utils');
var configs = require('../controller/config.json');
var router = express.Router();

router.get('/*', function (req, res, next) {
    //后台说有请求都必须路过这里
    var cook = req.cookies.web_tian || '';

    if( cook && cook === req.session.token){//已经登录
        next();
    }else{
        res.redirect('/login');
        return;
    }
});

router.get('/', function (req, res, next) {
    res.redirect('/admin/enjoy');
});

router.get('/enjoy', function (req, res, next) {
    res.render('admin', { title: '管理后台-Enjoy', bundle: '/dist/admin_bundle.js' });
});

router.get('/eat', function (req, res, next) {
    res.render('admin', { title: '管理后台-Eat', bundle: '/dist/admin_bundle.js' });
});

router.get('/stroll', function (req, res, next) {
    res.render('admin', { title: '管理后台-Stroll', bundle: '/dist/admin_bundle.js' });
});

module.exports = router;

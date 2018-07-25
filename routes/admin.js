var express = require('express');
var utils = require('../controller/utils');
var configs = require('../controller/config.json');
var router = express.Router();

router.get('/*', function (req, res, next) {
    //后台说有请求都必须路过这里
    var cook = req.cookies.web_tian || '';

    if(req.session.token){//已经登录
        var c = utils.getUserName(utils.decrypt(cook, configs.secret));
        var s = utils.getUserName(utils.decrypt(req.session.token, configs.secret));

        if(c && s && c == s){//判断token的name是否和cookie的name相等,如果不等就认证失败
            var password = s + '+' + configs.prefix + '+' + new Date().getTime();
            var token = utils.encrypt(password, configs.secret);

            req.session.token = token;

            next();
        }else{//认证失败
            req.session.token = null;
            res.redirect('/login');
            return;
        }
    }else{
        req.session.token = null;
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

var express = require('express');
var utils = require('../controller/utils');
var configs = require('../controller/config.json');

var router = express.Router();

//路由/api
router.get('/login', function (req, res, next) {
    var data = req.query;
    var path = 'http://yaming.me/inter/resume_info?name=ren';


    utils.funcGetSetToken(path, data, function(body) {
        var password = configs.prefix + '+' + new Date().getTime();
        var token = utils.encrypt(password, configs.secret);



        req.session.token = token;
        res.cookie('web_tian', token, {
            maxAge: 1000*60,
            httpOnly: true,
            path: '/',
            secure: false
        });
        console.log(req.session);
        res.send(body);
    });
});


module.exports = router;

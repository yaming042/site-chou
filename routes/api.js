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
            httpOnly: false,
            path: '/',
            secure: false
        });

        res.send(body);
    });
});

router.get('/json', function (req, res, next) {
    var data = {
        code: '10114',
        name:"tim"
    };
    res.send(data);
});

router.post('/authorLoginIn', function (req, res, next) {
    var result = {
        status: ''
    };
    var cook = req.session.token;
    if(cook && cook == req.body.data){
        result.status = 'success';
    }else{
        result.status = 'failed';
    }
    res.send(result);

});

module.exports = router;

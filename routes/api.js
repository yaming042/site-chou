var express = require('express');
var request = require('request');
var utils = require('../controller/utils');
var configs = require('../controller/config.json');

var router = express.Router();

//路由/api
router.post('/login', function (req, res, next) {
    var path = configs.requestDomain + 'userLogin';

    utils.postMethed(path, req.body, function(body) {
        var obj = JSON.parse(body);

        if(obj.code == 200){
            var password = obj.body.name + '+' + configs.prefix + '+' + new Date().getTime();
            var token = utils.encrypt(password, configs.secret);

            req.session.token = token;
            res.cookie('web_tian', token, {
                maxAge: 1000*60*30,//cookie一小时过期
                httpOnly: false,
                path: '/',
                secure: false
            });
        }

        res.send(body);
    });
});

router.get('/getProlist', function (req, res, next) {
    var path = configs.requestDomain + 'getProductsByType?type=' + req.query.type;

    utils.getMethedToken(path, req.session.token, req.cookies.web_tian, function(data){
        res.send(data);
    });
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

//图片上传，获取签名API
router.get('/getSignature', function (req, res, next) {
    request({
        url: configs.requestDomain + 'getsignature',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    },function (error, response, body) {
        if( error ){
            res.send('{"status": "error","msg": "服务器请求错误"}');
        }else{
            try {
                if (JSON.parse(body)) {
                    res.send(body);
                }
            } catch (err) {
                console.log(err);
                console.log("Error name: " + err.name + "");
                console.log("Error message: " + err.message);
                res.send('{"status": "err","msg": "服务器请求错误"}');
            }
        }
    });
});

//获取验证码
router.get('/getVerification', function (req, res, next) {
    var srcstr = "1ayuf5gdrt4j8k9qwvbpz2sex6hc3nm";
    var len = srcstr.length;
    var code = '';
    for(var i=0;i<4;i++){
        code += srcstr.substr(Math.floor(Math.random()*len), 1);
    }

    req.session.__code = code;

    res.send(code);

});

//验证验证码
router.post('/identifyCode', function (req, res, next) {
    var result = {};
    if(req.body.code == req.session.__code){
        result.status = '200';
        result.msg = 'success';
    }else{
        result.status = '201';
        result.msg = '验证码错误';
    }
    res.send(result);
});

//从cookie获取用户名
router.post('/getUserName', function (req, res, next) {
    var cookie = {};
    var cookieArr = req.body.data.split(';');
    var len = cookieArr.length;
    for(var i=0;i<len;i++){
        var arr = cookieArr[i].split('=');
        var k = arr[0].trim();
        cookie[k] = arr[1];
    }

    var result = {};
    if(req.session.token == cookie['web_tian']){
        var nameStr = utils.decrypt(cookie['web_tian'], configs.secret);
        var pos = nameStr.indexOf('+');
        var name = nameStr.substr(0, pos);
        result = {code: 200, msg: 'success', body: {name: name}}
    }else{
        result = {code: 201, msg: '身份识别失败'};
    }

    res.send(result);
});

//退出登录
router.get('/logout', function (req, res, next) {
    req.session.token = null;
    res.send({code: 200, msg: 'success'});
});

module.exports = router;

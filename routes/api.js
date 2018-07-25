var express = require('express');
var request = require('request');
var fs = require('fs');
var multiparty = require('multiparty');
var OSS = require('ali-oss');
var utils = require('../controller/utils');
var configs = require('../controller/config.json');

var router = express.Router();

var ossClient = new OSS({
    accessKeyId: configs.oss.accessKeyId,
    accessKeySecret: configs.oss.accessKeySecret,
    bucket: configs.oss.bucket,
    region: configs.oss.region
});

//路由/api
router.post('/login', function (req, res, next) {
    var path = configs.requestDomain + 'userLogin';

    utils.postMethed(path, req.body, function(body) {
        var obj = JSON.parse(body);

        if(obj.code == 200){
            var password = obj.body.name + '+' + configs.prefix + '+' + new Date().getTime();
            var token = utils.encrypt(password, configs.secret);

            req.session.token = token;
            var cook = req.cookies.web_tian || '';

            var isLogin = false;
            if(cook){
                var c = utils.decrypt(cook, configs.secret);
                var name = utils.getUserName(c);

                isLogin = name == obj.body.name ? false : true;
            }else{
                isLogin = true;
            }


            if(isLogin){//这里判断如果name相等说明cookie已经存在，否则就重新设置cookie
                res.cookie('web_tian', token, {
                    maxAge: 1000*60*60*24,//cookie一天过期
                    httpOnly: false,
                    path: '/',
                    secure: false
                });
            }

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
        code += srcstr.substr(Math.floor(Math.random()*len), 1) + ' ';
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

    var c = utils.getUserName(utils.decrypt(cookie['web_tian'], configs.secret));
    var s = utils.getUserName(utils.decrypt(req.session.token, configs.secret));

    if(!s || !c || s != c){
        result = {code: 201, msg: '身份识别失败'};
    }else if(c == s){
        result = {code: 200, msg: 'success', body: {name: s}}
    }else{
        result = {code: 203, msg: '身份识别失败'};
    }

    res.send(result);
});

//退出登录
router.get('/logout', function (req, res, next) {
    req.session.token = null;
    res.send({code: 200, msg: 'success'});
});

//新建项目
router.post('/createProduct', function (req, res, next) {
    var data = req.body;
    var session = req.cookies.web_tian;

    var nameStr = utils.decrypt(session, configs.secret);
    var name = utils.getUserName(nameStr);

    var time = new Date();
    var t = time.getSeconds() + time.getMilliseconds();//重复率 1/60000
    var pid = name + '+' + data.type + '+' + t;
    data.pid = utils.encrypt(pid, configs.secret);

    console.log(data);

    // utils.postMethedToken(url, data, req.session.token, req.cookies.web_tian, function(data) {
    //
    // });

    res.send({"code":200});
});

router.post("/uploadimg", function (req, res, next) {
    var name = '',
        path = '';
    fs.exists('./tempFiles', function (exist) {
        if (!exist) {
            fs.mkdir('./tempFiles');
        }
    });
    var form = new multiparty.Form({uploadDir: './tempFiles'});

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('parse error: ' + err);
        } else {
            var inputFile = files.file[0];
            name = 'uploads/' + inputFile.originalFilename;
            path = inputFile.path;

            ossClient.put(name, path).then((data) => {
                // console.log(data);
                fs.unlink(inputFile.path, () => {});
            });
        }
        res.json({status: 'success', path: configs.oss.addr + name});
    });
});

module.exports = router;

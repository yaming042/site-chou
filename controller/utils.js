var crypto = require('crypto');
var request = require('request');

exports.encrypt = function(password, secret) {//password:需要加密的字符串，secret:加密的秘钥
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(password, 'utf8', 'hex'); //编码方式从utf-8转为hex;
    enc += cipher.final('hex'); //编码方式从转为hex;

    return enc;
};

exports.decrypt = function(data, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(data, 'hex', 'utf8'); //编码方式从hex转为utf-8;
    dec += decipher.final('utf8'); //编码方式从utf-8;

    return dec;
};

exports.getMethed = function (url, callback) {
    request({
        url: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    },function (error, response, body) {
        if( error ){
            callback('{"status": "error","msg": "服务器请求错误"}');
        }else{
            try {
                callback(body);
            } catch (err) {
                console.log(err);
                console.log("Error name: " + err.name + "");
                console.log("Error message: " + err.message);
                callback('{"status": "err","msg": "服务器请求错误"}');
            }
        }
    });
};

//post方法
exports.postMethed = function (url, data, callback) {

    request({
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    },function (error, response, body) {
        if( error ){
            callback('{"status": "error","msg": "服务器请求错误"}');
        }else{
            try {
                if (JSON.parse(body)) {
                    callback(body);
                }
            } catch (err) {
                console.log(err);
                console.log("Error name: " + err.name + "");
                console.log("Error message: " + err.message);
                callback('{"status": "err","msg": "服务器请求错误"}');
            }
        }
    });
};

//get方法，带token
exports.getMethedToken = function(url, token, cookie, callback){
    var result = {};

    if(!token || !cookie || token != cookie){
        result = {
            code: 10114,
            msg: '用户认证失败'
        };
        callback(JSON.stringify(result));
        return;
    }else if(token == cookie){
        request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        },function (error, response, body) {
            if( error ){
                callback('{"status": "error","msg": "服务器请求错误"}');
            }else{
                try {
                    callback(JSON.stringify({
                        code: 200,
                        msg: 'success',
                        body: body
                    }));
                } catch (err) {
                    console.log(err);
                    console.log("Error name: " + err.name + "");
                    console.log("Error message: " + err.message);
                    callback('{"status": "err","msg": "服务器请求错误"}');
                }
            }
        });
    }else{
        result = {
            code: 10115,
            msg: '用户认证失败'
        };
        callback(JSON.stringify(result));
        return;
    }
};

//post方法，带token
exports.postMethedToken = function(url, data, token, cookie, callback){
    var result = {};
    if(!token || !cookie || token != cookie){
        result = {
            code: 10114,
            msg: '用户认证失败'
        };
        callback(JSON.stringify(result));
        return;
    }else if(token == cookie){
        request({
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        },function (error, response, body) {
            if( error ){
                callback('{"status": "error","msg": "服务器请求错误"}');
            }else{
                try {
                    callback(JSON.stringify({
                        code: 200,
                        msg: 'success',
                        body: body
                    }));
                } catch (err) {
                    console.log(err);
                    console.log("Error name: " + err.name + "");
                    console.log("Error message: " + err.message);
                    callback('{"status": "err","msg": "服务器请求错误"}');
                }
            }
        });
    }else{
        result = {
            code: 10115,
            msg: '用户认证失败'
        };
        callback(JSON.stringify(result));
        return;
    }
};

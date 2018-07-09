var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.render('admin', { title: '管理后台', bundle: '/dist/admin_bundle.js' });
// });

router.get('/*', function (req, res, next) {
    console.log(req.cookies);
    next();
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

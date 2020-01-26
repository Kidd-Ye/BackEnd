var express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");

router.post('/user/register', (req, res) => {
    let user = require('./controllers/user');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    user.register(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/user/login', (req, res) => {
    let user = require('./controllers/user');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    user.login(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.get('/home/GetPhotoList', (req, res) => {
    let upload = require('./controllers/upload');

    upload.readPath().then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;

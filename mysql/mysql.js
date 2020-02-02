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

router.post('/home/GetPhotoList', (req, res) => {
    let upload = require('./controllers/upload');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    upload.readPath(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/editPost/writePost', (req, res) => {
    let editPost = require('./controllers/editPost');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    editPost.writePost(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/editPost/readPost', (req, res) => {
    let editPost = require('./controllers/editPost');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    editPost.readPost(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/admin/getAllPostByStateAndUserName', (req, res) => {
    let admin = require('./controllers/admin');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    admin.getAllPostByStateAndUserName(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/admin/changePostStateById', (req, res) => {
    let admin = require('./controllers/admin');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    admin.changePostStateById(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/admin/getPostDetail', (req, res) => {
    let admin = require('./controllers/admin');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    admin.getPostDetail(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});


module.exports = router;

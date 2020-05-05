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

router.post('/user/changeInfo', (req, res) => {
    let user = require('./controllers/user');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    user.changeInfo(strObj).then(result => {
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

router.post('/editPost/readPostByTypeAndState', (req, res) => {
    let editPost = require('./controllers/editPost');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    editPost.readPostByTypeAndState(strObj).then(result => {
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

router.post('/editPost/getAllTheme', (req, res) => {
    let editPost = require('./controllers/editPost');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    editPost.getAllTheme(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/comment/publishComment', (req, res) => {
    let comment = require('./controllers/comment');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    comment.writeComment(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/comment/getComment', (req, res) => {
    let comment = require('./controllers/comment');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    comment.readComment(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/star/getStarList', (req, res) => {
    let star = require('./controllers/star');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    star.starList(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/star/star', (req, res) => {
    let star = require('./controllers/star');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    star.star(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/star/unstar', (req, res) => {
    let star = require('./controllers/star');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    star.unstar(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});


router.post('/star/getUserStarList', (req, res) => {
    let star = require('./controllers/star');
    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    star.getUserStarList(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/user/getUserList', (req, res) => {
    let user = require('./controllers/user');

    user.getUserList({}).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/user/getFollowList', (req, res) => {
    let follow = require('./controllers/follow');

    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    follow.getFollowList(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/user/followSb', (req, res) => {
    let follow = require('./controllers/follow');

    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    follow.followSb(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/user/unfollow', (req, res) => {
    let follow = require('./controllers/follow');

    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    follow.unfollow(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});


router.post('/user/getFollowListDetail', (req, res) => {
    let follow = require('./controllers/follow');

    let info = req.body.request;

    let info_bytes  = CryptoJS.AES.decrypt(info, 'kidd');
    let string = info_bytes.toString(CryptoJS.enc.Utf8);
    let strObj = JSON.parse(string);

    follow.getFollowListDetail(strObj).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;

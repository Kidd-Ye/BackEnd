var express = require('express');
const router = express.Router();

router.get('/user/register', (req, res) => {
    let user = require('./controllers/user');
    // let info = {
    //     name: req.body.username,
    //     password: req.body.password
    // };
    let info = {
        username: "123ur",
        password: "123ps"
    };
    user.register(info).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

router.get('/user/login', (req, res) => {
    let user = require('./controllers/user');
    // let info = {
    //     name: req.body.username,
    //     password: req.body.password
    // };
    let info = {
        username: "123ur",
        password: "123ps"
    };
    user.login(info).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;

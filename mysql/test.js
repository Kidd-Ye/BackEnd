var express = require('express');
var app = express();
var http = require('http');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});


app.get('/user/register', (req, res) => {
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

app.get('/user/login', (req, res) => {
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

app.listen(5100);
console.log("strat 5100");

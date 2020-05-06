const path = require('path');
const uploadFiles = require('./upload/uploadFiles');
const mysql = require('./mysql/mysql');
const editPost = require('./mysql/mysql');
const bodyParser = require('body-parser');

module.exports = app => {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        next();
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // 上传文件
    app.use('/upload', uploadFiles);
    // 数据库操作
    app.use('/mysql', mysql);

    // app.get('/static_files/*',  (req, res) => {
    //     // res.sendFile( __dirname + req.url );
    //     let root = __dirname;
    //     root = root.replace("/BackEnd", "");
    //     let finalpath = root + req.url;
    //     res.sendFile(finalpath);
    //     console.log("Request for " + req.url + " received.");
    // });

};




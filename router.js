const path = require('path');
const uploadFiles = require('./upload_files/uploadFiles');
const mysql = require('./mysql/index');

module.exports = app => {
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

};




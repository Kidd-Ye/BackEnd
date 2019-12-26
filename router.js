const path = require('path');
const uploadFiles = require('./uploadFiles/uploadFiles');
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
    // 读取文件数据
    app.use('/mysql', mysql);

};




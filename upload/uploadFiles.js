const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
// const path = require("path");

let createFolder = (folder) => {
    try {
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    } catch (e) {
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

// 创建文件夹
const uploadFolder = 'static_files';//path.resolve('static_files');
// console.log("path", ); // /Users/kidd/Documents/Kidd/design/clothes/static_files path.resolve('static_files')
createFolder(uploadFolder);

let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'static_files');//cb(null, path.resolve('static_files'));
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'-'+file.originalname;
            cb(null, changedName);
        }
    })
});

//单个文件上传
router.post('/single', upload.single('singleFile'), (req, res) => {
    console.log(req.file);
    let result_log = {
        type: 'single',
        originalname: req.file.originalname,
        path: req.file.path
    };

    let type = 0;
    if(req.body.type){
        type = req.body.type;
    }

    let filePath = require('../mysql/controllers/upload');
    let json = {
        type: type,
        path: req.file.path.replace(/static_files/, 'img')
    };

    filePath.writePath(json).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

//多个文件上传
router.post('/multer', upload.array('multerFile'), (req, res) => {
    console.log(req.files);
    let fileList = [];
    req.files.map((elem) => {
        fileList.push({
            originalname: elem.originalname
        })
    });
    res.json({
        code: '0',
        type: 'multer',
        fileList: fileList
    });
});

module.exports = router;

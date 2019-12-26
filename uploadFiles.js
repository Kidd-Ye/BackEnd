const express = require('express');
const router = express.Router();
const multer = require('multer');

let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
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
    res.json({
        code: '0000',
        type: 'single',
        originalname: req.file.originalname,
        path: req.file.path
    })
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
        code: '0000',
        type: 'multer',
        fileList: fileList
    });
});

module.exports = router;

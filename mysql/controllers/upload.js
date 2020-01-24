const CryptoJS = require("crypto-js");
class FilePath {

    constructor() {
        this.db = require('../dao/connect');
    }
    // 图片上传路径入库
    writePath(json) {
        return new Promise((resolve, reject) => {
            this.db.insert(json, 'tb_file_path').then(result => {
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(json), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }
}

module.exports = new FilePath();

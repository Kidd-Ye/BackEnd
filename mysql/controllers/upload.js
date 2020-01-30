const CryptoJS = require("crypto-js");
class FilePath {

    constructor() {
        this.db = require('../dao/connect');
    }
    // 图片上传路径入库
    writePath(json) {
        return new Promise((resolve, reject) => {
            this.db.insert(json, 'tb_file_path').then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(json), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }
    // 多路径入库
    writePathList(jsonList) {
        return new Promise((resolve, reject) => {
            let sql = [];
            jsonList.map((elem) => {
                sql.push(`INSERT INTO tb_file_path(type,path) VALUES('${elem.type}','${elem.path}')`)
            });
            let sqlStr = sql.join(";");
            console.log('sqlStr:', sqlStr);
            this.db.query(sqlStr).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(jsonList), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }
    readPath(json){
        return new Promise((resolve, reject) => {
            this.db.select(['path'], "tb_file_path", { type: json.type }).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }
}

module.exports = new FilePath();

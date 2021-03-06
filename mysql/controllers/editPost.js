const CryptoJS = require("crypto-js");
class EditPost {

    constructor() {
        this.db = require('../dao/connect');
    }
    // 新帖子入库
    writePost(json) {
        return new Promise((resolve, reject) => {
            this.db.insert(json, 'tb_post').then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(json), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

    // 获取帖子
    readPost(json){
        return new Promise((resolve, reject) => {
            this.db.select(['*'], "tb_post", { userid: json.userid, state: json.state}).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

    // 分类获取帖子
    readPostByTypeAndState(json){
        return new Promise((resolve, reject) => {
            let sql = `SELECT t.*, b.username, b.image AS avatar FROM tb_post t LEFT JOIN tb_user b ON t.userid = b.id WHERE t.state = ${json.state}`;
            if(json.hasOwnProperty('type')){
                sql += ` AND t.type = '${json.type}'`;
            }

            if(json.hasOwnProperty('theme')){
                sql += ` AND t.theme LIKE '%${json.theme}%'`;
            }

            if(json.hasOwnProperty('description')){
                sql += ` AND t.description LIKE '%${json.description}%'`;
            }
            if(json.hasOwnProperty('time')){
                sql += ` AND t.time > '${json.time[0]}' AND t.time < '${json.time[1]}'`;
            }
            console.log('sql:', sql);
            this.db.query(sql).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

    // 获取帖子
    getAllTheme(json){
        return new Promise((resolve, reject) => {
            this.db.select(['DISTINCT theme AS value'], "tb_post").then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

}

module.exports = new EditPost();

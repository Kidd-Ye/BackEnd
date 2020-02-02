const CryptoJS = require("crypto-js");
class Admin {

    constructor() {
        this.db = require('../dao/connect');
    }
    // 管理员审核帖子
    changePostStateById(json) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE tb_post SET state = ${json.state} WHERE id in (${json.idList.join(",")})`;
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
    getAllPostByStateAndUserName(json){
        return new Promise((resolve, reject) => {
            let sql = `SELECT t.*, b.username FROM tb_post t LEFT JOIN tb_user b ON t.userid = b.id WHERE t.state = ${json.state}`;
            if(json.username.length > 0){
                sql += ` AND b.username = '${json.username}'`;
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
    // 获取帖子详情
    getPostDetail(json){
        return new Promise((resolve, reject) => {
            this.db.select(['*'], "tb_post", { id: json.id}).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }
}

module.exports = new Admin();

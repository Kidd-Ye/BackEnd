const CryptoJS = require("crypto-js");
class Star {

    constructor() {
        this.db = require('../dao/connect');
    }
    // 点赞
    star(json) {
        return new Promise((resolve, reject) => {
            this.db.insert(json, 'tb_star').then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(json), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

    // 取消赞
    unstar(json) {
        return new Promise((resolve, reject) => {
            this.db.delete(null, 'tb_star', {post_id:json.post_id, creater_id: json.creater_id}).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

    // 获取点赞列表
    starList(json){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM tb_star WHERE post_id = ${json.post_id} order by time asc` // desc降序排序 asc升序
            this.db.query(sql).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }
    getUserStarList(json){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM tb_star WHERE creater_id = ${json.creater_id}` //
            this.db.query(sql).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

}

module.exports = new Star();

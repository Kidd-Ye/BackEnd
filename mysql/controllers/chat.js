const CryptoJS = require("crypto-js");

class Wechat {

    constructor() {
        this.db = require('../dao/connect');
    }

    getChatList(json) {
        return new Promise((resolve, reject) => {
            if(!json.hasOwnProperty('condition')){
                json.condition = "";
            }
            let sql = `select ${json.condition} * from tb_chat where topic_id = '${json.topic_id}' and time < '${json.time}' ORDER BY time asc`;
            this.db.query(sql).then(result => {
                console.log("result", result);
                resolve({
                    code: 0,
                    msg: 'ok',
                    result: CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()
                });
            }).catch(err => {
                reject({code: -1, msg: '错误', err: err});
            });
        });
    }

    sendMessage(json) {
        return new Promise((resolve, reject) => {
            this.db.insert(json, 'tb_chat').then(res => {
                resolve({code: 0, msg: 'ok'});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        }).catch(err => {
            reject({code: -1, msg: '错误', err: err});
        });
    }


}

module.exports = new Wechat();

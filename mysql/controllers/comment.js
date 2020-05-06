const CryptoJS = require("crypto-js");
class Comment {

    constructor() {
        this.db = require('../dao/connect');
    }
    // 新评论入库
    writeComment(json) {
        return new Promise((resolve, reject) => {
            this.db.insert(json, 'tb_comment').then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(json), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

    // 获取评论
    readComment(json){
        return new Promise((resolve, reject) => {
            let sql = `SELECT c.*, u.image, u.username FROM tb_comment c LEFT JOIN tb_user u ON c.creater_id = u.id WHERE c.post_id = ${json.post_id} order by c.time asc` // desc降序排序 asc升序
            this.db.query(sql).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

    // 获取子评论
    readSubComment(json){
        return new Promise((resolve, reject) => {
            let sql = `SELECT c.*, u.image, u.username FROM tb_sub_comment c LEFT JOIN tb_user u ON c.creater_id = u.id WHERE c.post_id = ${json.post_id} and c.comment_id = ${json.comment_id} order by c.time asc` // desc降序排序 asc升序
            this.db.query(sql).then(result => {
                console.log("result",result);
                resolve({code: 0, msg: 'ok', result:CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        });
    }

}

module.exports = new Comment();

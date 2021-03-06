const CryptoJS = require("crypto-js");

class User {

    constructor() {
        this.db = require('../dao/connect');
    }

    // 注册
    register(json) {
        return new Promise((resolve, reject) => { // tb_user 用户表
            this.db.select(['username'], 'tb_user', {username: json.username}).then(result => {
                if (result.length === 0) {
                    this.db.insert(json, 'tb_user').then(res => {
                        resolve({code: 0, msg: 'ok'});
                    }).catch(err => {
                        reject({code: -1, msg: 'error'});
                    });
                } else {
                    reject({code: -1, msg: '已经存在此账号'});
                }
            }).catch(err => {
                reject({code: -1, msg: '错误', err: err});
            });
        });
    }

    // 登录
    login(params) {
        return new Promise((resolve, reject) => {
            this.db.select(['*'], 'tb_user', {username: params.username, password: params.password}).then(result => {
                console.log("result", result);
                if (result.length !== 0) {
                    resolve({
                        code: 0,
                        msg: 'ok',
                        result: CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()
                    });
                } else {
                    reject({code: -1, msg: '账号或密码错误'});
                }
            }).catch(err => {
                reject({code: -1, msg: '错误', err: err});
            });
        });
    }

    getUserList(params) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT
	u.id AS userid,
	u.username,
	u.sex,
	u.image AS avatar,
	u.description,
	r.post_num,
	r.comment_num 
FROM
	tb_user u left join
	(
SELECT
		p.userid,
		c.comment_num,
		p.post_num 
	FROM
		( SELECT creater_id, COUNT( id ) AS comment_num FROM tb_comment GROUP BY creater_id ) c right JOIN
		( SELECT userid, COUNT( id ) AS post_num FROM tb_post GROUP BY userid ) p 
	ON
		c.creater_id = p.userid)r on u.id = r.userid where u.role <> 1`;
            console.log("query sql:", sql);
            this.db.query(sql).then(result => {
                console.log("result", result);
                if (result.length !== 0) {
                    resolve({
                        code: 0,
                        msg: 'ok',
                        result: CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()
                    });
                } else {
                    reject({code: -1, msg: '账号或密码错误'});
                }
            }).catch(err => {
                reject({code: -1, msg: '错误', err: err});
            });
        });
    }

    changeInfo(json){
        return new Promise((resolve, reject) => {
            this.db.update(json, 'tb_user', {id: json.id}).then(result => {
                console.log("result", result);
                if (result.length !== 0) {
                    resolve({
                        code: 0,
                        msg: 'ok',
                        result: CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()
                    });
                } else {
                    reject({code: -1, msg: '修改失败,请重试'});
                }
            }).catch(err => {
                reject({code: -1, msg: '错误', err: err});
            });

        });
    }


}

module.exports = new User();

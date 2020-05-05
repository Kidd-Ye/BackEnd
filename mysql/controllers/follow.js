const CryptoJS = require("crypto-js");

class Follow {

    constructor() {
        this.db = require('../dao/connect');
    }

    getFollowList(json) {
        return new Promise((resolve, reject) => {
            this.db.select(['*'], 'tb_follow_list', {operator_id: json.operator_id}).then(result => {
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

    followSb(json) {
        return new Promise((resolve, reject) => {
            this.db.insert(json, 'tb_follow_list').then(res => {
                resolve({code: 0, msg: 'ok'});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        }).catch(err => {
            reject({code: -1, msg: '错误', err: err});
        });
    }

    unfollow(json) {
        return new Promise((resolve, reject) => {
            this.db.delete(null, 'tb_follow_list', {
                operator_id: json.operator_id,
                follow_user_id: json.follow_user_id
            }).then(result => {
                console.log("result", result);
                resolve({code: 0, msg: 'ok', result: CryptoJS.AES.encrypt(JSON.stringify(result), 'kidd').toString()});
            }).catch(err => {
                reject({code: -1, msg: 'error'});
            });
        }).catch(err => {
            reject({code: -1, msg: '错误', err: err});
        });
    }

    getFollowListDetail(json) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT post.* FROM (SELECT
	r.userid AS id,
	u.username,
	u.sex,
	u.image AS avatar,
	u.description,
	r.post_num,
	r.comment_num 
FROM
	tb_user u,
	(
	SELECT
		p.userid,
		c.comment_num,
		p.post_num 
	FROM
		( SELECT creater_id, COUNT( id ) AS comment_num FROM tb_comment GROUP BY creater_id ) c,
		( SELECT userid, COUNT( id ) AS post_num FROM tb_post GROUP BY userid ) p 
	WHERE
		c.creater_id = p.userid 
	GROUP BY
		p.userid 
	) r 
WHERE
	u.id = r.userid) post LEFT JOIN tb_follow_list f ON post.id = f.follow_user_id WHERE f.operator_id = `+ json.operator_id;
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


}

module.exports = new Follow();

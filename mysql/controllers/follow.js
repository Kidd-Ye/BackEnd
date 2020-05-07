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
            this.db.select(['*'], 'tb_follow_list', {follow_user_id: json.follow_user_id, operator_id: json.operator_id}).then(result => {
                if (result.length === 0) {
                    this.db.insert(json, 'tb_follow_list').then(res => {
                        resolve({code: 0, msg: 'ok'});
                    }).catch(err => {
                        reject({code: -1, msg: 'error'});
                    });
                } else {
                    reject({code: -1, msg: '已经关注过该用户'});
                }
            }).catch(err => {
                reject({code: -1, msg: '错误', err: err});
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
            let sql = `SELECT result.* 
FROM tb_follow_list f 
LEFT JOIN
(
	SELECT 
	u.id AS userid,
	u.username,
	u.sex,
	u.image AS avatar,
	u.description, d.comment_num, d.post_num 
	FROM tb_user u 
	LEFT JOIN (
	SELECT
			p.userid AS userid,
			c.comment_num AS comment_num,
			p.post_num AS post_num
		FROM
			( SELECT creater_id, COUNT( id ) AS comment_num FROM tb_comment GROUP BY creater_id ) c RIGHT JOIN
			( SELECT userid, COUNT( id ) AS post_num FROM tb_post GROUP BY userid ) p 
		ON
			c.creater_id = p.userid
	) d 
	ON u.id = d.userid
	
) result 
ON f.follow_user_id = result.userid
WHERE f.operator_id =` + json.operator_id;
            console.log("sql :", sql);
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

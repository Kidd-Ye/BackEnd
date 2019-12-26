class User {

    constructor() {
        this.db = require('../dao/connect');
    }
    // 注册
    register(json) {
        return new Promise((resolve, reject) => { // tb_user 用户表
            this.db.select(['username'], 'tb_user', { username: json.username }).then(result => {
                if (result.length === 0) {
                    this.db.insert(json, 'tb_user').then(res => {
                        resolve({code: 0, msg: 'ok'});
                    }).catch(err => {
                        reject({code: -1, msg: 'error'});
                    });
                } else {
                    reject({code: -1, msg: '已经存在此账号'});
                }
            });
        });
    }
    // 登录
    login(params) {
        return new Promise((resolve, reject) => {
            this.db.select(['*'], 'tb_user', { username: params.username, password: params.password }).then(result => {
                console.log("result",result);
                if (result.length !== 0) {
                    resolve({code: 0, msg: 'ok', result:result});
                } else {
                    reject({code: -1, msg: '账号或密码错误'});
                }
            });
        });
    }

}

module.exports = new User();

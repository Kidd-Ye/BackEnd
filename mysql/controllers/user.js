class User {

    constructor() {
        this.db = require('../dao/connect');
    }

    register(json) {
        return new Promise((resolve, reject) => {
            this.db.select(['name'], 'tb_user', { name: json.name }).then(result => {
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

}

module.exports = new User();

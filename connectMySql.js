let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mastercom',
    database: 'clothes_project'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});


let sql = 'INSERT INTO tb_user (username, password) VALUES ("zhangye", "zhangye")';
//查
connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});

connection.end();

const mysql = require("mysql");
// 创建链接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '113113zzm',
    port: '3306',
    database: 'blogs'
});
// 开始链接
con.connect();
// sql语句
const sql = 'select id, username from users;';
con.query(sql, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
});
// 关闭链接
con.end();
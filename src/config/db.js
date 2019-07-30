const env = process.env.NODE_ENV; // 环境参数

let MYSQL_CONFIG = {};

if (env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '113113zzm',
        port: '3306',
        database: 'blogs'
    }
}

if (env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '113113zzm',
        port: '3306',
        database: 'blogs'
    }
}

module.exports = {
    MYSQL_CONFIG
}
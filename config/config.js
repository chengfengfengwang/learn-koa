module.exports = {
    environment:'env',
    database:{
        database: '7yue', // 使用哪个数据库
        username: 'root', // 用户名
        password: 'admin123456', // 口令
        host: 'localhost', // 主机名
        port: 3306 // 端口号，MySQL默认3306
    },
    security:{
        secretKey:'abcdefg',
        expiresIn:60 * 60 * 24
    }
}
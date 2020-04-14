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
    },
    wx:{
        appId:'wx02b5ea8dc7308606',
        appSecret:'47f1b0e3160d4390092b772ac22a52e2',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
}
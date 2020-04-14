const bcrypt = require('bcrypt');
const util = require('util');
const {db} = require('../core/db');
const {Sequelize,Model} = require('sequelize');
const {NotFound, AuthFailed} = require('../core/http-exception');
const axios = require('axios');
const { generateToken } = require('../core/util');

class User extends Model{
    static async verifyEmailPassword(email,plainPassword){
        const user = await User.findOne({
            where:{
                email
            }
        });
        
        if(!user){
            throw new NotFound('用户不存在')
        }else{
            const correct = bcrypt.compareSync(plainPassword,user.password);
            if(!correct){
                throw new AuthFailed('密码错误')
            }
        }
        return user
    }
    static async codeToOpenid(code){
        const config = global.config.wx;
        const requestUrl = util.format(config.loginUrl, config.appId, config.appSecret); 
        let result = await axios.get(requestUrl);
        if(result.status!=200){
            throw new AuthFailed('openid获取失败')
        }
        if(result.data.errcode){
            throw new AuthFailed('openid获取失败' + result.data.errcode + result.data.errmsg)
        }
        return result.data.openid
    }
    static async wxLogin(code){
        const openId = await this.codeToOpenid(code)
        const user = await User.findOne({
            where:{
                openId
            }
        });
        
        if(!user){
            //创建用户
            await User.create({
                openId
            })
        }
        //返回token
        return generateToken(openId,2)
    }
}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    //password:Sequelize.STRING,
    password:{
        type:Sequelize.STRING,
        set(val){
            const salt = bcrypt.genSaltSync(10);
            const psw = bcrypt.hashSync(val,salt);
            this.setDataValue('password',psw)
        }
    },
    email:{
        type:Sequelize.STRING(128),
        unique:true
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize:db,
    tableName:'user'
})

module.exports = {
    User
}

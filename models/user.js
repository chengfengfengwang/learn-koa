const bcrypt = require('bcrypt');
const {db} = require('../core/db');
const {Sequelize,Model} = require('sequelize');
const {NotFound, AuthFailed} = require('../core/http-exception');

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

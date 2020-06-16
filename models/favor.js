const { db } = require('../core/db');
const { Sequelize, Model } = require('sequelize');


class Favor extends Model {
    static async like(art_id,type,uid){
        const favor = await Favor.findOne({
            where:{
                art_id,type,uid
            }
        });
        if(favor){
            throw new global.errors.LikeError()
        }
        //Favor.
    }
    static async dislike(art_id,type,uid){

    }
}
Favor.init({
    uid:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
}, {
    sequelize: db,
    tableName: 'favor'
})
module.exports = {
    Favor
}


const { db } = require('../core/db');
const { Sequelize, Model } = require('sequelize');
const { Art } = require('./art')

class Favor extends Model {
    static async like(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id, type, uid
            }
        });
        if (favor) {
            throw new global.errors.LikeError()
        }
        const art = Art.getData(art_id, type);
        db.transaction(async t => {
            await Favor.create({
                art_id, type, uid
            }, { transation: t })
            const art = await Art.getData(art_id, type);
            await art.increment('fav_nums',{by:1,transation: t})
        })

    }
    static async dislike(art_id, type, uid) {

    }
    static async userlike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id, type, uid
            }
        });
        if (favor) {
            return true
        }else{
            return false
        }
    }
}
Favor.init({
    uid: Sequelize.STRING,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
        sequelize: db,
        tableName: 'favor'
    })
module.exports = {
    Favor
}


const { db } = require('../core/db');
const { Sequelize, Model } = require('sequelize');


class Flow extends Model {

}
Flow.init({
    index:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
}, {
    sequelize: db,
    tableName: 'flow'
})
// setTimeout(() => {
//     Flow.create({
//         index: 1,
//         art_id: 1,
//         type: 100,
//     })
//     Flow.create({
//         index: 2,
//         art_id: 1,
//         type: 200,
//     })
// }, 1000);
module.exports = {
    Flow
}


const Sequelize = require("sequelize");
const {
  database,
  username,
  password,
  host,
  port
} = require("../config/config").database;
const sequelize = new Sequelize(database, username, password, {
    dialect:'mysql',
    host,
    port,
    logging:true,
    timezone:'+08:00',
    define:{
      timestamps: true,
      paranoid:true,
      // createdAt:'created_at',
      // updatedAt:'updated_at',
      // deletedAt:'deleted_at',
      underscored:true
    }
});
//sequelize.sync({ force: true });
module.exports = {
    db:sequelize
}

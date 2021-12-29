const SequelizeMain = require("sequelize");
const sequelize = new SequelizeMain("node_complete", "root", "Sql@2022", {
  dialect: "mysql",
  host: "localhost",
});
module.exports=sequelize;
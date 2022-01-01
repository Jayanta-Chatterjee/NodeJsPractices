const SequelizeMain = require("sequelize");

const sequelize = require("../util/database");

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: SequelizeMain.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity:SequelizeMain.INTEGER
});

module.exports=OrderItem;
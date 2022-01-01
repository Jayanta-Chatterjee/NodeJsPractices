const SequelizeMain = require("sequelize");

const sequelize = require("../util/database");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: SequelizeMain.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity:SequelizeMain.INTEGER
});

module.exports=CartItem;
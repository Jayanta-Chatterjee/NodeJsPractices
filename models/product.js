const SequelizeMain = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: SequelizeMain.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: SequelizeMain.STRING,
  price: {
    type: SequelizeMain.DOUBLE,
    allowNull: false,
  },
  description: SequelizeMain.STRING,
  imageUrl: {
    type: SequelizeMain.STRING,
    allowNull: false,
  },
});

module.exports=Product;
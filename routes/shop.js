const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const shopController=require('../controllers/shop');

const shopRouter = express.Router();
shopRouter.get("/",shopController.getIndex);
shopRouter.get("/products",shopController.getAllProducts);

shopRouter.get("/cart",shopController.getCart);
shopRouter.get("/order",shopController.getOrders);
shopRouter.get("/checkout",shopController.getCheckout);

module.exports = shopRouter;

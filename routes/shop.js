const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const shopController=require('../controllers/shop');

const shopRouter = express.Router();
shopRouter.get("/",shopController.getIndex);
shopRouter.get("/products",shopController.getAllProducts);
shopRouter.get("/products/:productId",shopController.getProductDetails);

shopRouter.get("/cart",shopController.getCart);
shopRouter.post("/cart",shopController.postCart);

shopRouter.get("/orders",shopController.getOrders);

shopRouter.post("/delete-cart",shopController.postDeleteCart);
shopRouter.post("/create-order",shopController.postOrderCreate);
module.exports = shopRouter;

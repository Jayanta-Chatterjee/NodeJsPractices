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

shopRouter.get("/order",shopController.getOrders);
shopRouter.get("/checkout",shopController.getCheckout);
shopRouter.post("/delete-cart",shopController.postDeleteCart);
module.exports = shopRouter;

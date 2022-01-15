const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const shopController = require("../controllers/shop");
const isAuth = require("../routes_protect/is_auth");

const shopRouter = express.Router();
shopRouter.get("/", shopController.getIndex);
shopRouter.get("/products", shopController.getAllProducts);
shopRouter.get("/products/:productId", shopController.getProductDetails);

shopRouter.get("/cart", isAuth, shopController.getCart);
shopRouter.post("/cart", isAuth, shopController.postCart);

shopRouter.get("/orders", isAuth, shopController.getOrders);

shopRouter.post("/delete-cart", isAuth, shopController.postDeleteCart);
shopRouter.post("/create-order", isAuth, shopController.postOrderCreate);
shopRouter.get('/orders/:orderId',isAuth,shopController.getInvoice);

module.exports = shopRouter;

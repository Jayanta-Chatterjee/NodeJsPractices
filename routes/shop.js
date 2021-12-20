const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const adminData = require("./admin");

const shopRouter = express.Router();
shopRouter.get("/", (req, res, next) => {
  // res.send("<h2>Hey there!</h2>");
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir,'views','shop.html'));
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    docTitle: "My Shop",
    path: "/shop",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS:true
  });
});
module.exports = shopRouter;

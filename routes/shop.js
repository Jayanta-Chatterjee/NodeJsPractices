const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const productController=require('../controllers/products');

const shopRouter = express.Router();
shopRouter.get("/",productController.getAllProducts);
module.exports = shopRouter;

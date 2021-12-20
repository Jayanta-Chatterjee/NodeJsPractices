const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();
const products = [];
router.get("/add-product", (req, res, next) => {
  // res.sendFile(path.join(rootDir,'views','add-product'));
  res.render("add-product", {
    docTitle: "Add new Products",
    path: "admin/add-product",
    activeAddProd: true,
    formsCSS:true,
    productCSS:true
  });
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});
module.exports.router = router;
module.exports.products = products;

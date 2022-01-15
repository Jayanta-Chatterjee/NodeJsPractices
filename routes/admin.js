const express = require("express");
const { body } = require("express-validator/check");

const path = require("path");

const rootDir = require("../util/path");
const adminController = require("../controllers/admin");
const isAuth = require("../routes_protect/is_auth");

const router = express.Router();
router.get("/add-product", isAuth, adminController.GetAddProducts);
router.get("/edit-product/:productId", isAuth, adminController.GetEditProducts);

router.post(
  "/add-product",
  [
    body("title", "Title should be alphanumeric only and length >3")
      .isString()
      .isLength({ min: 3 })
      .trim(),    
    body("price").isFloat(),
    body("description").isLength({ min: 5 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct
);
router.get("/products", isAuth, adminController.getAdminProducts);
router.post("/edit-product",[
    body("title", "Title should be alphanumeric only")
      .isString()
      .isLength({ min: 3 })
      .trim(),    
    body("price").isFloat(),
    body("description").isLength({ min: 5 }).trim(),
  ], isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProdut);
module.exports = router;

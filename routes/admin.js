const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const adminController = require("../controllers/admin");
const isAuth = require("../routes_protect/is_auth");

const router = express.Router();
router.get("/add-product", isAuth, adminController.GetAddProducts);
router.get("/edit-product/:productId", isAuth, adminController.GetEditProducts);

router.post("/add-product", isAuth, adminController.postAddProduct);
router.get("/products", isAuth, adminController.getAdminProducts);
router.post("/edit-product", isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProdut);
module.exports = router;

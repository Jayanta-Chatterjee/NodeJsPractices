const express = require("express");
const { check, body } = require("express-validator/check");

const path = require("path");

const rootDir = require("../util/path");
const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get(
  "/login",
  [body("email").isEmail().withMessage("Invalid Email ID.").normalizeEmail()],
  authController.getLogin
);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter valid email.")      
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exist, please use different.");
          }
          return true;
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password not match with confirm password");
      }
      return true;
    }),
  ],
  authController.postSignup
);
router.get("/reset", authController.getReset);

module.exports = router;

const crypto=require('crypto');

const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // let isLoggedIn=req.get('Cookie').split(';')[2].trim().split('=')[1];
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    docTitle: "Login",
    path: "/login",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatched) => {
          if (isMatched) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          } else {
            req.flash("error", "Invalid email or password.");
            res.redirect("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  // req.isLoggedIn=true;
  // res.setHeader('Set-Cookie','LoggedIn=true');
  //   req.session.isLoggedIn = true;
  //   res.redirect("/");
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    docTitle: "Signup",
    path: "/orders",
    errorMessage:message
  });
};
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const fullName = req.body.fName;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        req.flash('error','Email already exist, please use different.');
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hasPassword) => {
          const userObj = new User({
            email: email,
            name: fullName,
            password: hasPassword,
            cart: { items: [] },
          });
          return userObj.save();
        })
        .then((result) => {
          console.log(result);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getReset=(req,res,next)=>{
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    docTitle: "Reset Password",
    path: "/reset",
    errorMessage:message
  });
};
exports.postReset=(req,res,next)=>{
  crypto.randomBytes(32,(err,buffer)=>{
    if (err) {
      console.log(err);
      res.redirect('/reset');
    }
    const token=buffer.toString('hex');
    
  })
}
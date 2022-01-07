const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // let isLoggedIn=req.get('Cookie').split(';')[2].trim().split('=')[1];
  let isLoggedIn = req.session.isLoggedIn;
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    docTitle: "Login",
    path: "/login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("61d6f1ecf602726ae4600f61")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
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

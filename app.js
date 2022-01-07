const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// var exphbs  = require('express-handlebars');
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);
const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");

const errorController = require("./controllers/error");
// const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");
const console = require("console");
const MONGODB_URI =
  "mongodb+srv://mongoUser:logMongo@cluster0.l8kdn.mongodb.net/node_complete?w=majority";
const app = express();

const storeDb = new mongoDbSession({
  uri: MONGODB_URI,
  collection: "sessions",
});
// const hbs=exphbs.create({ extname:'hbs', layoutsDir:'views/layouts', defaultLayout:'main-layouts' });
// app.engine('hbs', hbs.engine);
app.set("view engine", "ejs");

// app.set('view engine','pug');
// app.set('view engine','hbs');

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: storeDb,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      // console.log('User: ',user);
      next();
    })
    .catch((err) => console.log(err));
  // const appUser=new User('Arjun','test@test.com');
  // appUser.save();
  // const user=new User({
  //   name:'Arjun',
  //   email:'test@test.com',
  //   cart:{items:[]}
  // });
  // user.save();
  // next();
});

app.use("/admin", adminRoutes);
app.use(shopRouter);
app.use(authRouter);
app.use(errorController.get404);
let port = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(port, (err) => {
      console.log(err);
      console.log("Server is up and running on port numner " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

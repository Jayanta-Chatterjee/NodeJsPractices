const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// var exphbs  = require('express-handlebars');
const mongoose = require("mongoose");
const session = require("express-session");
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
  },
});

const fileFilters=(req,file,cb)=>{
  if (file.mimetype==='image/jpg' || file.mimetype==='image/png' || file.mimetype==='image/jpeg') {
    cb(null,true);
  }else{
    cb(null,false);
  } 
}
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
const csrfProtection = csrf();

// const hbs=exphbs.create({ extname:'hbs', layoutsDir:'views/layouts', defaultLayout:'main-layouts' });
// app.engine('hbs', hbs.engine);
app.set("view engine", "ejs");

// app.set('view engine','pug');
// app.set('view engine','hbs');

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage,fileFilter:fileFilters }).single("image"));

app.use(express.static(path.join(__dirname, "public")));
app.use('/images',express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: storeDb,
  })
);
app.use(csrfProtection);
app.use(flash());

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
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRouter);
app.use(authRouter);

app.use("/500", errorController.get500);
app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.redirect("/500");
});

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

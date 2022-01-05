const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// var exphbs  = require('express-handlebars');

const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User=require('./models/user');
const console = require("console");

const app = express();
// const hbs=exphbs.create({ extname:'hbs', layoutsDir:'views/layouts', defaultLayout:'main-layouts' });
// app.engine('hbs', hbs.engine);
app.set("view engine", "ejs");

// app.set('view engine','pug');
// app.set('view engine','hbs');

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next)=>{
    User.findById('61d5978e233018f373fb6e70')
    .then(user=>{
        req.user=new User(user.name,user.email,user.cart,user._id);
        // console.log('User: ',user);
        next();
    })
    .catch(err=>console.log(err));
    // const appUser=new User('Arjun','test@test.com');
    // appUser.save();
    // next();
})

app.use("/admin", adminRoutes);
app.use(shopRouter);
app.use(errorController.get404);
let port = process.env.PORT || 3000;
mongoConnect(()=>{  
  app.listen(port, (err) => {
    console.log(err);
    console.log("Server is up and running on port numner " + port);
  });
});




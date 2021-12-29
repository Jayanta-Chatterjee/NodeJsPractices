const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// var exphbs  = require('express-handlebars');

const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product=require('./models/product');
const User=require('./models/user');

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
    User.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>console.log(err));
})

app.use("/admin", adminRoutes);
app.use(shopRouter);
app.use(errorController.get404);
let port = process.env.PORT || 3000;

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);

sequelize
//   .sync({force:true})
.sync()
  .then((result) => {
    // console.log(result);
    return User.findByPk(1);
   
  }).then(user=>{
      if (!user) {
          return User.create({email:'test@test.com',name:'Jayanta'});
      }
      return user;    
  })
  .then(user=>{
    //   console.log(user);
      app.listen(port, (err) => {
        console.log(err);
        console.log("Server is up and running on port numner " + port);
      });
  })
  .catch((err) => console.log(err));



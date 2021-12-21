const express = require("express");
const path=require('path');
const bodyParser=require('body-parser');
// var exphbs  = require('express-handlebars');

const adminRoutes=require('./routes/admin');
const shopRouter=require('./routes/shop');
const errorController=require('./controllers/error');

const app = express();
// const hbs=exphbs.create({ extname:'hbs', layoutsDir:'views/layouts', defaultLayout:'main-layouts' });
// app.engine('hbs', hbs.engine);
app.set('view engine','ejs');

// app.set('view engine','pug');
// app.set('view engine','hbs');

app.set('views','views');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(shopRouter);
app.use(errorController.get404);
app.listen(3000);

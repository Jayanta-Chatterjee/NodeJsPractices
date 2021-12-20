const express = require("express");
const path=require('path');
const bodyParser=require('body-parser');
// var exphbs  = require('express-handlebars');

const adminData=require('./routes/admin');
const shopRouter=require('./routes/shop');

const app = express();
// const hbs=exphbs.create({ extname:'hbs', layoutsDir:'views/layouts', defaultLayout:'main-layouts' });
// app.engine('hbs', hbs.engine);
app.set('view engine','ejs');

// app.set('view engine','pug');
// app.set('view engine','hbs');

app.set('views','views');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.router);
app.use(shopRouter);
app.use((req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','notFound.html'));
    res.status(404).render('notFound',{docTitle:'Not Found!',path:''});
});
app.listen(3000);

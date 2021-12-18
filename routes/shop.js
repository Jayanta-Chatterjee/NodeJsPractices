const express=require('express');
const path=require('path');

const rootDir=require('../util/path');

const shopRouter=express.Router();

shopRouter.get("/", (req, res, next) => {
    // res.send("<h2>Hey there!</h2>");
    res.sendFile(path.join(rootDir,'views','shop.html'));
  });
  module.exports=shopRouter;
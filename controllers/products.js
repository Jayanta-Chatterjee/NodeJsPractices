const Product=require('../models/product');

exports.GetAddProducts= (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','add-product'));
    res.render("add-product", {
      docTitle: "Add new Products",
      path: "admin/add-product",
      activeAddProd: true,
      formsCSS:true,
      productCSS:true
    });
  }
  exports.postAddProduct=(req, res, next) => {
    // console.log(req.body);
    // products.push({ title: req.body.title });
    const product=new Product(req.body.title);
    product.save();
    res.redirect("/");
  }
  exports.getAllProducts= (req, res, next) => {     
      Product.fetchAll(products=>{
        res.render("shop", {
            prods: products,
            docTitle: "My Shop",
            path: "/shop",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS:true
          });
      });        
  }
 
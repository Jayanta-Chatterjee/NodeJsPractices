const Product=require('../models/product');

exports.GetAddProducts= (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','add-product'));
    res.render("admin/add-product", {
      docTitle: "Add new Products",
      path: "admin/add-product"
    });
  }
  exports.postAddProduct=(req, res, next) => {
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;
    const product=new Product(title,imageUrl,description,price);
    product.save();
    res.redirect("/");
  }
  
  exports.getAdminProducts=(req, res, next) => {     
    Product.fetchAll(products=>{
      res.render("admin/products", {
          prods: products,
          docTitle: "My Shop",
          path: "/admin/products"
        });
    });        
}
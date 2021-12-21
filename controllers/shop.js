const Product=require('../models/product');

  exports.getAllProducts= (req, res, next) => {     
      Product.fetchAll(products=>{
        res.render("shop/product-list", {
            prods: products,
            docTitle: "My Shop",
            path: "/products"
          });
      });        
  }
 
  exports.getIndex= (req, res, next) => {     
    Product.fetchAll(products=>{
      res.render("shop/index", {
          prods: products,
          docTitle: "My Shop",
          path: "/shop"
        });
    });        
}
exports.getCart=(req, res, next) => {     
    
      res.render("shop/cart", {
    
          docTitle: "My cart",
          path: "/cart"
        });
    
}
exports.getCheckout=(req, res, next) => {       
    res.render("shop/checkout", {        
        docTitle: "Checkout",
        path: "/cart"
      });
         
}
exports.getOrders=(req, res, next) => {       
  res.render("shop/order", {        
      docTitle: "My Order",
      path: "/order"
    });
       
}
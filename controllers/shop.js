const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "My Shop",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getProduct(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        prods: product,
        docTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        docTitle: "My Shop",
        path: "/shop",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getCart = (req, res, next) => {
  req.user
    .getCart()    
    .then((products) => {
      console.log(products);
      res.render("shop/cart", {
        docTitle: "My cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getProduct(prodId)
    .then(product=>{
      return req.user.addToCart(product);
    })
    .then(result=>{
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });  
};
exports.postDeleteCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteCartItem(productId)       
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
exports.postOrderCreate = (req, res, next) => {
  
  req.user
    .addOrder()    
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      console.log(orders);
      res.render("shop/order", {
        docTitle: "My Order",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

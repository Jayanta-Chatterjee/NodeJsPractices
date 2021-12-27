const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "My Shop",
      path: "/products",
    });
  });
};
exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    console.log(product);
    res.render("shop/product-detail", {
      prods: product,
      docTitle: product.title,
      path: "/products",
    });
  });
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "My Shop",
      path: "/shop",
    });
  });
};
exports.getCart = (req, res, next) => {
  Cart.getCart((carts) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        let cartProdData = carts.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProdData) {
          cartProducts.push({ productData: product, qty: cartProdData.qty });
        }
      }
      res.render("shop/cart", {
        docTitle: "My cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
exports.postDeleteCart = (req, res, next) => {
  const productId = req.body.id;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart")
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/cart",
  });
};
exports.getOrders = (req, res, next) => {
  res.render("shop/order", {
    docTitle: "My Order",
    path: "/order",
  });
};

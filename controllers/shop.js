const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const stripe = require("stripe")(
  "sk_test_51KJeb8SIhcssQQUHB8tMJWbLuqaC48yCXkN7GZs66kx8hdvwipqsfer9NqErT4BFcfYd33lGsJFHzdBN5MSYpFO700w9y7Kk4z"
);

const ITEMS_PER_PAGE = 2;

const Product = require("../models/product");
const Order = require("../models/order");
const fileHelper = require("../util/file");
const Pagination = require("../models/pagination");

exports.getAllProducts = (req, res, next) => {
  const page = +req.query.page || 1;

  let totalItems;
  Product.find()
    .countDocuments()
    .then((totalDocs) => {
      totalItems = totalDocs;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      let pagination = new Pagination(totalItems, page, ITEMS_PER_PAGE);

      res.render("shop/product-list", {
        prods: products,
        docTitle: "My Shop",
        path: "/products",
        pagination: pagination,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        prods: product,
        docTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};
exports.getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  Product.find()
    .countDocuments()
    .then((totalDocs) => {
      totalItems = totalDocs;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      let pagination = new Pagination(totalItems, page, ITEMS_PER_PAGE);
      res.render("shop/index", {
        prods: products,
        docTitle: "My Shop",
        path: "/shop",
        pagination: pagination,
      });
    })
    .catch((err) => {
      console.log(err);
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};
exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      let products = user.cart.items;
      res.render("shop/cart", {
        docTitle: "My cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => {
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};
exports.getCheckout = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      let total = 0;
      let products = user.cart.items;
      products.forEach((p) => {
        total += p.quantity * p.productId.price;
      });
      res.render("shop/checkout", {
        docTitle: "Checkout",
        path: "/checkout",
        products: products,
        total: total,
      });
    })
    .catch((err) => {
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};
exports.postDeleteCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteCartItem(productId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};
exports.postOrderCreate = async (req, res, next) => {
  const token = req.body.stripeToken;

  let totalSum = 0;

  req.user
    .populate("cart.items.productId")
    .then((user) => {
      user.cart.items.forEach((p) => {
        totalSum += p.quantity * p.productId.price;
      });

      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: { name: req.user.name, userId: req.user },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      const charge = stripe.charges.create({
        amount: totalSum * 100,
        currency: "usd",
        description: "Demo order",
        source: token,
        metadata: { order_id: result._id.toString() },
      });
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};
exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/order", {
        docTitle: "My Order",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};
exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        console.log("no order");
        return next(new Error("Invoice Order Id"));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        console.log("Unauthorized");
        return next(new Error("Unauthorized."));
      }
      const invoiceName = "test-" + orderId + ".pdf";
      const invoicePath = path.join("data", "Invoices", invoiceName);
      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + invoiceName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);
      pdfDoc.fontSize(26).text("Invoice", {
        underline: true,
      });
      pdfDoc.text("-----------------------");
      let totalPrice = 0;
      order.products.forEach((prod) => {
        totalPrice += prod.quantity * prod.product.price;
        pdfDoc
          .fontSize(14)
          .text(
            prod.product.title +
              " - " +
              prod.quantity +
              " x " +
              "$" +
              prod.product.price
          );
      });
      pdfDoc.text("---");
      pdfDoc.fontSize(20).text("Total Price: $" + totalPrice);

      pdfDoc.end();
      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.setHeader("Content-Type", "application/pdf");
      //   res.setHeader(
      //     "Content-Disposition",
      //     'inline; filename="' + invoiceName + '"'
      //   );
      //   res.send(data);
      // });
      // const file=fs.createReadStream(invoicePath);

      //   file.pipe(res);
    })
    .catch((err) => next(err));
};

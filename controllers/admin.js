const Product = require("../models/product");
const { validationResult } = require("express-validator/check");
const mongoose = require("mongoose");
const fileHelper=require('../util/file');

exports.GetAddProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir,'views','add-product'));
  res.render("admin/edit-product", {
    docTitle: "Add new Products",
    path: "admin/add-product",
    editing: false,
    errorMessage: "",
    oldInput: { title: "", price: "", description: "", imageUrl: "" },
    validationErros: [],
    hasError: false,
  });
};
exports.GetEditProducts = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // req.user.getProducts(({where:{id:prodId} }))
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        docTitle: "Edit Products",
        path: "admin/edit-product",
        editing: editMode,
        product: product,
        errorMessage: "",
        hasError: true,
        validationErros: [],
      });
    })
    .catch((err) => console.log(err));
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  if (!image) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Add new Products",
      path: "admin/add-product",
      editing: false,
      errorMessage: "File should be in Image format.",
      product: {
        title: title,
        price: price,
        description: description,
      },
      hasError: true,
      validationErros: [],
    });
  }
  const imageUrl = image.path;
  const prod = new Product({
    // _id:new mongoose.Types.ObjectId("61d70331764ee40c6292a42a"),
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Add new Products",
      path: "admin/add-product",
      editing: false,
      errorMessage: errors.array()[0].msg,
      product: {
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
      },
      hasError: true,
      validationErros: errors.array(),
    });
  }
  prod
    .save()
    .then((result) => {
      console.log(result);
      res.render("admin/edit-product", {
        docTitle: "Add new Products",
        path: "admin/add-product",
        editing: false,
        errorMessage: "",
        oldInput: {
          title: title,
          price: price,
          description: description,
          imageUrl: imageUrl,
        },
        validationErros: [],
        hasError: false,
      });
    })
    .catch((err) => {
      // console.log(err);
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};

exports.getAdminProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "My Shop",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "admin/edit-product",
      editing: true,
      errorMessage: errors.array()[0].msg,
      product: {
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        _id: req.body.id,
      },
      hasError: true,
      validationErros: errors.array(),
    });
  }
  Product.findById(req.body.id)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = title;
      product.description = description;
      product.price = price;
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }
      return product.save().then((result) => {
        console.log("Updated product!");
        res.redirect("/admin/products");
      });
    })

    .catch((err) => {
      const myError = new Error(err);
      myError.httpStatusCode = 500;
      return next(myError);
    });
};
exports.postDeleteProdut = (req, res, next) => {  
  const prodId = req.body.id;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return next(new Error('Product not found.'));
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

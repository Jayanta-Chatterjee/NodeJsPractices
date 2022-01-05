const Product = require("../models/product");

exports.GetAddProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir,'views','add-product'));
  res.render("admin/edit-product", {
    docTitle: "Add new Products",
    path: "admin/add-product",
    editing: false,
  });
};
exports.GetEditProducts = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // req.user.getProducts(({where:{id:prodId} }))
  Product.getProduct(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        docTitle: "Edit Products",
        path: "admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prod = new Product(title, price, description, imageUrl,null,req.user._id);
  prod
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "My Shop",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  let product = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl,
   req.body.id,
   req.user._id
  );
  return product
    .save()
    .then((result) => {
      console.log("Updated product!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
exports.postDeleteProdut = (req, res, next) => {
  const productId = req.body.id;
  Product.deleteById(productId)  
  .then(()=>{
    console.log('Deleted Successfully!');
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
};

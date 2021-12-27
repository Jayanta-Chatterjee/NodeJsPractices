const fs = require("fs");
const path = require("path");

const dirName = require("../util/path");
const Cart = require("./cart");

const p = path.join(dirName, "data", "products.json");
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log(err);
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updateProduct = [...products];
        updateProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const prod = products.find((p) => p.id === id);
      cb(prod);
    });
  }
  static deleteById(id) {
    getProductsFromFile((products) => {
      const product=products.find(prod=>prod.id===id);
      const afterDeleteProds = products.filter(p => p.id !== id);      
      fs.writeFile(p, JSON.stringify(afterDeleteProds), (err) => {
        if (!err) {
          Cart.deleteCart(id,product.price);
        }
      });
    });
  }
};

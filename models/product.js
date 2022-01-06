// const mongoDb = require("mongodb");
// const getDb = require("../util/database").getDb;
const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});
module.exports=mongoose.model('Product',productSchema);

// class Product {
//   constructor(title, price, description, imageUrl, id,userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id =id? new mongoDb.ObjectId(id):null;
//     this.userId=userId;
//   }
//   save() {
//     const db = getDb();
//     let dbOps;
//     if (this._id) {
//       dbOps = db
//         .collection("products")
//         .updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this });
//     } else {
//       dbOps = db.collection("products").insertOne(this);
//     }
//     return dbOps
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static getProduct(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongoDb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         console.log("Product: ", product);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static deleteById(prodId) {
//     const db = getDb();
//    return db.collection("products")
//       .deleteOne({ _id: new mongoDb.ObjectId(prodId) })
//       .then((result) => {
//         console.log("Deleted Successfully!");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;

const mongoDb = require("mongodb");
const MongodbClient = mongoDb.MongoClient;

let _db;
const mongoConnect = (afterConnect) => {
  MongodbClient.connect(
    "mongodb+srv://mongoUser:logMongo@cluster0.l8kdn.mongodb.net/node_complete?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      afterConnect();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
const getDb=()=>{
  if (_db) {
    return _db;
  }
  throw 'No Database found!';
}
exports.mongoConnect=mongoConnect;
exports.getDb=getDb;

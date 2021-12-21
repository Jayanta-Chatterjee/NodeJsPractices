const fs=require('fs');
const path=require('path');

const dirName=require('../util/path');

const p=path.join(dirName,'data','products.json');
const getProductsFromFile=cb=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            console.log(err);
           return cb([]);
        }
        console.log('fetchAll: ',JSON.parse(fileContent));
        cb(JSON.parse(fileContent));
    }); 
  }
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  
  save() {      
    getProductsFromFile(products=>{        
        products.push(this);
        console.log('Write: ',products);
        fs.writeFile(p,JSON.stringify(products),err=>{
            console.log(err);
        });
    });
  }
  static fetchAll(cb) {
      getProductsFromFile(cb);
  }
};

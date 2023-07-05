const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const p = path.join(rootDir, "Data", "products.json");

const getAllProducts = (cb) => {
  let product = [];
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      product = JSON.parse(fileContent);
      cb(product);
    } else {
      cb(product);
    }
  });
};
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    getAllProducts((product) => {
      product.push(this);
      fs.writeFile(p, JSON.stringify(product), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getAllProducts(cb);
  }
};

const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static delete(productid) {
    return db.execute('DELETE FROM products WHERE products.id = ?',[productid])
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static getProduct(id) {
    return db.execute("SELECT * FROM products WHERE products.id= ?",[id])
  }
};

const Product = require("../Models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({ title, price, imageUrl, description })
    .then(() => {
      res.redirect("/admin/products")
      console.log("Product created");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  if (!editMode || editMode === "false") {
    return res.redirect("/");
  }
  req.user.getProducts({where:{id:prodId}})
  // Product.findByPk(prodId)
    .then((products) => {
      const product = products[0]
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEdit = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findByPk(id)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(() => {
      res.redirect("/admin/products");
      console.log("UPDATED ITEM");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  // Product.findAll()
    .then((product) => {
      res.render("admin/products", {
        prods: product,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      product.destroy();
    })
    .then(() => {
      console.log("PRODUCT DELETED")
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

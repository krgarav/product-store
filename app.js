const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./Models/product");
const User = require("./Models/user");
const Cart = require("./Models/cart");
const CartItem = require("./Models/cart-items");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
})
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Kumar", email: "krgarav@gmail.com" })
    }
    return user;
  }).then((user) => {
    Cart.findByPk(1).then((cart) => {
      if (!cart) {
        return user.createCart();
      }
      return cart
    })

  }).then((cart) => {
    app.listen(3000, () => { console.log("Server is running on port 3000") })
  })
  .catch((err) => {
    console.log(err);
  });

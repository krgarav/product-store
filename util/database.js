const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_complete", "root", "123456789", {
  dialect: "mysql",
  host: "localhost",
});

module.exports=sequelize;
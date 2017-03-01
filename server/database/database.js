var Sequelize = require('sequelize');

var sequelize = new Sequelize(
  'homeAccounts',
  'root',
  '',
  {
    dialect: "mysql",
    port:    3306
  }
);


module.exports = sequelize ; 
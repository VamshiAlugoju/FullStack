const Sequeilze = require("sequelize");
const sequelize = new Sequeilze("expenseF","root","12345",{
    host:"localhost",
    dialect:"mysql"
});

module.exports = sequelize;
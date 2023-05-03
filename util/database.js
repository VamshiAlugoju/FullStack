require("dotenv").config();

const Sequeilze = require("sequelize");
const sequelize = new Sequeilze(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    dialect:"mysql"
});

module.exports = sequelize;
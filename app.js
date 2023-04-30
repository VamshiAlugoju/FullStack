const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const Sequelize = require("sequelize")
const sequelize = require("./util/database")

const User = require("./models/user");
const Expenses = require("./models/expense");
const Orders = require("./models/order");
const LeaderBoard = require("./models/leaderBoard");

const userauthentication = require("./middleware/Authenticate");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const premimuRoutes = require("./routes/purchase");

app.use(bodyparser.json({extended :false}))
app.use(cors());
 
User.hasMany(Expenses);
Expenses.belongsTo(User);
User.hasMany(Orders);
Orders.belongsTo(User);


app.use("/users",userRoutes)
app.use("/Expenses",userauthentication.Authenticate,expenseRoutes)
app.use("/purchase",premimuRoutes);


sequelize.sync()
.then(result=>{
    app.listen(3000,()=>{
        console.log("listening");
    })
})
.catch(err=>console.log(err));


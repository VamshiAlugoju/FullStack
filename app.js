const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const Sequelize = require("sequelize")
const sequelize = require("./util/database")
// const { urlencoded } = require("body-parser");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

app.use(bodyparser.json({extended :false}))
app.use(cors());
 

app.use("/users",userRoutes)
app.use("/Expenses",expenseRoutes)

sequelize.sync()
.then(result=>{
    app.listen(3000,()=>{
        console.log("listening");
    })
})
.catch(err=>console.log(err));

 
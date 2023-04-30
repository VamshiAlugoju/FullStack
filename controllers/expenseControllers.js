const Expense =  require("../models/expense");
const LeaderBoard = require("../models/leaderBoard");
const sequelize = require("../util/database");

exports.getExpenses = async(req,res,next)=>{

    const Id = req.user.id;
    
    try{
      let data = await Expense.findAll({where:{userid:Id}});
      res.send(data);
    }
    catch(err)
    {
      res.send("no Items found add some");
    }
 
}   

exports.postExpense = async(req,res,next)=>{
     
    const t = await sequelize.transaction();
    const {amount,description,category} = req.body;

    if(isinvalidString(amount) || isinvalidString(description) || isinvalidString(category))
    {
        return res.status(500).json({message:"please enter fields"});
    }
    let userId = req.user.id;
    try{
      let result = await   Expense.create({amount,description,category,userId},{transaction:t});
      let TAmount = parseInt(req.user.TotalAmount)+parseInt(amount);
      await req.user.update({TotalAmount:TAmount},{transaction:t}) 
       await t.commit();
        res.json(result);
    }
    catch(err){
       await t.rollback();
        console.log(err)
       res.status(500).send({message:"cannot add items"});
    }
   
}

exports.deleteExpense = async(req,res,next)=>{
    
    const t = await sequelize.transaction()
    const Id = req.params.Id
    let userId = req.user.id;
    try{
        let data = await Expense.findOne({where:{id:Id}})

        deleteAmount =  parseInt(req.user.TotalAmount) - parseInt(data.amount);
        await req.user.update({TotalAmount:deleteAmount},{transaction:t});
        
        await Expense.destroy({where:{id:Id},transaction:t})
       await t.commit();
        res.send("deleted");
    }
    catch(err){
        await t.rollback();
        console.log(err)
        res.status(500).send("cannot delete item");
    }
 
}



function isinvalidString(string)
{
    if(!string  || string.length === 0)
    {
        return true;
    }
    return false;
}
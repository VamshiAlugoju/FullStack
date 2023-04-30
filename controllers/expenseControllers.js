const Expense =  require("../models/expense");
const LeaderBoard = require("../models/leaderBoard");

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
   
    const {amount,description,category} = req.body;

    if(isinvalidString(amount) || isinvalidString(description) || isinvalidString(category))
    {
        return res.status(500).json({message:"please enter fields"});
    }
    let userId = req.user.id;
    try{
      let result = await   Expense.create({amount,description,category,userId});
       
      let LeaderBoarddata = await LeaderBoard.findOne({where:{userId:req.user.id}})
      if(LeaderBoarddata)
      {
         let Amount = parseInt(LeaderBoarddata.TotalAmount )+ parseInt(amount);
         console.log(Amount)
         await LeaderBoard.update({TotalAmount:Amount},{where:{userId}});
      }
      else{
               await  LeaderBoard.create({TotalAmount:amount,Name:req.user.name,userId:req.user.id})
      }
        res.json(result);
    }
    catch(err){
        console.log(err)
       res.status(500).send({message:"cannot add items"});
    }
   
}

exports.deleteExpense = async(req,res,next)=>{

    const Id = req.params.Id
    let userId = req.user.id;
    try{
        let data = await Expense.findOne({where:{id:Id}})
        let LeaderBoarddata = await LeaderBoard.findOne({where:{userId:req.user.id}})

        deleteAmount =  parseInt(LeaderBoarddata.TotalAmount) - parseInt(data.amount);

        await  LeaderBoard.update({TotalAmount:deleteAmount},{where:{userId}})
        await Expense.destroy({where:{id:Id,userId}});
        res.send("deleted");
    }
    catch(err){
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
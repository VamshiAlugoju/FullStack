const Expense =  require("../models/expense");


exports.getExpenses = async(req,res,next)=>{

    const Id = req.user.id;
   console.log(req.user.id)
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
    // let userId = req.user.id
    let userId = req.user.id;
    try{
      let result = await   Expense.create({amount,description,category,userId});
        res.json(result);
    }
    catch(err){
       res.status(500).send({message:"cannot add items"});
    }
   
}

exports.deleteExpense = async(req,res,next)=>{

    const Id = req.params.Id
    let userId = req.user.id;
    try{
        await Expense.destroy({where:{id:Id,userId}});
        res.send("deleted");
    }
    catch(err){
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
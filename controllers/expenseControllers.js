const Expense =  require("../models/expense");


exports.getExpenses = (req,res,next)=>{

    Expense.findAll()
    .then(data=>{
        
        res.send(data);
    })
    .catch(err=>console.log(err));
}

exports.postExpense = (req,res,next)=>{
   
    const {amount,description,category} = req.body;
    
    Expense.create({amount,description,category})
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(err=>console.log(err));
}

exports.deleteExpense = (req,res,next)=>{

    const Id = req.params.Id
    
    Expense.destroy({where:{id:Id}})
    .then(result=>{
        console.log(result)
        res.send("deleted");
    })
    .catch(err=>console.log(err));
}
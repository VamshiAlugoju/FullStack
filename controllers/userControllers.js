const { emit } = require("nodemon");
const User = require("../models/user");

exports.postUser = async (req,res,next)=>{
     
    const {name , email,password} = req.body;
    try{
        if(isinvalidString(name) || isinvalidString(email) || isinvalidString(password))
        {
          return res.status(400).send("please fill the fields");
        }
    
        const result = await User.create({
            name,email,password
        })   
        
        res.send("ok");
    }
   catch{
       res.status(500).send({ message : "user already exist with Email"});
   }
     
} 

exports.loginUser = async(req,res,next)=>{

   const {email,password} = req.body;
   
   if(isinvalidString(email) || isinvalidString(password))
   {
    return res.status(400).send("please fill the fields");
   }
   
   try{
 
      let user =  await User.findOne({where:{email:email}});

     if(user.password === password)
      res.send({message:"logged in successfully"});
     else{
        res.status(500).send({message:"password is not matching"});
     }

   }
   catch(err){
    res.status(400).send({message:"email is not found"});
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
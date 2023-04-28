const User = require("../models/user");

exports.postUser =  (req,res,next)=>{
     
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    .then(result=>{
        console.log(result);
        res.send("ok")
    })
     .catch(err=>{
          res.status(409).send("user already exist with Email");
         console.log(err);
     })

} 
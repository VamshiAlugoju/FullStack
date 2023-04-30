
const Sib = require("sib-api-v3-sdk");

const client = Sib.ApiClient.instance

exports.forgotPassword = (req,res)=>{
    
    // console.log(req.body.email)
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = "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"
    
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    
    const sender = {
        email:"vamshialugoju024@gmail.com"
    }
    
    const reciever = [
        {
            email:req.body.email
        }
    ]
    
    tranEmailApi.sendTransacEmail({
        sender,
        to:reciever,
        subject:"hello",
        textContent:"thisflsfojsopfso"
    })
    .then(response=>{
        res.send("ok")
        console.log(response)
    })
    .catch(err=>console.log(err));
 
}
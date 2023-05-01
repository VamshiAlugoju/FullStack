
function ForgotPassword(e)
{
    e.preventDefault();
    let payload = {
        email:e.target.Email.value
    }

    axios.post("http://localhost:3000/password/forgotpassword",payload)
    .then(res=>{
        console.log(res);
    })
    .catch(err=>console.log(err));
}
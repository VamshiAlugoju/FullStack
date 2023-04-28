
function validate(e)
{
    e.preventDefault();
    let vals = e.target;
    let payLoad = {
        name :vals.Name.value,
        email: vals.Email.value,
        password: vals.Password.value
    }
      
  axios.post("wwww.localhost:3000/users/Signup",payLoad)
  .then(res=>{
    console.log(res);
  })
  .catch(err=>{
    console.log(err);
  })
}
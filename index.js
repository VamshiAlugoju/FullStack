
function signUp(e)
{
    e.preventDefault();
    let vals = e.target;
    let payLoad = {
        name :vals.Name.value,
        email: vals.Email.value,
        password: vals.Password.value
    }
    //   console.log(payLoad)
  axios.post("http://localhost:3000/users/Signup",payLoad)
  .then(res=>{
    console.log(res);
    window.location.pathname("./login.html")
  })
  .catch(err=>{
    alert(err.response.data.message);
    // console.log(err.response.data)
  })
}

async function login(e)
{
    e.preventDefault();
    let vals = e.target;
    let payLoad = {
        email: vals.Email.value,
        password: vals.Password.value
    };

    try{
      
       let result = await axios.post("http://localhost:3000/users/Login",payLoad);
        // alert(result.response )
        alert(result.data.message)
    }
    catch(err){
        // alert(err.response)
         alert(err.response.data.message)
    }
}
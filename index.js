
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
    window.location.assign("./login.html")
  })
  .catch(err=>{
    alert(err);
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
       console.log(result.data.token)
       localStorage.setItem("token",result.data.token)
        window.location.assign("./expense/expense.html")
        // alert(result.data.message)
    }
    catch(err){
        // alert(err.response)
         alert(err.response.data.message)
        console.log(err)
    }
}
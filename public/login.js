



document.getElementById("submitBtn").addEventListener("click",async (e)=>{

  e.preventDefault();

let email = document.getElementById("Email").value;
let password = document.getElementById("Password").value

let payLoad = {
    email,
    password
};

try{
  
   let result = await axios.post("http://16.16.74.189:3000/users/Login",payLoad);
   console.log(result.data.token)
   localStorage.setItem("token",result.data.token)
    window.location.assign("./expense/expense.html")
    alert(result.data.message)
}
catch(err){
    // alert(err.response)
     alert(err.response.data.message)
    console.log(err)
}

})
 
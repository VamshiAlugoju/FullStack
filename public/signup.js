document.getElementById("submitBtnsignUp").addEventListener("click",(e)=>{

    e.preventDefault();
     let name = document.getElementById("Name").value;
     let email = document.getElementById("Email").value;
     let password = document.getElementById("Password").value;
    let payLoad = {
        name ,
        email,
        password
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
  })
  
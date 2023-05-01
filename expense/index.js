
let ul_items = document.querySelector("#list-items")
let description = document.querySelector("#description")
let amount = document.querySelector("#expense_amount")
let options = document.querySelector("#options");

let submit_btn = document.querySelector("#submit-btn")
submit_btn.addEventListener("click" , addItems);


window.addEventListener("load",LoadItems);
let token = localStorage.getItem("token");

async function LoadItems()
{   
    console.log(token);
    //request to be sent
    try{
        let res =await axios.get("http://localhost:3000/Expenses",{headers:{Authorization:token}})
           res.data.forEach(item=>{
            addTodom(item);
           })
        let response = await axios.get("http://localhost:3000/users/ispremium",{headers:{Authorization:token}});

        if(!response.data.premium)
        { 
            document.getElementById("PremiumBtn").style.display = "inline" 
        }
        else{
            document.getElementById("premium_user_text").style.display = "block" 
        }
    }
    catch(err){
        console.log(err)
    }
 
}


async function addItems(e)
{  
    e.preventDefault();
     
    const Expense = {
        amount : amount.value,
        description:description.value,
        category:options.options[options.value].innerText
    }

    try{
        let res = await axios.post("http://localhost:3000/Expenses",Expense,{headers:{Authorization:token}});
        addTodom(res.data);
    }
    catch(err){
        console.log(err)
        alert(err.response.data.message)
    }
}

function addTodom(item)
{
   
    let newli =   document.createElement("li");
    let deletebtn = document.createElement("button");
    // let editbtn = document.createElement("button");
  
    deletebtn.classList = "btn btn-danger btn-sm";
    // editbtn.classList = "btn btn-primary btn-sm";
    newli.classList = " list-item list-group-item"
    
    newli.id = item.id;
    deletebtn.id = "deletebtn"
    // editbtn.id = "editbtn"
    deletebtn.addEventListener("click" , delete_item)
    // editbtn.addEventListener("click" , edit_item)
  
  
    deletebtn.innerText = "delete"
    newli.innerText =  item.amount + "-" + item.description+"-"+item.category+" "
    
    newli.appendChild(deletebtn);
    // newli.appendChild(editbtn)
    ul_items.appendChild(newli)
}

async function delete_item(e)
{
    let li = e.target.parentElement
    let id = li.getAttribute("id");
     
    try{
      await axios.delete(`http://localhost:3000/Expenses/${id}`,{headers:{Authorization:token}})
      ul_items.removeChild(li)
    }
    catch(err){
        console.log(err)
    }
}

function edit_item(e)
{   

    let li = e.target.parentElement;
    let id = li.getAttribute("id");
    let words = li.innerText.split("-");
    amount.value = words[0];
    description.value = words[1];
    console.log(words)
    axios.delete(`http://localhost:3000/${id}`)
    .then(res=>{
        ul_items.removeChild(li)
    })
    .catch(err=>console.log(err));
}


async  function premiumbtn(e)
{   

    let response = await axios.get("http://localhost:3000/purchase/premiumMembership",{headers:{Authorization:token}});
    console.log(response)
    console.log(response)
    let options = {
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function (response){
            await axios.post("http://localhost:3000/purchase/premiumMembership/UpdateTransaction",{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id
            },{headers:{Authorization:token}})
            
            document.getElementById("PremiumBtn").style.display = "none"
            document.getElementById("premium_user_text").style.display = "block" 
            // alert("you are now a premium user");
        }
    }

    const rzpl = new Razorpay(options);
    rzpl.open();
    e.preventDefault();

    rzpl.on("payment.failed",async (response)=>{
        // console.log("jsd;fjso;f;ofjw;iofwoifjwoifh;eoif");

        await axios.post("http://localhost:3000/purchase/premiumMembership/StatusFail",{
            order_id:options.order_id
        },{headers:{Authorization:token}})

        alert("payment failed");
    })
}

function addToLeaderBoard(item){
 let ul = document.getElementById("LeaderBoard-items");
 let newli =   document.createElement("li");
 newli.innerText = "Name : "+item.name+" "+"TotalAmount : "+ item.TotalAmount+" ";
 ul.appendChild(newli);

}

async function showLeaderBoard(e)
{
   let data = await axios.get("http://localhost:3000/purchase/premiumMembership/LeaderBoard",
   {headers:{Authorization:token}}
   );
    data.data.forEach(item=>{
        addToLeaderBoard(item);
    })
   
}
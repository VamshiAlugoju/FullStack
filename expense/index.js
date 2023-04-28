
let ul_items = document.querySelector("#list-items")
let description = document.querySelector("#description")
let amount = document.querySelector("#expense_amount")
let options = document.querySelector("#options");

let submit_btn = document.querySelector("#submit-btn")
submit_btn.addEventListener("click" , addItems);


window.addEventListener("load",LoadItems);

function LoadItems()
{
    //request to be sent
    axios.get("http://localhost:3000/Expenses")
    .then(res=>{
        // console.log(res.data)
       res.data.forEach(item=>{
        addTodom(item);
       })
    })
    .catch(err=>console.log(err));
}


 function addItems(e)
{  
    e.preventDefault();
     
    const Expense = {
        amount : amount.value,
        description:description.value,
        category:options.options[options.value].innerText
    }
    axios.post("http://localhost:3000/Expenses",Expense)
    .then(res=>{
         console.log(res);
         addTodom(res.data);
    })
    .catch(err=>console.log(err));
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

function delete_item(e)
{
    let li = e.target.parentElement
    let id = li.getAttribute("id");
     
    axios.delete(`http://localhost:3000/Expenses/${id}`)
    .then(res=>{
        ul_items.removeChild(li)
    })
    .catch(err=>console.log(err));
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

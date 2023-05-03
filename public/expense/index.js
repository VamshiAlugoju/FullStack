
let tb = document.getElementById("table_body")
let description = document.querySelector("#description")
let amount = document.querySelector("#expense_amount")
let options = document.querySelector("#options");

let submit_btn = document.querySelector("#submit-btn")
submit_btn.addEventListener("click" , addItems);



window.addEventListener("load",LoadItems);
let token = localStorage.getItem("token");

async function LoadItems()
{   
   
    localStorage.setItem("page",1)
    limit = localStorage.getItem("limit") || 2;
    try{
        let res =await axios.get(`http://localhost:3000/Expenses/?page=${1}&limit=${limit}`,{headers:{Authorization:token}})
         
           res.data.data.forEach(item=>{
            addTodom(item);
           })
           showpagination(res.data.Pagination);
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
   let tr = document.createElement("tr");
   let td1 = document.createElement("td");
   let td2 = document.createElement("td");
   let td3 = document.createElement("td");
   let td4 = document.createElement("td");
   let deletebtn = document.createElement("button");
   deletebtn.classList = "btn btn-danger btn-sm";
   deletebtn.id = "deletebtn"
   deletebtn.addEventListener("click" , delete_item)
   deletebtn.innerText = "Delete"
   td4.appendChild(deletebtn);

   td1.innerText = item.amount
   td2.innerText = item.description
   td3.innerText = item.category
   tr.appendChild(td1)
   tr.appendChild(td2)
   tr.appendChild(td3)
   tr.appendChild(td4)
   tr.id = item.id
   tb.appendChild(tr);
}

async function delete_item(e)
{
    let tr = e.target.parentElement.parentElement
    let id = tr.getAttribute("id");
     
    try{
      await axios.delete(`http://localhost:3000/Expenses/${id}`,{headers:{Authorization:token}})
      tb.removeChild(tr)
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
    let tb = document.getElementById("Leader_board_table")
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");

   td1.innerText = item.name
   td2.innerText = item.TotalAmount
   tr.appendChild(td1);
   tr.appendChild(td2);
   tb.appendChild(tr);

}

async function showLeaderBoard(e)
{
   let data = await axios.get("http://localhost:3000/purchase/premiumMembership/LeaderBoard",
   {headers:{Authorization:token}}
   );
   let tb = document.getElementById("Leader_board_table")
    tb.innerHTML = ""
    data.data.forEach(item=>{
        console.log(item)
        addToLeaderBoard(item);
    })
   
}

 function downloadReport(e)
 {
   axios.get("http://localhost:3000/Expenses/downloadReport",{headers:{Authorization:token}})
   .then(res=>{
       let file = res.data.fileURL
       let a = document.createElement("a");
       a.href = file;
    //    a.download = "myexpense.csv";
       a.click();
   })
   .catch(err=>console.log(err));
 }

 function showReports(e)
 {
 }

 function showpagination(pageData)
 {  
    const {currentPage,nextPage,hasnextPage,hasPreviousPage,previusPage} = pageData;
    console.log(pageData);

    let Pg = document.getElementById("Pagination")
    let li = document.createElement("li");
    li.classList = "page-item"

    if(pageData.haspreviousPage)
    {  
        let btn = document.createElement("button");
        btn.classList = "btn btn-sm btn-dark";
        btn.innerText= pageData.previousPage;
        btn.addEventListener("click",()=>{
            localStorage.setItem("page",pageData.previousPage)
            getProducts()
        })
        li.appendChild(btn)
        Pg.appendChild(li);
    }
        let btn = document.createElement("button");
        btn.classList = "btn btn-sm btn-dark";
        btn.innerText = currentPage;
        btn.classList = "btn mx-1 btn-md btn-dark"
        btn.addEventListener("click",()=>{
            localStorage.setItem("page",currentPage)
            getProducts()
        })
        li.appendChild(btn)
        Pg.appendChild(li);

    if(hasnextPage)
    {   let btn = document.createElement("button");
        btn.classList = "btn btn-sm btn-dark";
        btn.classList = "btn btn-sm btn-dark"
        btn.innerText= nextPage;
        btn.addEventListener("click",()=>{
            localStorage.setItem("page",nextPage)
            getProducts()
        })
        li.appendChild(btn)
        Pg.appendChild(li);
    }
   
 }
 
 function getProducts(){
    
    let page = localStorage.getItem("page");
    let limit = localStorage.getItem("limit")
    axios.get(`http://localhost:3000/Expenses/?page=${page}&limit=${limit}`,{headers:{Authorization:token}})
    .then(res=>{
        tb.innerHTML = ""
        console.log(res)
         res.data.data.forEach(item=>{
             addTodom(item)
         })
         let Pg = document.getElementById("Pagination")
          Pg.innerHTML = ""
        showpagination(res.data.Pagination)
    })
    .catch(err=>{
        console.log(err);
    })

 }

 function changeLimit(e)
 {
   let limit = parseInt( e.target.innerHTML);
   localStorage.setItem("limit",limit);
   getProducts()
 }
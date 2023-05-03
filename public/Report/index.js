document.getElementById("add").addEventListener("click",()=>{
  
  let tb = document.getElementById("table_body")
   let tr = document.createElement("tr");
   let td1 = document.createElement("td");
   let td2 = document.createElement("td");
   let td3 = document.createElement("td");
   td1.innerText = "hellp"
   td2.innerText = "hellp"
   td3.innerText = "hellp"
   tr.appendChild(td1)
   tr.appendChild(td2)
   tr.appendChild(td3)
   tb.appendChild(tr);
    
})

function deletebtn(e){
    console.log(e)
}

let a = document.querySelectorAll("#deletebtn");
  a.forEach(ele=>{
    ele.addEventListener("click", deleteItem)
  })

 function deleteItem(e)
 { 
   let tbody = document.getElementById("table_body");
   let row  = e.target.parentElement.parentElement
   tbody.removeChild(row)
   
 }
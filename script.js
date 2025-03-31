import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js"

import { getDatabase,
ref,
push,
onValue,
remove } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://link-tracker-d57e0-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const alertBtn = document.getElementById("alertbtn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("del-btn")



//for rendering links
function render(leads){
    let listItems = ""
    for (let i=0; i< leads.length; i++) {
       listItems += `
       <li>
           <a target='_blank' href='${leads[i]}'>
               ${leads[i]}
            </a>
        </li>
     `
    }
    ulEl.innerHTML= listItems
}

//fetching leads from firebase
onValue(referenceInDB, function(snapshot){
    const snapshotexists = snapshot.exists()
    if (snapshotexists) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

//for delete button
deleteBtn.addEventListener("dblclick",function(){
    remove(referenceInDB)
    ulEl.innerHTML = ""
})


// for save input button
inputbtn.addEventListener("click", function() {
    alertBtn.textContent = ""
    const inputValue = inputEl.value
    const netInput = inputValue.split(" ").join("")
    if (netInput==="") {
        alertBtn.textContent = "Please Input Your Link!"
        inputEl.value=""
    }else {
        push(referenceInDB, netInput)
        inputEl.value=""
        }
})



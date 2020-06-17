
//Declare all the clickable element
let clear = document.getElementById('refresh');
let addItem = document.getElementById('add-to-list');
let text = document.querySelector(".text");
let date = document.getElementById('date');
let list = document.getElementById('list');
let inputField = document.getElementById('input');


//Show todays date
const options = { weekday: 'long', month: 'long', day: 'numeric',hours:'numeric', minutes: 'numeric' };
const today = new Date();
date.innerHTML = today.toLocaleDateString('en-US', options);

let JOB_LIST, id;

//Path for check and uncheck images
const CHECK = "images/success.svg";
const UNCHECK = "images/circle.svg";

//retrive item from localstorage
function retriveData(){
    let data = localStorage.getItem('TODO_LIST');
    if(data){
        JOB_LIST = JSON.parse(data);
        id  = JOB_LIST.length;
        loadList(JOB_LIST);
    }else{
        JOB_LIST = [];
        id = 0;
    }
}

//Add each item from local storage to interface
function loadList(list){
    list.forEach(element => {
        addToDo(element.name, element.id, element.done, element.trash);
    });
}


retriveData();
// Add item when user press "Enter" or "Return"
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = inputField.value;
       if(toDo){
           addToDo(toDo, id, false, false);
           JOB_LIST.push({
             name : toDo,
             id : id,
             done : false,
             trash : false
        });
        localStorage.setItem('TODO_LIST',JSON.stringify(JOB_LIST));
        id++;
       }
       //Clear the field once entered
       inputField.value ="";
    }
})

// Add item when user clicks +
addItem.addEventListener("click", function(event){
    const toDo = inputField.value;
    if(toDo){
        addToDo(toDo, id, false, false);
        JOB_LIST.push({
             name : toDo,
             id : id,
             done : false,
             trash : false
        });
        localStorage.setItem('TODO_LIST',JSON.stringify(JOB_LIST));
        id++;
    }
    //Clearfield after added
    inputField.value ="";
});


//Add to-do-function
function addToDo(toDo, id, done, trash){
    if(trash){
        return;
    }
    console.log(done);
    let DONE = done ? CHECK : UNCHECK;
    const item = `<li class="item">
                        <img src="${DONE}" job="complete" id="${id}">
                        <p class="text">${toDo}</p>
                        <img src="images/bin.svg" job="delete" id="${id}">
                        </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}


// complete to do
function completeToDo(element){
    if(element.src.includes(CHECK)){
        element.src = UNCHECK;
    }else{
        element.src = CHECK;
    }
    JOB_LIST[element.id].done = JOB_LIST[element.id].done ? false : true;
}

//Remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    JOB_LIST[element.id].trash = true;
}


list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem('TODO_LIST', JSON.stringify(JOB_LIST));
});


//To clear list
clear.addEventListener('click',function(e){
    var child = list.lastElementChild;  
    while (child) { 
        list.removeChild(child); 
        child = list.lastElementChild; 
    } 
    localStorage.clear();
})
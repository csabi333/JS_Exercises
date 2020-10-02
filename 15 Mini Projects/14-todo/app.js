// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
// edit option
let editElement;
let editFlag = false;
let editID="";
// ****** EVENT LISTENERS **********
form.addEventListener('submit',addItem);
clearBtn.addEventListener('click',clearItems);
window.addEventListener("DOMContentLoaded",setupItems);


// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    //grocery.value
    const value = grocery.value;
    const id = new Date().getTime().toString(); //get a unique id this way locally
    if(value && !editFlag){
        console.log('add item to the lsit')
        createListItem(id,value);

        displayAlert('Item added to the list', 'success');
        //show container
        container.classList.add('show-container');
        addToLocalStorage(id,value);
        setbackToDefault();
    }else if(value && editFlag){
        //console.log('editing')
        editElement.innerHTML=value;
        displayAlert('Value changed','success');
        //editlocal storage
        editLocalStorage(editID,value);
        setbackToDefault();
    }else{
        displayAlert('Please enter Value','danger')
    }
}
//display alert
function displayAlert(text,action){
    alert.textContent =text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function(){
        alert.textContent='';
        alert.classList.remove(`alert-${action}`)
    },1000)
}



function setbackToDefault(){
    //console.log('set back to default');
    grocery.value="";
    editFlag=false;
    editID="";
    submitBtn.textContent='submit';
}

function clearItems(){
    const items = document.querySelectorAll('.grocery-item');

    if (items.length >0){
        items.forEach(item => {
            list.removeChild(item);
        });
    }

    container.classList.remove('show-container');
    displayAlert('List emptied','danger');
    localStorage.removeItem('list');
    setbackToDefault();
    
}

function deleteItem(e){
    //console.log('item deleted');
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);

    if(list.children.length===0){
        container.classList.remove('show-container');
    }

    displayAlert('Item removed','danger');
    removeFromLocalStorage(id);
    setbackToDefault();
}

function editItem(e){
    //console.log('item edited');
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';
}


// ****** LOCAL STORAGE **********
function removeFromLocalStorage(id){
    let items = getLocalStorage();
    console.log('pressed remove on', id);
    items = items.filter(function(item){
        if (item.id !==id){
            return item;
        }
    })

    localStorage.setItem('list',JSON.stringify(items));
}

function editLocalStorage(id,value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id ===id){
            item.value=value;
        }
        return item;
    })
    localStorage.setItem('list',JSON.stringify(items));
}

function addToLocalStorage(id,value){
    //console.log('added to local storage')
    const grocery = {id:id,value:value};  //es6 : {id,value}
    //console.log(grocery);
    let items = getLocalStorage(); //undefined at start so you need i to set to empty if so
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));

}

function getLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}
// ****** SETUP ITEMS **********

function setupItems(){
    let items = getLocalStorage();
    if(items.length>0){
        items.forEach(function(item){
            createListItem(item.id,item.value);
        })
        container.classList.add('show-container');
    }
    
}

function createListItem(id,value){
    const element = document.createElement('article');
        //add class
        element.classList.add('grocery-item');
        //add id
        const attr = document.createAttribute('data-id');
        attr.value=id;
        element.setAttributeNode(attr);
        element.innerHTML=`<p class='title'>${value}</p>
        <div class="btn-container">
          <button type='button' class='edit-btn'>
            <i class="fas fa-edit"></i>
          </button>
          <button  type='button' class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;

        const  deleteBtn = element.querySelector('.delete-btn');
        const  editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);
        //appendchild
        list.appendChild(element);
}
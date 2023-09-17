import {initializeApp} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js" 
;
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js" 
;

const appsettings =
{
    databaseURL : "https://cart-4d12f-default-rtdb.firebaseio.com/",
    

}
const app= initializeApp(appsettings); 
const database = getDatabase(app);
const shoppingList = ref(database,'shopList');
const inputField =document.getElementById("input-field"); 
const ButtonEl = document.getElementById('add-button');
const List=document.getElementById('list')
const ItemsinDb=ref(database,"items")
const array= []
ButtonEl.addEventListener("click",function () { 
    if(inputField.value!='') 
    {
    let inputval=inputField.value 
    push(shoppingList,inputval)
    inputField.value='';
    }
}) 
onValue(shoppingList,function(snapshot) 
{   
    if(snapshot.exists()) 
    {
    clearItems();  
    let list=Object.entries(snapshot.val());
    for(let i=0;i<list.length;i++) 
    {
        addNewItemToList(list[i]);
    } 
    } 
    else 
    List.innerHTML="No items to show"
} )
function addNewItemToList(entry) 
{
    let id=entry[0],value=entry[1]; 
    let x=document.createElement('li') 
    x.textContent=value
    x.id=id  
    x.addEventListener("click",function() {
        let location=ref(database,`shopList/${entry[0]}`) 
        remove(location)
    })
    List.append(x) 

}
function clearItems() 
{
    List.innerHTML='';
}
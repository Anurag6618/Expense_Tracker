let form=document.getElementById('mod');
let ItemList=document.getElementById('items');


//Event for adding element
form.addEventListener('submit',NewItem);

//Add element
function NewItem(e){
    e.preventDefault();
    let Amount=e.target.Amt.value
    let Description=e.target.Desc.value
    let Category=e.target.Cat.value
    

    //Storing in local storage
    const obj={
        Amount,Description,Category
    }
    localStorage.setItem(obj.Amount,JSON.stringify(obj))
    Displayusers(obj)

}

//After refreshing the details shouldn get loaded
window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys  = Object.keys(localStorageObj)

    for(var i =0; i< localstoragekeys.length; i++){
        const key = localstoragekeys[i]
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        Displayusers(userDetailsObj)
    }
})

function Displayusers(user){
    let parentnode=document.getElementById('Userlist');
    let child_node=`<li id=${user.Amount}> ${user.Amount}--${user.Description}--${user.Category}
                    <button onclick=DeleteExpense('${user.Amount}')>Delete Expense</button>
                    <button onclick=EditExpense('${user.Amount}','${user.Description}','${user.Category}')>Edit Expense </button>
                </li>`
    parentnode.innerHTML=parentnode.innerHTML+child_node;
}

function EditExpense(Amount,Description,Category){
    document.getElementById('Amt').value=Amount;
    document.getElementById('Desc').value=Description;
    document.getElementById('Cat').value=Category;
    DeleteExpense(Amount);
}

function DeleteExpense(UserAmount){
    
    localStorage.removeItem(UserAmount);
    DeletefromScreen(UserAmount)
}

function DeletefromScreen(UserAmount){
    const parentnode_n=document.getElementById('Userlist');
    const childnode_n=document.getElementById(UserAmount);
    parentnode_n.removeChild(childnode_n)
}
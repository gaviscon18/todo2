const addBtn = document.getElementById("addButton");
const todoInput = document.getElementById("todoBox");
let todoArray = [];
const listArr = document.getElementById("listArray");
const delBtn = document.getElementById("deleteAllBtn");


addBtn.addEventListener("click", addTodo);
delBtn.addEventListener("click", delTodos);
addEventListener("DOMContentLoaded", storageToUI);

function addTodo(e) {

    if (todoInput.value == "") {
        alert("Lütfen boş değer girmeyiniz!")
    } else {
        const newTodo = {
            todo: todoInput.value,
            done: false
        };
        todoArray.push(newTodo);
        addTodoToUI(todoArray);
        addTodoToStorage(todoArray);
    }

    e.preventDefault()

}

function addTodoToUI(todoArray) {
    listArr.innerHTML = "";

    for (i = 0; i < todoArray.length; i++) {

        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between border rounded col-md-8";
        listItem.appendChild(document.createTextNode(todoArray[i].todo));
        listItem.id = "toDoUIList";
        listItem.setAttribute('data-index', i);

        const delIcon = document.createElement("a");
        delIcon.href = "#"
        delIcon.className = "delIcon"

        const trashIcon = document.createElement("i")
        trashIcon.className = "bi bi-trash"
        trashIcon.id = "trashDel"
        trashIcon.onclick = todoDelete;

        delIcon.appendChild(trashIcon);
        listItem.appendChild(delIcon);
        listArr.appendChild(listItem);
    }

    todoInput.value = "";
}

function todoDelete(e) {
    const liElement = e.target.parentElement.parentElement;

    liElement.remove();
    const index = liElement.getAttribute('data-index');
    todoArray.splice(index, 1);

    let = JSON.parse(localStorage.getItem('strArray'));
    storedArray.splice(index, 1);
    localStorage.setItem('strArray', JSON.stringify(storedArray));
}

function delTodos() {
    listArr.innerHTML = "";
    todoArray.length = 0;
    let = JSON.parse(localStorage.getItem('strArray'));
    storedArray.length = 0;
    localStorage.setItem('strArray', JSON.stringify(storedArray));
}

function addTodoToStorage() {
    localStorage.setItem('strArray', JSON.stringify(todoArray));
}

function storageToUI() {
    let storedArray = getTodosFromStorage();
    todoArray = storedArray;
    addTodoToUI(storedArray);
}

function getTodosFromStorage() { // Storagedan Todoları Alma

    let storedArray;

    if (localStorage.getItem("todos") === null) {
        storedArray = [];
    } else {
        storedArray = JSON.parse(localStorage.getItem('strArray'));
    }
    return storedArray;

}

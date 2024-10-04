const addBtn = document.getElementById("addButton");
const todoInput = document.getElementById("todoBox");
let todoArray = [];
const listArr = document.getElementById("listArray");
const delBtn = document.getElementById("deleteAllBtn");

addBtn.addEventListener("click", addTodo);
delBtn.addEventListener("click", delTodos);
window.addEventListener("DOMContentLoaded", storageToUI); // Sayfa yüklendiğinde görevleri yükle

function addTodo(e) {
    if (todoInput.value === "") {
        alert("Lütfen boş değer girmeyiniz!");
    } else {
        const newTodo = {
            todo: todoInput.value,
            done: false
        };

        todoArray.push(newTodo); // Yeni görev ekle
        addTodoToUI(todoArray); // UI'yi güncelle
        addTodoToStorage(todoArray); // localStorage'ı güncelle
        todoInput.value = ""; // Giriş alanını temizle
    }

    e.preventDefault(); // Varsayılan davranışı engelle
}

function addTodoToUI(todoArray) {
    listArr.innerHTML = ""; // UI'yi temizle

    for (let i = 0; i < todoArray.length; i++) {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between border rounded col-md-8";
        listItem.appendChild(document.createTextNode(todoArray[i].todo));
        listItem.id = "toDoUIList";
        listItem.setAttribute('data-index', i);

        const delIcon = document.createElement("a");
        delIcon.href = "#";
        delIcon.className = "delIcon";

        const trashIcon = document.createElement("i");
        trashIcon.className = "bi bi-trash";
        trashIcon.id = "trashDel";
        trashIcon.onclick = todoDelete;

        delIcon.appendChild(trashIcon);
        listItem.appendChild(delIcon);
        listArr.appendChild(listItem);
    }
}

function todoDelete(e) {
    const liElement = e.target.parentElement.parentElement;
    const index = liElement.getAttribute('data-index');

    liElement.remove(); // UI'dan kaldır
    todoArray.splice(index, 1); // Diziden kaldır

    const storedArray = JSON.parse(localStorage.getItem('strArray'));
    storedArray.splice(index, 1); // localStorage'dan kaldır
    localStorage.setItem('strArray', JSON.stringify(storedArray)); // Güncellenmiş diziyi kaydet

    // UI'yi güncelle
    addTodoToUI(storedArray);
}

function delTodos() {
    listArr.innerHTML = ""; // UI'yi temizle
    todoArray = []; // Diziyi sıfırla
    localStorage.removeItem('strArray'); // localStorage'deki veriyi sil
}

function addTodoToStorage(todoArray) {
    localStorage.setItem('strArray', JSON.stringify(todoArray)); // Diziyi localStorage'a kaydet
}

function storageToUI() {
    const storedArray = getTodosFromStorage(); // localStorage'dan görevleri al
    todoArray = storedArray; // Todo dizisini güncelle
    addTodoToUI(todoArray); // UI'yi güncelle
}

function getTodosFromStorage() {
    let storedArray;

    if (localStorage.getItem("strArray") === null) {
        storedArray = []; // Eğer localStorage boşsa yeni bir dizi oluştur
    } else {
        storedArray = JSON.parse(localStorage.getItem('strArray')); // localStorage'daki veriyi al
    }
    return storedArray; // Diziyi döndür
}

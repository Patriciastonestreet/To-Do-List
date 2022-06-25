const addButton = document.getElementById("add-button");
addButton.addEventListener('click', addToDoItems);
function addToDoItems() {
    const itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
}

const clearButton = document.getElementById("clear-completed-button");
clearButton.addEventListener('click', clearCompletedToDoItems);
function clearCompletedToDoItems() {
    const completedItems = toDoList.getElementsByClassName("completed");
    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

const toDoEntryBox = document.getElementById("todo-entry-box");
const toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, completed) {
    const toDoItem = document.createElement("li");
    const toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);
    toDoEntryBox.value = "";

    if (completed) {
        toDoItem.classList.add("completed");
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggletoDoItemState);
}

function toggletoDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}




const emptyTheList = document.getElementById("empty-button");
emptyTheList.addEventListener('click', emptyList)
function emptyList() {
    const toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

const saveTheList = document.getElementById("save-button");
saveTheList.addEventListener('click', saveList);
function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };
        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));
        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}




loadList();
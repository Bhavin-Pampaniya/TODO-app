// ********** SELECT ITEMS ***********
const userText = document.querySelector(".todo-item");
const todoBtn = document.querySelector(".todo-btn");
const displayedTodoList = document.querySelector(".todo-list");
const clearAllBtn = document.querySelector(".clear-all");
const todoContainer = document.querySelector(".todo-container");
let count = 0;
let editElem;
let editElemIndex;
let editVal;
let editedElem;
showTodos();

// ********** FUNCTIONS ***********
const addToLocalStorage = (text) => {
    const todos = localStorage.getItem("todos");
    if (todos == null) {
        todoArr = [];
    }
    else {
        todoArr = JSON.parse(todos);
    }
    todoArr.push(text);
    localStorage.setItem("todos", JSON.stringify(todoArr));
    showTodos();

}

const addTodo = () => {
    const text = userText.value;
    if (text == "") {
        userText.placeholder = "Add a value, it can't be empty";
    } else {
        userText.value = "";
        userText.placeholder = "e.g. Complete a project";
        addToLocalStorage(text);
    }
}

//Edit TODO
const editTodo = () => {
    const arr = JSON.parse(localStorage.getItem("todos"));
    const editedText = userText.value;
    if (editedText == "") {
        userText.placeholder = "Add a value, it can't be empty";
    } else {
        arr.splice(editElemIndex, 1);
        arr.splice(editElemIndex, 0, editedText); 
        arr[editElemIndex] = editedText;
        editedElem.innerText = editedText;
        localStorage.setItem("todos", JSON.stringify(arr));
        userText.value = "";
        userText.placeholder = "e.g. Complete a project";
        todoBtn.innerText = "Add";
    }

}

function showTodos() {
    const todos = JSON.parse(localStorage.getItem("todos"));

    console.log("todo array", todos);
    if (todos) {
        for (i = count; i < todos.length; i++) {
            const div = document.createElement("div");
            div.classList.add("main-item");
            const HtmlText = `<p class="item">${todos[i]}</p>
                        <div class="btn-container">
                            <button class="edit-btn">
                                <i id="${i}" class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button class="delete-btn">
                                <i id="${i}" class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>`;
            div.insertAdjacentHTML("afterbegin", HtmlText);
            displayedTodoList.insertAdjacentElement("beforeend", div);
            todoContainer.style.visibility = "visible";
            clearAllBtn.style.visibility = "visible";
            const deleteBtn = div.querySelector(".delete-btn");
            const editBtn = div.querySelector(".edit-btn");
            count++;

            //Delete TODO
            deleteBtn.addEventListener("click", (e) => {
                arr = JSON.parse(localStorage.getItem("todos"));
                const delElem = e.target.parentElement.parentElement.parentElement;
                const getVal = delElem.querySelector(".item").innerText;
                arr.forEach((e, index) => {
                    if (getVal === e) {
                        arr.splice(index, 1);
                        showTodos();
                    }
                })
                arr[delElem];
                div.remove();
                localStorage.setItem("todos", JSON.stringify(arr));
                count--;
                if (arr.length == 0) {
                    localStorage.clear();
                    clearAllBtn.style.visibility = "hidden";
                }
            });

            //Edit TODO
            editBtn.addEventListener("click", (e) => {
                e.preventDefault();
                editElem = e.target.parentElement.parentElement.parentElement;
                editElemIndex = e.target.id;
                editedElem = editElem.querySelector(".item");
                editVal = editElem.querySelector(".item").innerText;
                userText.value = editVal;
                todoBtn.innerText = "Edit";
            })

        }
    }
    return;
}

// ********** EVENT LISTENERS ***********
// showTodos();
todoBtn.addEventListener("click", (e) => {
    console.log("clicked");
    e.preventDefault();
    if (todoBtn.innerText === "Add") {
        return addTodo();
    }
    else {
        return editTodo();
    }
});

clearAllBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})
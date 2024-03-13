//Data Structure for Lists, Current Lists, and To-dos.
const lists = [
    {
        name: 'Test List',
        todos: [
            {
                text: 'FirstToDo',
                completed: false
            },
            {
                text: 'SecondToDo',
                completed: false
            },
            {
                text: 'ThirdToDo',
                completed: false
            },
            {
                text: 'FourthToDo',
                completed: false
            },
            {
                text: 'FifthToDo',
                completed: false
            },
            {
                text: 'SixthToDo',
                completed: false
            },
        ]
    },
]

let currentListId = 0
    
render();

//functions
//Create a render function. It will be in charge of rendering all of the content in the page.
function render() {
    let listsHtml = '<ul class="list-group">';
    
    lists.forEach((list, index) => {
        listsHtml += `<li onclick="showListHandler(${index});" class="list-group-item">${list.name}</li>`;
    });
    
    listsHtml += '</ul>';
    
    //print out the lists
    document.getElementById('lists').innerHTML = listsHtml;
    
    //print out the name of the current list
    let listName = document.getElementById('current-list-name');

    //iterate over the todos in the current list
    let todosHtml = '<ul id="current-list-todos" class="list-group">'
    
    if (lists.length === 0) {
        todosHtml = "";
        listName.innerHTML = "";
    } else {
    let searchValue = document.getElementById('search').value.toLowerCase();
    listName.innerHTML = lists[currentListId].name;
    lists[currentListId].todos.forEach((todo, index) => {
        const displayTodo = todo.text.toLowerCase().includes(searchValue);
        let displayValue = displayTodo ? "" : 'style="display:none"';
            todosHtml += `<li class="todo list-group-item" ${displayValue}>
            <div class="input-group">
            <span class="input-group-text">
            <div class="form-check d-flex justify-content-center align-items-center">
            <input
            class="form-check-input"
            type="checkbox"
            onchange="markTodoAsCompleted(${index})"
            ${todo.completed ? "checked": ""}
            />
            </div>
            </span>
            <input type="text" class="form-control" value="${todo.text}" readonly/>
            <button class="btn btn-edit btn-outline-secondary bg-dark" onclick="editToDo(${index})">Edit</button>
            <button id="delete-todo-btn" class="btn btn-outline-secondary bg-dark" onclick="removeTodo(${index})">
                <i class="fa-regular fa-trash-can"></i>
            </button>
            </div>
            </li>`;
    });}
    
    todosHtml += '</ul>'
    
    //print out the todos
    document.getElementById('current-list-todos').innerHTML = todosHtml;
}

//Add functions to react to user input. Probably need - removeAllTodosCompleted, editToDo.

//Done and Working
function addList() {
const newListName = document.getElementById('list-input').value;
if(newListName) {
    lists.push({name: newListName,
        todos: []})
    }
    render();
}
    
document.getElementById("add-list").addEventListener("click", addList);
    
function addToDo() {
    const text = document.getElementById('todo-input-box').value;
    if(text) {
        lists[currentListId].todos.push({
            text: text,
            completed: false
        })
        render();
    }
}
    
document.getElementById("add-todo-btn").addEventListener("click", addToDo);
    
function showListHandler(index) {
    currentListId = index;
    render();
}

function markTodoAsCompleted(index) {
    let todo = lists[currentListId].todos[index]
    todo.completed = !todo.completed
    render();
}

function removeList() {
    lists.splice(currentListId, 1);
    currentListId = 0;
    render();
}

document.getElementById("delete-list-btn").addEventListener("click", removeList);

function removeTodo(index) {
    clickedTodo = index;
    console.log(`ToDo at ${index} was clicked`)
    lists[currentListId].todos.splice(clickedTodo, 1); 
    render();
}

function removeAllTodosCompleted() {
    for (let i = lists[currentListId].todos.length - 1; i >= 0; i--) {
        if (lists[currentListId].todos[i].completed) {
            lists[currentListId].todos.splice(i, 1);
        }
    }
    render();
}

document.querySelector("#clear-completed-todos").addEventListener("click", removeAllTodosCompleted);

function editToDo(index) {
    const inputField = document.querySelectorAll('.todo .form-control')[index];
    const editButton = document.querySelectorAll('.todo .btn-edit')[index];

    if (editButton.textContent === "Edit") {
    inputField.removeAttribute('readonly');
    editButton.textContent = "Submit";
    } else {
        lists[currentListId].todos[index].text = inputField.value;
        inputField.setAttribute('readonly', true);
        editButton.textContent = "Edit"
    }
}

document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.getElementById('right-screen').classList.toggle('dark-mode');
    document.getElementById('left-screen').classList.toggle('left-dark-mode');
    document.getElementById('navbar').classList.toggle('nav-dark-mode');
  });

//Not Done and not Working

function search() {
    render();
}

document.getElementById("search").addEventListener("input", search);
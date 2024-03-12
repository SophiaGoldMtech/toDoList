//Data Structure for Lists, Current Lists, and To-dos.
const lists = [
    {
        name: 'Test List',
        todos: [
            {
                text: 'firstToDo',
                completed: false
            },
            {
                text: 'secondToDo',
                completed: false
            },
            {
                text: 'ThirdToDo',
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
    listName.innerHTML = lists[currentListId].name;
    lists[currentListId].todos.forEach((todo, index) => {
        todosHtml += `<li class="todo list-group-item">
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
        <button class="btn btn-outline-secondary bg-dark">Edit</button>
        <button class="btn btn-outline-secondary bg-dark delete-todo-btn">
            <i class="fa-regular fa-trash-can"></i>
        </button>
        </div>
        </li>`;
        
    });}
    
    todosHtml += '</ul>'
    
    //print out the todos
    document.getElementById('current-list-todos').innerHTML = todosHtml;
}

//Add functions to react to user input. Probably need - removeList, removeTodo, removeAllTodosCompleted, editToDo.

//Done and Working
function addList() {
    const newListName = document.getElementById('list-input').value;
    if(newListName) {
        lists.push({name: newListName,
            todos: []})
        }
        render();
        console.log(lists);
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
    //Not Done and not Working
    
    //need to figure out if I want a button for this or something, but probably yes a button.
    //DON'T FORGET TO COME BACK TO THIS ONE BIG BIG DUMMY
    function removeList() {
        console.log('before: ', lists)
        lists.splice(currentListId, 1);
        currentListId = 0;
        console.log('after: ', lists)
        render();
    }

    document.getElementById("delete-list-btn").addEventListener("click", removeList);

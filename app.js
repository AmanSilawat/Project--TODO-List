//Selectors
const todoInptut = document.getElementById('todo-input');
const todoButton = document.getElementById('todo-button');
const todoList = document.getElementById('todo-list');
const filterOption = document.getElementById('filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Function
function addTodo(event) {
    // Prevent form Submiting
    event.preventDefault();
    let inputVal = todoInptut.value.trim();

    if (inputVal != '') {
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = inputVal;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Save to localStorage
        saveLocalTodos(inputVal);

        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);

        // Clear todo input
        todoInptut.value = '';
        todoInptut.focus();
    } else {
        todoInptut.value = '';
        todoInptut.focus();
    }
}

function deleteCheck(e) {
    const item = e.target;

    //Delete todo
    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;

        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //Check mark
    if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;

            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

            default:
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // check
    let todos;

    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoTxt = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoTxt), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}

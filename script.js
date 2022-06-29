const mode = document.getElementById('mode');
const newTodo = document.getElementById('addtodo');
const todoList = document.querySelector('.todolist');
const count = document.querySelector('.count');

count.innerText = document.querySelectorAll('.list input[type="checkbox"]').length;

mode.addEventListener('click', () => {
    document.querySelector('body').classList = [mode.checked ? 'lightmode' : 'darkmode'];
});

document.querySelector('.todoform span').addEventListener('click', () => {
    if (newTodo.value.length > 0) {
        createNewTodoItem(newTodo.value);
        newTodo.value = '';
    }
});

newTodo.addEventListener('keypress', (event) => {
    if (newTodo.value.length > 0 && event.charCode === 13  ) {
        createNewTodoItem(newTodo.value);
        newTodo.value = '';
    }
});

function createNewTodoItem(text) {
    const elem = document.createElement('li');
    elem.classList.add('todolist');

    elem.innerHTML = `<label class="list">
        <input type="checkbox" name="todoItem">
        <span class="checkmark"></span>
        <span class="text">${text}</span>
        </label>
        <span class="remove"></span>`
    ;

    if (document.querySelector('.filter input[type="radio"]:checked').id === 'completed') {
        elem.classList.add('hidden');
    }
    todoList.append(elem);
    updateItemsCount(1);
}

function updateItemsCount(number) {
    count.innerText = +count.innerText + number;
}

function removeTodoItem(elem) {
    elem.remove();
    updateItemsCount(-1);
}

todoList.addEventListener('click',(event) => {
    if (event.target.classList.contains('remove')) {
        removeTodoItem(event.target.parentElement);
    }
});

document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll('.list input[type="checkbox"]:checked').forEach(item => {
        removeTodoItem(item.closest('li'));
    });
});

document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('change', (event) => {
        filterTodoItems(event.target.id);
    });
});

function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll('li');
    if(id==='all'){
            allItems.forEach(item => {
                item.classList.remove('hidden');
            })
    }
    else if(id==='active'){
        allItems.forEach(item => {
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
    }
    else {
         allItems.forEach(item => {
                !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
    } 
    }
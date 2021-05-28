//Defining UI elements
console.log(window)
const form = document.querySelector('form');
const taskList = document.querySelector('ul');

const input = document.querySelector('input');
//console.log(taskList)

const clearBtn = document.querySelector('.btn1')
    //console.log(clearBtn)

const filter = document.querySelector('#filter');
console.log(filter)

//console.log(form);

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearAllTasks);
    filter.addEventListener('keyup', filterTasks);
    document.addEventListener('DOMContentLoaded', loadTasks);
}

function loadTasks(e) {
    let taskArray;
    taskArray = JSON.parse(localStorage.getItem('tasks'));

    taskArray.forEach(function(task, index) {
        const li = document.createElement('li')
        li.className = 'task'

        const span = document.createElement('span')
        span.textContent = task

        li.appendChild(span)

        const link = document.createElement('a')
        link.className = 'icon'
        link.innerHTML = '<i class="fas fa-trash"></i>'

        li.appendChild(link)

        taskList.appendChild(li)

    });
};



function addTask(e) {

    e.preventDefault();

    if (input.value === '') {
        alert('Enter a task to add');
        return
    }

    //create li based on that

    const li = document.createElement('li')
    li.className = 'task'

    const span = document.createElement('span')
    span.textContent = input.value

    li.appendChild(span)

    const link = document.createElement('a')
    link.className = 'icon'
    link.innerHTML = '<i class="fas fa-trash"></i>'

    li.appendChild(link)

    taskList.appendChild(li)



    // adding to LocalStorage

    let taskArray;
    taskArray = JSON.parse(localStorage.getItem('tasks'));

    if (taskArray == null) {
        taskArray = [input.value.toString()];
    } else {
        taskArray.push(input.value.toString());
    }

    localStorage.setItem('tasks', JSON.stringify(taskArray));

    input.value = '';

}

function removeTask(e) {
    e.preventDefault();

    if (e.target.parentElement.parentElement.classList.contains('task')) {
        if (confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskLocalStorage(taskli) {
    const text = taskli.firstChild.textContent;
    let taskArray;
    taskArray = JSON.parse(localStorage.getItem('tasks'));

    const i = taskArray.indexOf(text.toString());

    taskArray.splice(i, 1);

    localStorage.setItem('tasks', JSON.stringify(taskArray));

}



function clearAllTasks(e) {

    //taskList.innerHTML = ''; But it is slow

    e.preventDefault()
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}

function filterTasks(e) {
    const text = filter.value.toLowerCase();

    console.log(text);

    document.querySelectorAll('.task').forEach(function(task) {

        console.log(task);

        if (task.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
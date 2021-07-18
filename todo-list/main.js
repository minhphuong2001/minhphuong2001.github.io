var input = document.getElementById("input");
var allActive = document.getElementById("all-active");
var checkAll = document.getElementById("check");

input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        add();
    }
})

function Todo(id, content, isCompleted) {
    this.id = id;
    this.content = content;
    this.isCompleted = isCompleted;
}

function getAllTodo() {
    let todoList = JSON.parse(localStorage.getItem("todos"));
    return todoList ? todoList : [];
}

function storeTodo(todoArr) {
    localStorage.setItem("todos", JSON.stringify(todoArr));
}

function show(todoArr) {
    let tab = '';
    const todos = getAllTodo();
    if (!todos.length) {
        document.getElementById("footer").style.display = "none";
        checkAll.style.display = "none";
    }
    if (todoArr.length) {
        todoArr.forEach(item => {
            tab += item.isCompleted ? `
                <div class="item">
                    <input checked type="checkbox" id=${item.id} class="checkbox" onClick="Complete(${item.id}, ${item.isCompleted})">
                    <p class="text">${item.content}</p>
                    <i class="fa fa-times clear" onclick="deleteTodo(${item.id})"></i>
                </div>
            ` : `
                <div class="item">
                    <input type="checkbox" id=${item.id} class="checkbox" onClick="Complete(${item.id}, ${item.isCompleted})">
                    <p>${item.content}</p>
                    <i class="fa fa-times clear" onclick="deleteTodo(${item.id})"></i>
                </div>
            `
        })
        checkAll.style.display = "block";
        var count = 0;
        todoArr.forEach(item => {
            count = item.isCompleted ? count : count+1;
        })
    }

    document.getElementById("count-item").innerHTML = count ? `${count} items left` : `0 item left`;
    allActive.innerHTML = tab;
}

function add() {
    const todoList = getAllTodo();
    let content = input.value;
    if (content) {
        const id = todoList ? todoList.length : 0;
        const todo = new Todo(id, content, false);
        if (!todoList) {
            todoList = [todo];
            storeTodo(todoList);
        } else {
            todoList.push(todo);
            storeTodo(todoList);
        }
        input.value = "";
        show(todoList);
        document.location.reload();
    }
    else {
        alert("You can enter todo!!")
    }
    
}

function Complete(id, isCompleted) {
    const todos = getAllTodo();
    const completedTodo = todos.map(value => {
        if (value.id === id) {
            if (isCompleted) {
                value.isCompleted = false;
            } else {
                value.isCompleted = true;
            }
        }
        return value;
    })
    storeTodo(completedTodo);
    show(completedTodo);
}

function deleteTodo(todoId) {
    const todos = getAllTodo();
    const index = todos.findIndex(item => item.id === todoId);
    todos.splice(index, 1);
    storeTodo(todos);
    show(todos);

}

function btnTab(x) {
    var all = document.querySelector(".all");
    var active = document.querySelector(".active");
    var completed = document.querySelector(".completed");
    all.style.backgroundColor = "#fff";
    active.style.backgroundColor = "#fff";
    completed.style.backgroundColor = "#fff";
    if (x === 1) {
        all.style.backgroundColor = "#cccc";
    } else if (x === 2) {
        active.style.backgroundColor = "#cccc";
    } else if (x === 3) {
        completed.style.backgroundColor = "#cccc";
    }
}

function allTodo() {
    const todos = getAllTodo();
    show(todos);
    btnTab(1);
}
allTodo();

function active() {
    let todos = getAllTodo();
    let todo;
    if (todos) {
        todo = todos.filter((value) => {
            return value.isCompleted == false;
        })
    }
    show(todo);
    btnTab(2);

}

function completed() {
    let todos = getAllTodo();
    let todo;
    if (todos) {
        todo = todos.filter((value) => {
            return value.isCompleted == true;
        })
    }
    show(todo);
    btnTab(3);

}

function clearCompleted() {
    storeTodo(new Array);
    document.location.reload();
}

checkAll.addEventListener("click", () => {
    const todos = getAllTodo();
    const todo = todos.some(item => item.isCompleted === true);

    todos.forEach(item => {
        Complete(item.id, todo);
    })
    if (todo) {
        allTodo();
    }else{
        completed();
    }
})

// function editTodoById(todoId) {
//     const todos = getAllTodo();
//     const todo = {
//         id, content, isCompleted
//     };

//     const index = todos.findIndex(item => item.id === todoId);
//     todo[index].id == todo.id;
//     todo[index].content == todo.content;
//     todo[index].isCompleted == todo.isCompleted;

//     storeTodo(todos);
//     document.location.reload();
// }
const tasksContainer = document.getElementById("tasks-container");
const newTaskSubmitButton = document.getElementById("submit-task");
async function loadTodos() {
    let result;
    try {
        result = await fetch("http://localhost:3000/todos", {
            method: "GET",
        });
    } catch (error) {
        return alert("Something went wrong");
    }
    if (!result.ok) {
        return alert("Something went wrong");
    }
    const resultData = await result.json();
    const todos = resultData.todos;
    for (const todo of todos) {
        const todoArticle = document.createElement("article");
        const todoTaskH3 = document.createElement("h3");
        todoTaskH3.textContent = todo.task;
        const todoButtonsDiv = document.createElement("div");
        const deleteButton = document.createElement("button");
        deleteButton.classList = "delete";
        deleteButton.textContent = "DELETE";
        deleteButton.dataset.todoid = todo.id;
        todoButtonsDiv.appendChild(deleteButton);
        const editButton = document.createElement("button");
        editButton.classList = "edit";
        editButton.textContent = "EDIT";
        editButton.dataset.todoid = todo.id;
        todoButtonsDiv.appendChild(editButton);
        todoArticle.appendChild(todoTaskH3);
        todoArticle.appendChild(todoButtonsDiv);
        tasksContainer.appendChild(todoArticle);
    }
}

async function addNewTask(event) {
    event.preventDefault();
    const formdata = new FormData(event.target.parentElement) 
    const taskValue = formdata.get('task');
    let response;
    try {
        response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({
                task: taskValue
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error) {
        alert ('Something went wrong!')
    }
    if (!response.ok){
        return alert ('Something went wrong')
    }
    const responseData = await response.json()
    const todo = responseData.createdTodo;
    const todoArticle = document.createElement("article");
    const todoTaskH3 = document.createElement("h3");
    todoTaskH3.textContent = todo.task;
    const todoButtonsDiv = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.classList = "delete";
    deleteButton.textContent = "DELETE";
    deleteButton.dataset.todoid = todo.id;
    todoButtonsDiv.appendChild(deleteButton);
    const editButton = document.createElement("button");
    editButton.classList = "edit";
    editButton.textContent = "EDIT";
    editButton.dataset.todoid = todo.id;
    todoButtonsDiv.appendChild(editButton);
    todoArticle.appendChild(todoTaskH3);
    todoArticle.appendChild(todoButtonsDiv);
    tasksContainer.insertBefore(todoArticle, tasksContainer.firstChild);
}



newTaskSubmitButton.addEventListener("click", addNewTask);

loadTodos();

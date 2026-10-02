const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskStatus = document.getElementById("taskStatus");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

let tasks = [];

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");

       
li.innerHTML = `
    <span>${task.title} - ${task.status}</span>

    <button onclick="completeTask(${tasks.indexOf(task)})">
        Complete
    </button>

    <button onclick="deleteTask(${tasks.indexOf(task)})">
        Delete
    </button>

`;
taskList.appendChild(li);
    });
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const status = taskStatus.value;

    if (title === "") {
        message.textContent = "Please enter a task.";
        return;
    }

    const newTask = {
        title: title,
        status: status
    };

    tasks.push(newTask);

    taskTitle.value = "";
    message.textContent = "";

    renderTasks();
});

//...existing code...
function completeTask(index) {
    tasks[index].status = "completed";

    renderTasks();
    }
    function deleteTask(index) {
    tasks.splice(index, 1);

    renderTasks();
}function filterTasks(status) {
    if (status === "all") {
        renderTasks();
        return;
    }

    const filteredTasks = tasks.filter(function(task) {
        return task.status === status;
    });

    taskList.innerHTML = "";

    filteredTasks.forEach(function(task) {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task.title} - ${task.status}</span>

            <button onclick="completeTask(${tasks.indexOf(task)})">
                Complete
            </button>

            <button onclick="deleteTask(${tasks.indexOf(task)})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}
document.getElementById("allFilter").addEventListener("click", function() {
    filterTasks("all");
});

document.getElementById("pendingFilter").addEventListener("click", function() {
    filterTasks("pending");
});

document.getElementById("completedFilter").addEventListener("click", function() {
    filterTasks("completed");
});
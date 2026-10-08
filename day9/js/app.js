const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
const taskList = document.getElementById("taskList");
const dashboardMessage = document.getElementById("dashboardMessage");
const taskDialog = document.getElementById("taskDialog");
const taskDialogContent = document.getElementById("taskDialogContent");
const totalCount = document.getElementById("totalCount");
const openCount = document.getElementById("openCount");
const completedCount = document.getElementById("completedCount");

let tasks = [];

const getTasks = async () => {
    const response = await fetch(TODOS_URL);
    if (!response.ok) {
        throw new Error("Could not fetch tasks. Status: " + response.status);
    }
    return response.json();
};

const getTaskById = async (taskId) => {
    const response = await fetch(TODOS_URL + "/" + taskId);
    if (!response.ok) {
        throw new Error("Could not fetch task details. Status: " + response.status);
    }
    return response.json();
};

const updateSummary = () => {
    totalCount.textContent = tasks.length;
    openCount.textContent = tasks.filter((task) => !task.completed).length;
    completedCount.textContent = tasks.filter((task) => task.completed).length;
};

const createTaskCard = (task) => {
    const card = document.createElement("article");
    card.className = "task-card";

    const content = document.createElement("div");
    content.className = "task-card-content";

    const title = document.createElement("h3");
    title.textContent = task.title;

    const status = document.createElement("span");
    status.className = task.completed ? "task-status is-complete" : "task-status is-open";
    status.textContent = task.completed ? "Completed" : "To do";

    const viewButton = document.createElement("button");
    viewButton.className = "text-button";
    viewButton.type = "button";
    viewButton.textContent = "View details";
    viewButton.addEventListener("click", () => showTaskDetails(task.id));

    content.append(title, status);
    card.append(content, viewButton);
    return card;
};

const renderTasks = () => {
    taskList.replaceChildren(...tasks.map(createTaskCard));
    updateSummary();
    dashboardMessage.textContent = tasks.length + " tasks loaded.";
};

const showTaskDetails = async (taskId) => {
    try {
        const task = await getTaskById(taskId);
        const title = document.createElement("h2");
        title.id = "taskDialogTitle";
        title.textContent = task.title;
        const id = document.createElement("p");
        id.textContent = "Task ID: " + task.id;
        const state = document.createElement("p");
        state.textContent = "Status: " + (task.completed ? "Completed" : "To do");
        taskDialogContent.replaceChildren(title, id, state);
        taskDialog.showModal();
    } catch (error) {
        console.error(error);
    }
};

const loadTasks = async () => {
    try {
        tasks = await getTasks();
        renderTasks();
    } catch (error) {
        console.error(error);
        dashboardMessage.textContent = "Could not load tasks. See the browser console for details.";
    }
};

loadTasks();

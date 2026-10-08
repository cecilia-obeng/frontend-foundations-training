const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
const taskList = document.getElementById("taskList");
const dashboardMessage = document.getElementById("dashboardMessage");
const taskDialog = document.getElementById("taskDialog");
const taskDialogContent = document.getElementById("taskDialogContent");
const totalCount = document.getElementById("totalCount");
const openCount = document.getElementById("openCount");
const completedCount = document.getElementById("completedCount");
const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const taskSearch = document.getElementById("taskSearch");
const taskFilter = document.getElementById("taskFilter");

let tasks = [];

const getTasks = async () => {
    const response = await fetch(TODOS_URL);
    if (!response.ok) throw new Error("Could not fetch tasks. Status: " + response.status);
    return response.json();
};

const getTaskById = async (taskId) => {
    const response = await fetch(TODOS_URL + "/" + taskId);
    if (!response.ok) throw new Error("Could not fetch task details. Status: " + response.status);
    return response.json();
};

const postTask = async (title) => {
    const response = await fetch(TODOS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ title, completed: false, userId: 1 })
    });
    if (!response.ok) throw new Error("Could not create the task. Status: " + response.status);
    return response.json();
};

const patchTask = async (taskId, updates) => {
    const response = await fetch(TODOS_URL + "/" + taskId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error("Could not update the task. Status: " + response.status);
    return response.json();
};

const deleteTaskRequest = async (taskId) => {
    const response = await fetch(TODOS_URL + "/" + taskId, { method: "DELETE" });
    if (!response.ok) throw new Error("Could not delete the task. Status: " + response.status);
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

    const actions = document.createElement("div");
    actions.className = "task-actions";
    const viewButton = document.createElement("button");
    viewButton.className = "text-button";
    viewButton.type = "button";
    viewButton.textContent = "Details";
    viewButton.addEventListener("click", () => showTaskDetails(task.id));

    const toggleButton = document.createElement("button");
    toggleButton.className = "text-button";
    toggleButton.type = "button";
    toggleButton.textContent = task.completed ? "Reopen" : "Complete";
    toggleButton.addEventListener("click", () => updateTaskStatus(task.id, !task.completed));

    const deleteButton = document.createElement("button");
    deleteButton.className = "text-button text-button-danger";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => removeTask(task.id));

    content.append(title, status);
    actions.append(viewButton, toggleButton, deleteButton);
    card.append(content, actions);
    return card;
};

const renderTasks = () => {
    const query = taskSearch.value.trim().toLowerCase();
    const selectedStatus = taskFilter.value;
    const visibleTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(query);
        const matchesStatus = selectedStatus === "all"
            || (selectedStatus === "open" && !task.completed)
            || (selectedStatus === "completed" && task.completed);
        return matchesSearch && matchesStatus;
    });

    taskList.replaceChildren(...visibleTasks.map(createTaskCard));
    updateSummary();
    dashboardMessage.textContent = "Showing " + visibleTasks.length + " of " + tasks.length + " tasks.";
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

const updateTaskStatus = async (taskId, completed) => {
    try {
        const updatedTask = await patchTask(taskId, { completed });
        tasks = tasks.map((task) => task.id === taskId ? { ...task, ...updatedTask } : task);
        renderTasks();
    } catch (error) {
        console.error(error);
        dashboardMessage.textContent = "Could not update the task. See the browser console for details.";
    }
};

const removeTask = async (taskId) => {
    try {
        await deleteTaskRequest(taskId);
        tasks = tasks.filter((task) => task.id !== taskId);
        renderTasks();
    } catch (error) {
        console.error(error);
        dashboardMessage.textContent = "Could not delete the task. See the browser console for details.";
    }
};

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = taskTitleInput.value.trim();

    if (title === "") {
        dashboardMessage.textContent = "Please enter a task title.";
        taskTitleInput.focus();
        return;
    }

    try {
        const createdTask = await postTask(title);
        tasks.unshift(createdTask);
        taskSearch.value = "";
        taskFilter.value = "all";
        renderTasks();
        taskForm.reset();
        taskTitleInput.focus();
    } catch (error) {
        console.error(error);
        dashboardMessage.textContent = "Could not create the task. See the browser console for details.";
    }
});

taskSearch.addEventListener("input", renderTasks);
taskFilter.addEventListener("change", renderTasks);

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

import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "./api.js";

const taskList = document.getElementById("taskList");
const dashboardMessage = document.getElementById("dashboardMessage");
const taskDialog = document.getElementById("taskDialog");
const taskDialogContent = document.getElementById("taskDialogContent");
const totalCount = document.getElementById("totalCount");
const openCount = document.getElementById("openCount");
const completedCount = document.getElementById("completedCount");
const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const submitTaskButton = document.getElementById("submitTaskButton");
const taskSearch = document.getElementById("taskSearch");
const taskFilter = document.getElementById("taskFilter");
const retryButton = document.getElementById("retryButton");
const emptyState = document.getElementById("emptyState");

let tasks = [];
const busyTaskIds = new Set();

const setMessage = (message, kind = "") => {
    dashboardMessage.textContent = message;
    dashboardMessage.dataset.kind = kind;
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
    viewButton.disabled = busyTaskIds.has(task.id);
    viewButton.addEventListener("click", () => showTaskDetails(task.id));

    const toggleButton = document.createElement("button");
    toggleButton.className = "text-button";
    toggleButton.type = "button";
    toggleButton.textContent = busyTaskIds.has(task.id) ? "Saving…" : task.completed ? "Reopen" : "Complete";
    toggleButton.disabled = busyTaskIds.has(task.id);
    toggleButton.addEventListener("click", () => updateTaskStatus(task.id, !task.completed));

    const deleteButton = document.createElement("button");
    deleteButton.className = "text-button text-button-danger";
    deleteButton.type = "button";
    deleteButton.textContent = busyTaskIds.has(task.id) ? "Working…" : "Delete";
    deleteButton.disabled = busyTaskIds.has(task.id);
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

    if (visibleTasks.length === 0) {
        emptyState.hidden = false;
        emptyState.textContent = tasks.length === 0
            ? "There are no tasks yet. Add one above to get started."
            : "No tasks match those filters. Try a different search or status.";
    } else {
        emptyState.hidden = true;
        emptyState.textContent = "";
    }

    setMessage("Showing " + visibleTasks.length + " of " + tasks.length + " tasks.", "success");
};

const showTaskDetails = async (taskId) => {
    const loading = document.createElement("p");
    loading.textContent = "Loading task details…";
    taskDialogContent.replaceChildren(loading);
    taskDialog.showModal();

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
    } catch (error) {
        const message = document.createElement("p");
        message.className = "error-text";
        message.textContent = "Could not load these task details. Please close and try again.";
        taskDialogContent.replaceChildren(message);
    }
};

const updateTaskStatus = async (taskId, completed) => {
    busyTaskIds.add(taskId);
    renderTasks();
    setMessage("Updating task…");

    try {
        const updatedTask = await updateTask(taskId, { completed });
        tasks = tasks.map((task) => task.id === taskId ? { ...task, ...updatedTask } : task);
    } catch (error) {
        setMessage("Could not update the task. Please try again.", "error");
    } finally {
        busyTaskIds.delete(taskId);
        renderTasks();
    }
};

const removeTask = async (taskId) => {
    busyTaskIds.add(taskId);
    renderTasks();
    setMessage("Removing task…");

    try {
        await deleteTask(taskId);
        tasks = tasks.filter((task) => task.id !== taskId);
    } catch (error) {
        setMessage("Could not delete the task. Please try again.", "error");
    } finally {
        busyTaskIds.delete(taskId);
        renderTasks();
    }
};

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = taskTitleInput.value.trim();

    if (title === "") {
        setMessage("Please enter a task title.", "error");
        taskTitleInput.focus();
        return;
    }

    taskForm.setAttribute("aria-busy", "true");
    submitTaskButton.disabled = true;
    submitTaskButton.textContent = "Adding…";
    setMessage("Adding your task…");

    try {
        const createdTask = await createTask(title);
        tasks.unshift(createdTask);
        taskSearch.value = "";
        taskFilter.value = "all";
        taskForm.reset();
        renderTasks();
        taskTitleInput.focus();
    } catch (error) {
        setMessage("Could not add the task. Please try again.", "error");
    } finally {
        taskForm.setAttribute("aria-busy", "false");
        submitTaskButton.disabled = false;
        submitTaskButton.textContent = "Add task";
    }
});

taskSearch.addEventListener("input", renderTasks);
taskFilter.addEventListener("change", renderTasks);

const loadTasks = async () => {
    retryButton.hidden = true;
    retryButton.disabled = true;
    taskSearch.disabled = true;
    taskFilter.disabled = true;
    taskList.replaceChildren();
    emptyState.hidden = true;
    setMessage("Loading tasks…");

    try {
        tasks = await getTasks();
        taskSearch.disabled = false;
        taskFilter.disabled = false;
        renderTasks();
    } catch (error) {
        tasks = [];
        updateSummary();
        setMessage("We couldn't load your tasks. Check your connection and try again.", "error");
        retryButton.hidden = false;
    } finally {
        retryButton.disabled = false;
    }
};

retryButton.addEventListener("click", loadTasks);
loadTasks();

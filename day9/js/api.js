const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

const request = async (url, options = {}) => {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error("Request failed with status " + response.status + ".");
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
};

export const getTasks = async () => {
    const tasks = await request(TODOS_URL);

    if (!Array.isArray(tasks)) {
        throw new Error("The API returned tasks in an unexpected format.");
    }

    return tasks;
};

export const getTaskById = (taskId) => request(TODOS_URL + "/" + taskId);

export const createTask = (title) => request(TODOS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ title, completed: false, userId: 1 })
});

export const updateTask = (taskId, updates) => request(TODOS_URL + "/" + taskId, {
    method: "PATCH",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(updates)
});

export const deleteTask = (taskId) => request(TODOS_URL + "/" + taskId, {
    method: "DELETE"
});

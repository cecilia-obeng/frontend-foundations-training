const sampleUsers = [
    { name: "Amina Yusuf", email: "amina@example.com" },
    { name: "Noah Chen", email: "noah@example.com" },
    { name: "Sofia Martin", email: "sofia@example.com" },
    { name: "Ethan Okafor", email: "ethan@example.com" },
    { name: "Maya Patel", email: "maya@example.com" }
];

const loadUsersButton = document.getElementById("loadUsersButton");
const simulateFailureButton = document.getElementById("simulateFailureButton");
const userList = document.getElementById("userList");
const statusMessage = document.getElementById("statusMessage");
const promiseMessage = document.getElementById("promiseMessage");
const promiseSuccessButton = document.getElementById("promiseSuccessButton");
const promiseFailureButton = document.getElementById("promiseFailureButton");

const createUserCard = (user) => {
    const item = document.createElement("li");
    item.className = "user-card";
    const name = document.createElement("strong");
    name.textContent = user.name;
    const email = document.createElement("span");
    email.textContent = user.email;
    item.append(name, email);
    return item;
};

const renderUsers = (users) => {
    userList.replaceChildren(...users.map(createUserCard));
};

const makeUserRequest = (shouldFail = false) => new Promise((resolve, reject) => {
    window.setTimeout(() => {
        if (shouldFail) {
            reject(new Error("The sample request failed. Please try again."));
            return;
        }
        resolve([...sampleUsers]);
    }, 2000);
});

const setLoaderBusy = (isBusy) => {
    loadUsersButton.disabled = isBusy;
    simulateFailureButton.disabled = isBusy;
};

const loadUsers = async (shouldFail = false) => {
    setLoaderBusy(true);
    userList.replaceChildren();
    statusMessage.dataset.kind = "";
    statusMessage.textContent = "Loading users…";

    try {
        const users = await makeUserRequest(shouldFail);
        renderUsers(users);
        statusMessage.dataset.kind = "success";
        statusMessage.textContent = "Loaded " + users.length + " users successfully.";
    } catch (error) {
        statusMessage.dataset.kind = "error";
        statusMessage.textContent = error.message;
    } finally {
        setLoaderBusy(false);
    }
};

loadUsersButton.addEventListener("click", () => loadUsers());
simulateFailureButton.addEventListener("click", () => loadUsers(true));

promiseSuccessButton.addEventListener("click", () => {
    promiseMessage.dataset.kind = "";
    promiseMessage.textContent = "Waiting for the promise…";
    makeUserRequest()
        .then((users) => {
            promiseMessage.dataset.kind = "success";
            promiseMessage.textContent = "Promise fulfilled with " + users.length + " users.";
        })
        .catch((error) => {
            promiseMessage.dataset.kind = "error";
            promiseMessage.textContent = error.message;
        });
});

promiseFailureButton.addEventListener("click", () => {
    promiseMessage.dataset.kind = "";
    promiseMessage.textContent = "Waiting for the promise…";
    makeUserRequest(true)
        .then((users) => {
            promiseMessage.textContent = "Promise fulfilled with " + users.length + " users.";
        })
        .catch((error) => {
            promiseMessage.dataset.kind = "error";
            promiseMessage.textContent = "Caught rejection: " + error.message;
        });
});

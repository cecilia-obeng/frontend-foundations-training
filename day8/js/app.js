const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";
const userGrid = document.getElementById("userGrid");
const directoryStatus = document.getElementById("directoryStatus");
const userSearch = document.getElementById("userSearch");
const retryButton = document.getElementById("retryButton");
const emptyMessage = document.getElementById("emptyMessage");

let allUsers = [];

const fetchUsers = async () => {
    const response = await fetch(USERS_API_URL);

    if (!response.ok) {
        throw new Error("The user request failed with status " + response.status + ".");
    }

    const users = await response.json();

    if (!Array.isArray(users)) {
        throw new Error("The API returned data in an unexpected format.");
    }

    console.log("Users received from the API:", users);
    return users;
};

const createUserCard = (user) => {
    const card = document.createElement("article");
    card.className = "user-card";

    const avatar = document.createElement("span");
    avatar.className = "user-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = user.name
        .split(" ")
        .map((part) => part.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const name = document.createElement("h3");
    name.textContent = user.name;

    const company = document.createElement("p");
    company.className = "user-company";
    company.textContent = user.company.name;

    const contactDetails = document.createElement("dl");
    contactDetails.className = "contact-details";

    const emailLabel = document.createElement("dt");
    emailLabel.textContent = "Email";
    const emailValue = document.createElement("dd");
    emailValue.textContent = user.email;

    const phoneLabel = document.createElement("dt");
    phoneLabel.textContent = "Phone";
    const phoneValue = document.createElement("dd");
    phoneValue.textContent = user.phone;

    contactDetails.append(emailLabel, emailValue, phoneLabel, phoneValue);
    card.append(avatar, name, company, contactDetails);
    return card;
};

const renderUsers = () => {
    const searchTerm = userSearch.value.trim().toLowerCase();
    const filteredUsers = allUsers.filter((user) => {
        const nameMatches = user.name.toLowerCase().includes(searchTerm);
        const emailMatches = user.email.toLowerCase().includes(searchTerm);
        return nameMatches || emailMatches;
    });

    userGrid.replaceChildren(...filteredUsers.map(createUserCard));

    if (filteredUsers.length === 0) {
        emptyMessage.hidden = false;
        emptyMessage.textContent = searchTerm
            ? "No team members match your search. Try another name or email."
            : "The API did not return any users.";
    } else {
        emptyMessage.hidden = true;
        emptyMessage.textContent = "";
    }

    directoryStatus.textContent = filteredUsers.length + " of " + allUsers.length + " team members shown.";
};

const loadUsers = async () => {
    retryButton.hidden = true;
    retryButton.disabled = true;
    userSearch.disabled = true;
    userGrid.replaceChildren();
    emptyMessage.hidden = true;
    directoryStatus.dataset.kind = "";
    directoryStatus.textContent = "Loading users…";

    try {
        allUsers = await fetchUsers();
        userSearch.disabled = false;
        renderUsers();
    } catch (error) {
        allUsers = [];
        userGrid.replaceChildren();
        emptyMessage.hidden = true;
        directoryStatus.dataset.kind = "error";
        directoryStatus.textContent = error.message + " Check your connection and try again.";
        retryButton.hidden = false;
    } finally {
        retryButton.disabled = false;
    }
};

userSearch.addEventListener("input", renderUsers);
retryButton.addEventListener("click", loadUsers);

loadUsers();

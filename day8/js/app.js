const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

const fetchUsers = async () => {
    const response = await fetch(USERS_API_URL);

    if (!response.ok) {
        throw new Error("The user request failed with status " + response.status + ".");
    }

    const users = await response.json();
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

const renderUsers = (users) => {
    const cards = users.map(createUserCard);
    userGrid.replaceChildren(...cards);
    directoryStatus.textContent = users.length + " team members loaded.";
};

fetchUsers()
    .then((users) => {
        renderUsers(users);
    })
    .catch((error) => {
        console.error("Could not load users:", error);
        directoryStatus.textContent = "Could not load users. Please try again later.";
    });

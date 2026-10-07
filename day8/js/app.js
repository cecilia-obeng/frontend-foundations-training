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

fetchUsers().catch((error) => {
    console.error("Could not load users:", error);
});

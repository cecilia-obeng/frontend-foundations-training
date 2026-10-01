const message = document.getElementById("message");
const changeButton = document.getElementById("changeButton");
const employeeList = document.getElementById("employeeList");
const employees = [];
function renderEmployees() {
    employeeList.innerHTML = "";

    employees.forEach(function (employee, index) {
        const listItem = document.createElement("li");

        listItem.textContent = `${employee.name} - ${employee.performance} `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            employees.splice(index, 1);
            renderEmployees();
        });

        listItem.appendChild(deleteButton);
        employeeList.appendChild(listItem);
    });
}


changeButton.addEventListener("click", function () {
    if (message.textContent === "Welcome to the employee system.") {
        message.textContent = "Employee system is ready!";
    } else {
        message.textContent = "Welcome to the employee system.";
    }
});
const employeeForm = document.getElementById("employeeForm");

employeeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = employeeName.value.trim();
    const score = Number(document.getElementById("employeeScore").value);
const attendance = Number(document.getElementById("employeeAttendance").value);
let performanceResult;

if (score >= 80 && attendance >= 90) {
    performanceResult = "Excellent";
} else if (score >= 70 && attendance >= 75) {
    performanceResult = "Good";
} else if (score >= 50 && attendance >= 60) {
    performanceResult = "Needs Improvement";
} else {
    performanceResult = "Poor";
}


    if (name === "") {
    message.textContent = "Please enter an employee name.";
} else if (score < 0 || score > 100) {
    message.textContent = "Score must be between 0 and 100.";
} else if (attendance < 0 || attendance > 100) {
    message.textContent = "Attendance must be between 0 and 100.";
} else {

    const employee = {
        name: name,
        score: score,
        attendance: attendance,
        performance: performanceResult
    };

    employees.push(employee);
    renderEmployees();

    message.textContent = `Employee: ${name} | Performance: ${performanceResult}`;
};
}

);
// ========================================
// DAY 4 - JAVASCRIPT FUNDAMENTALS
// ========================================


// ========================================
// 1. VARIABLES AND DATA TYPES
// ========================================

const studentName = "Cecilia";
const studentAge = 20;
const isStudent = true;
const emptyValue = null;
let unknownValue;

console.log("Student:", studentName);
console.log("Age:", studentAge);
console.log("Is student:", isStudent);
console.log("Empty value:", emptyValue);
console.log("Unknown value:", unknownValue);

console.log(typeof studentName);
console.log(typeof studentAge);
console.log(typeof isStudent);


// ========================================
// 2. OPERATORS
// ========================================

const numberOne = 10;
const numberTwo = 5;

console.log("Addition:", numberOne + numberTwo);
console.log("Subtraction:", numberOne - numberTwo);
console.log("Multiplication:", numberOne * numberTwo);
console.log("Division:", numberOne / numberTwo);

console.log("Is 10 equal to 5?", numberOne === numberTwo);
console.log("Is 10 greater than 5?", numberOne > numberTwo);


// ========================================
// 3. STRINGS AND TEMPLATE LITERALS
// ========================================

const firstName = "Cecilia";
const lastName = "Obeng";

const fullName = `${firstName} ${lastName}`;

console.log("Full name:", fullName);
console.log("Length:", fullName.length);
console.log("Uppercase:", fullName.toUpperCase());
console.log("Lowercase:", fullName.toLowerCase());
console.log("Contains Cecilia:", fullName.includes("Cecilia"));

const textWithSpaces = "   JavaScript   ";

console.log("Trimmed text:", textWithSpaces.trim());


// ========================================
// 4. ARRAYS
// ========================================

const scores = [
    85,
    72,
    64,
    91,
    48,
    55,
    78,
    83,
    69,
    95
];

console.log("Scores:", scores);
console.log("First score:", scores[0]);

scores.push(88);
console.log("After push:", scores);

scores.pop();
console.log("After pop:", scores);


// ========================================
// CALCULATE TOTAL AND AVERAGE
// ========================================

let totalScore = 0;

for (const score of scores) {
    totalScore += score;
}

const averageScore = totalScore / scores.length;

console.log("Total score:", totalScore);
console.log("Average score:", averageScore);


// ========================================
// 5. EMPLOYEE OBJECT
// ========================================

const employee = {
    name: "Sarah Mensah",
    department: "IT",
    role: "Software Developer",
    active: true
};

console.log(
    `${employee.name} works in the ${employee.department} department as a ${employee.role}.`
);

employee.role = "Senior Software Developer";

console.log("Updated role:", employee.role);


// ========================================
// 6. CONDITIONS
// ========================================

const testScore = 75;

if (testScore >= 80) {
    console.log("Excellent");
} else if (testScore >= 60) {
    console.log("Good");
} else if (testScore >= 50) {
    console.log("Average");
} else {
    console.log("Needs Improvement");
}


// ========================================
// 7. SWITCH
// ========================================

const department = "IT";

switch (department) {
    case "IT":
        console.log("Information Technology");
        break;

    case "HR":
        console.log("Human Resources");
        break;

    case "Finance":
        console.log("Finance Department");
        break;

    default:
        console.log("Unknown department");
}


// ========================================
// 8. FUNCTION - PASS OR FAIL
// ========================================

function checkPassOrFail(score) {
    if (score >= 50) {
        return "Pass";
    }

    return "Fail";
}

console.log("Score result:", checkPassOrFail(75));
console.log("Score result:", checkPassOrFail(40));


// ========================================
// 9. EVEN OR ODD FUNCTION
// ========================================

function checkEvenOrOdd(number) {
    if (number % 2 === 0) {
        return "Even";
    }

    return "Odd";
}

console.log("10 is:", checkEvenOrOdd(10));
console.log("7 is:", checkEvenOrOdd(7));


// ========================================
// 10. LOOP THROUGH NAMES
// ========================================

const names = [
    "Cecilia",
    "Sarah",
    "Daniel",
    "Mary",
    "John"
];

for (let i = 0; i < names.length; i++) {
    console.log(`${i + 1}. ${names[i]}`);
}


// ========================================
// 11. FOR...OF LOOP
// ========================================

for (const name of names) {
    console.log("Employee name:", name);
}


// ========================================
// 12. WHILE LOOP
// ========================================

let count = 1;

while (count <= 5) {
    console.log("Count:", count);
    count++;
}


// ========================================
// 13. ARROW FUNCTION
// ========================================

const calculateTotal = (firstNumber, secondNumber) => {
    return firstNumber + secondNumber;
};

console.log(
    "Arrow function result:",
    calculateTotal(10, 20)
);


// ========================================
// 14. DAY 4 MINI-TASK
// EMPLOYEE PERFORMANCE CHECKER
// ========================================

const employees = [
    {
        name: "Sarah Mensah",
        score: 85
    },
    {
        name: "Daniel Owusu",
        score: 72
    },
    {
        name: "Mary Asante",
        score: 55
    },
    {
        name: "John Mensah",
        score: 43
    },
    {
        name: "Ama Boateng",
        score: 91
    }
];


// Function to determine performance
function getPerformance(score) {

    if (score >= 80 && score <= 100) {
        return "Excellent";
    } else if (score >= 60) {
        return "Good";
    } else if (score >= 50) {
        return "Average";
    } else {
        return "Needs Improvement";
    }
}


// Display employee performance in console
for (const employee of employees) {

    const performance = getPerformance(employee.score);

    console.log(
        `${employee.name} scored ${employee.score} - ${performance}`
    );
}


// ========================================
// 15. DISPLAY RESULTS ON THE WEBPAGE
// ========================================

const showEmployeesButton =
    document.querySelector("#showEmployees");

const employeeResults =
    document.querySelector("#employeeResults");

showEmployeesButton.addEventListener("click", () => {

    employeeResults.innerHTML = "";

    for (const employee of employees) {

        const performance = getPerformance(employee.score);

        const employeeElement = document.createElement("div");

        employeeElement.classList.add("employee");

        employeeElement.textContent =
            `${employee.name} - Score: ${employee.score} - ${performance}`;

        employeeResults.append(employeeElement);
    }
});
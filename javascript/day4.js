console.log("Hello,Javascript!");
const name = "Cecilia";
let age = 20;

console.log(name);
console.log(age);
const studentName = "Cecilia";
const score = 85;
const passed = true;
const middleName = null;

let futureValue;

console.log(typeof studentName);
console.log(typeof score);
console.log(typeof passed);
console.log(typeof middleName);
console.log(typeof futureValue);
const score1 = 80;
const score2 = 70;

console.log(score1 + score2);
console.log(score1 - score2);
console.log(score1 * score2);
console.log(score1 / score2);
const employeeAge = 20;

console.log(employeeAge === 20);
console.log(employeeAge !== 18);
console.log(employeeAge > 18);
console.log(employeeAge < 25);
console.log(employeeAge >= 20);
console.log(employeeAge <= 20);
const employeeScore = 75;
const employeeAttendance = 90;

console.log(employeeScore >= 50 && employeeAttendance >= 75);
console.log(employeeScore >= 50 || employeeAttendance >= 75);
console.log(!(employeeScore < 50));
let points = 10;

points = 20;

points += 5;
console.log(points);

points -= 3;
console.log(points);

points *= 2;
console.log(points);
const Score = 72;

const isPassing = employeeScore >= 50;

console.log("Score:", employeeScore);
console.log("Passing:", isPassing);
const firstName = "Cecilia";
const department = "Information Technology";

console.log(firstName);
console.log(department);
const greeting = "Hello, " + firstName;

console.log(greeting);
const introduction = `My name is ${firstName} and I study ${department}`;

console.log(introduction);
const username = "  Cecilia  ";

console.log(username.length);
console.log(username.toLowerCase());
console.log(username.toUpperCase());
console.log(username.includes("Cecilia"));
console.log(username.trim());
const employeeName = "  Daniel  ";
const employeeDepartment = "Sales";

const cleanName = employeeName.trim();

const employeeMessage = `Employee: ${cleanName}, Department: ${employeeDepartment}`;

console.log(employeeMessage);
const employees = ["Cecilia", "Daniel", "Grace", "Michael"];

console.log(employees);
console.log(employees[0]);
console.log(employees[2]);
const scores = [60, 75, 90];

for (const score of scores) {
    console.log(score);
}
const employee = {
    name: "Cecilia",
    department: "IT",
    score: 78,
    attendance: 85
};

console.log(employee);
const numbers = [10, 20, 30, 40];

const doubledNumbers = numbers.map((number) => {
    return number * 2;
});

console.log(doubledNumbers);
//Employee Performance Checker
const employeeData = {
    name: "Cecilia",
    score:78,
    attendance: 85
};
console.log(employeeData);
//Calculate performance
let performanceResult;

if (employeeData.score >= 80 && employeeData.attendance >= 90) {
    performanceResult = "Excellent";
} else if (employeeData.score >= 70 && employeeData.attendance >= 75) {
    performanceResult = "Good";
} else if (employeeData.score >= 50 && employeeData.attendance >= 60) {
    performanceResult = "Needs Improvement";
} else {
    performanceResult = "Poor";
}
console.log(`Employee: ${employeeData.name}`);
console.log(`Score: ${employeeData.score}`);
console.log(`Attendance: ${employeeData.attendance}%`);
console.log(`Performance: ${performanceResult}`);
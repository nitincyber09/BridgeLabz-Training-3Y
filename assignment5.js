// ASSIGNMENT 5 - JavaScript Functions, Callbacks, Prototypes, and Classes
// Run this complete file using Node.js:
//     node assignment5.js

console.log("========== Q1: CALLBACK FUNCTION ==========");

function showEndMessage() {
    console.log("Welcome to the course!");
}

function greetUser(name, callback) {
    console.log(`Hello ${name}`);
    callback();
}

greetUser("Devid", showEndMessage);


console.log("\n========== Q2: CALLBACK WITH ARRAY OPERATIONS ==========");

function applyOperation(numbers, operation) {
    return numbers.map(operation);
}

const numbers = [1, 2, 3, 4];

const doubledNumbers = applyOperation(numbers, function (number) {
    return number * 2;
});

const squaredNumbers = applyOperation(numbers, function (number) {
    return number * number;
});

console.log("Doubled numbers:", doubledNumbers);
console.log("Squared numbers:", squaredNumbers);


console.log("\n========== Q3: ARROW FUNCTION AND 'this' ==========");

const userWithArrowFunction = {
    name: "Devid",

    // Arrow functions do not create their own 'this'.
    showName: () => {
        console.log("Arrow function this.name:", this.name);
    }
};

userWithArrowFunction.showName(); // In this Node.js file, this.name is undefined.

const userWithNormalFunction = {
    name: "Devid",

    // A normal method gets 'this' from the object calling it.
    showName: function () {
        console.log("Normal function this.name:", this.name);
    }
};

userWithNormalFunction.showName();


console.log("\n========== Q4: CONSTRUCTOR AND PROTOTYPE METHOD ==========");

function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

// This method is stored once on Car.prototype and shared by car objects.
Car.prototype.getDetails = function () {
    console.log(`Car: ${this.brand} ${this.model}`);
};

const car1 = new Car("Toyota", "Fortuner");
const car2 = new Car("Honda", "City");

car1.getDetails();
car2.getDetails();

console.log("Both cars share the same prototype method:",
    car1.getDetails === car2.getDetails);


console.log("\n========== Q5: PERSON -> STUDENT PROTOTYPE INHERITANCE ==========");

function Person(name) {
    this.name = name;
}

Person.prototype.showName = function () {
    console.log("Name:", this.name);
};

function Student(name, branch) {
    Person.call(this, name); // Call Person to initialize the name.
    this.branch = branch;
}

// Link Student.prototype to Person.prototype.
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.showBranch = function () {
    console.log("Branch:", this.branch);
};

const student1 = new Student("Devid", "Computer Science");
student1.showName();
student1.showBranch();

console.log("Student inherits showName:",
    typeof student1.showName === "function");


console.log("\n========== Q6: PERSON -> FACULTY -> PROFESSOR ==========");

function PersonLevel(name) {
    this.name = name;
}

PersonLevel.prototype.introduce = function () {
    console.log("Person name:", this.name);
};

function Faculty(name, department) {
    PersonLevel.call(this, name);
    this.department = department;
}

Faculty.prototype = Object.create(PersonLevel.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.showDepartment = function () {
    console.log("Department:", this.department);
};

function Professor(name, department, subject) {
    Faculty.call(this, name, department);
    this.subject = subject;
}

Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.showSubject = function () {
    console.log("Subject:", this.subject);
};

const professor1 = new Professor(
    "Dr. Sharma",
    "Computer Science",
    "JavaScript"
);

// Professor can access its own method and methods inherited from Faculty and PersonLevel.
professor1.introduce();
professor1.showDepartment();
professor1.showSubject();


console.log("\n========== Q7: CLOSURE / MAKE MULTIPLIER ==========");

function makeMultiplier(multiplier) {
    // The returned function remembers the multiplier variable.
    return function (number) {
        return number * multiplier;
    };
}

const triple = makeMultiplier(3);
const double = makeMultiplier(2);

console.log("Triple of 5:", triple(5)); // 15
console.log("Double of 5:", double(5)); // 10

// Closure: the inner function keeps access to 'multiplier'
// even after makeMultiplier() has finished running.


console.log("\n========== Q8: CUSTOM ARRAY myMap() METHOD ==========");

Array.prototype.myMap = function (callback) {
    const result = [];

    for (let index = 0; index < this.length; index++) {
        // Match map(): skip empty slots in sparse arrays.
        if (Object.prototype.hasOwnProperty.call(this, index)) {
            result[index] = callback(this[index], index, this);
        }
    }

    return result;
};

const originalArray = [1, 2, 3];
const mappedArray = originalArray.myMap(function (number) {
    return number * 2;
});

console.log("Original array:", originalArray);
console.log("Array after myMap():", mappedArray);


console.log("\n========== Q9: PERSON -> STUDENT USING ES6 CLASSES ==========");

class PersonClass {
    constructor(name) {
        this.name = name;
    }

    showName() {
        console.log("Name:", this.name);
    }
}

class StudentClass extends PersonClass {
    constructor(name, branch) {
        super(name); // Calls the parent class constructor.
        this.branch = branch;
    }

    showBranch() {
        console.log("Branch:", this.branch);
    }
}

const studentUsingClass = new StudentClass("Devid", "Computer Science");

studentUsingClass.showName();
studentUsingClass.showBranch();

// The class version provides the same behavior as the prototype version in Q5:
// Student receives the name functionality from Person and adds branch functionality.

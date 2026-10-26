// ASSIGNMENT 3: JavaScript ES Features
// All 10 questions combined into one file.
// Run with Node.js. All results are displayed using console.log().
// "use strict" catches undeclared variables and other unsafe JavaScript behavior.

"use strict";

console.log("========== Q1: DYNAMIC DATA PARSER ==========");
{
  const apiData = ["25", "true", "false", "NaN", "                     ", "100px", "3.14", null, undefined];
  const validNumbers = [];
  const invalidNumbers = [];

  for (let i = 0; i < apiData.length; i++) {
    const value = apiData[i];
    const numberValue = Number(value);
    const booleanValue = Boolean(value);
    const stringValue = String(value);

    // Whitespace-only strings are treated as invalid by this assignment,
    // even though Number("   ") evaluates to 0 in JavaScript.
    const isBlankString = typeof value === "string" && value.trim() === "";
    const isValidNumber = !isBlankString && value !== undefined && value !== null &&
      stringValue.trim() !== "" && !Number.isNaN(numberValue);

    console.log(`Item ${i + 1}: original=${stringValue}, Number=${numberValue}, Boolean=${booleanValue}, String="${stringValue}"`);

    if (isValidNumber) {
      validNumbers.push(numberValue);
    } else {
      invalidNumbers.push({ index: i + 1, value: stringValue, numberResult: numberValue });
      console.log(`  -> INVALID numeric value: "${stringValue}"`);
    }
  }

  console.log("Valid numeric data:", validNumbers);
  console.log("Invalid data:", invalidNumbers);
}

console.log("\n========== Q2: EMPLOYEE BONUS CALCULATOR ==========");
{
  const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" }
  ];

  for (const employee of employees) {
    try {
      if (!employee || !employee.name || employee.salary === undefined || employee.years === undefined) {
        throw new Error("Employee information is missing.");
      }

      const salary = Number(employee.salary);
      const years = Number(employee.years);

      if (!Number.isFinite(salary) || !Number.isFinite(years)) {
        throw new TypeError("Salary or years could not be converted to a valid number.");
      }

      const bonus = years > 3 ? salary * 0.10 : salary * 0.05;
      console.log(`${employee.name}: Salary = ₹${salary.toFixed(2)}, Experience = ${years} years, Bonus = ₹${bonus.toFixed(2)}, Total = ₹${(salary + bonus).toFixed(2)}`);
    } catch (error) {
      console.log(`Employee error: ${error.message}`);
    }
  }
}

console.log("\n========== Q3: TRANSACTION VALIDATOR ==========");
{
  const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
  ];
  const validTransactions = [];
  const invalidTransactions = [];

  for (const transaction of transactions) {
    try {
      if (transaction === null) {
        const error = new Error("Transaction entry is null.");
        error.name = "NullTransactionError";
        throw error;
      }
      if (transaction.id === undefined || transaction.amount === undefined) {
        const error = new Error("Transaction is missing id or amount.");
        error.name = "MissingFieldError";
        throw error;
      }
      if (transaction.amount < 0) {
        const error = new Error("Transaction amount cannot be negative.");
        error.name = "NegativeAmountError";
        throw error;
      }

      validTransactions.push(transaction);
      console.log(`Valid transaction: ID ${transaction.id}, amount ${transaction.amount}`);
    } catch (error) {
      invalidTransactions.push({
        transaction,
        errorType: error.name,
        message: error.message
      });
      console.log(`Invalid transaction: ${error.name} - ${error.message}`);
    }
  }

  console.log("Valid transactions:", validTransactions);
  console.log("Invalid transactions:", invalidTransactions);
  console.log(`Successful: ${validTransactions.length}; Failed: ${invalidTransactions.length}`);
  console.log("Debug tip: Set a breakpoint inside the loop and inspect transaction, validTransactions, and invalidTransactions.");
}

console.log("\n========== Q4: DEBUGGING MYSTERY ==========");
{
  function showMessageBroken() {
    // In strict mode, assigning to undeclared greeting throws ReferenceError.
    try {
      greeting = "Welcome"; // Intentional error demonstration; do not copy as a fix.
      console.log(greeting);
    } catch (error) {
      console.log(`Expected error: ${error.name}: ${error.message}`);
    }
  }

  function showMessageFixed() {
    const greeting = "Welcome"; // Declare the variable in local function scope.
    console.log("Fixed function:", greeting);
  }

  showMessageBroken();
  showMessageFixed();
  console.log("Scope note: const/let/var declarations create declared bindings; strict mode does not allow accidental undeclared globals.");
  console.log("Debug tip: Add greeting to Watch, then step into showMessageFixed() and inspect the Call Stack.");
}

console.log("\n========== Q5: HOISTING LAB ==========");
{
  // var declarations are hoisted and initialized to undefined.
  // Function declarations are hoisted with their function body.
  console.log("var score before assignment:", score);
  announce();
  var score = 50;
  function announce() {
    console.log("Game started");
  }
  console.log("score after assignment:", score);

  // Calling startGame before the let status declaration executes causes a TDZ error.
  try {
    (function demonstrateTDZ() {
      startGame();
      let status = "ready";
      function startGame() {
        console.log(status);
      }
    })();
  } catch (error) {
    console.log(`Expected let temporal-dead-zone error: ${error.name}: ${error.message}`);
  }

  // Fixed version: initialize status before calling the function.
  const status = "ready";
  const startGameFixed = () => console.log("Fixed startGame status:", status);
  startGameFixed();

  // Arrow functions are expressions: they are not hoisted like function declarations.
  const announceArrow = () => console.log("Game started (arrow function)");
  announceArrow();
  console.log("Hoisting note: var is hoisted as undefined; let/const stay in the temporal dead zone until initialized; function declarations can be called before their definition.");
}

console.log("\n========== Q6: PYRAMID PATTERN GENERATOR ==========");
{
  // Default row count is 5. Change this value to choose a different number of rows.
  // In Node.js, this can be replaced with a command-line argument if needed.
  const userInput = Number(process.argv[2]);
  const rows = Number.isInteger(userInput) && userInput > 0 ? userInput : 5;

  console.log(`Pyramid with ${rows} rows:`);
  for (let i = 1; i <= rows; i++) {
    let line = "";
    for (let j = 1; j <= i; j++) {
      line += "* ";
    }
    console.log(line.trimEnd());
  }

  console.log("Debug tip: Step through both loops and watch i (row number), j (column number), and line.");
  console.log("var comparison: Replacing let with var reuses one function-scoped variable instead of creating a block-scoped binding per loop iteration. The simple printed pattern still works, but closures created inside the loop may observe the reused final value.");
  // Strict-mode check: an undeclared loop variable would throw ReferenceError.
  try {
    Function('"use strict"; for (undeclaredLoopIndex = 0; undeclaredLoopIndex < 1; undeclaredLoopIndex++) {}')();
  } catch (error) {
    console.log(`Strict-mode undeclared-loop-variable check: ${error.name}`);
  }
}

console.log("\n========== Q7: SMART CALCULATOR ==========");
{
  const operations = ["add", "divide", "power", "root", "subtract"];
  const num1 = 25;
  const num2 = 0;

  class InvalidOperationError extends Error {
    constructor(operation) {
      super(`Unknown operation: ${operation}`);
      this.name = "InvalidOperationError";
    }
  }

  function calculate(operation, a, b) {
    switch (operation) {
      case "add": return a + b;
      case "divide":
        if (b === 0) throw new RangeError("Cannot divide by zero.");
        return a / b;
      case "power": return a ** b;
      case "root":
        if (a < 0) throw new RangeError("Cannot calculate the real square root of a negative number.");
        return Math.sqrt(a);
      case "subtract": return a - b;
      default: throw new InvalidOperationError(operation);
    }
  }

  for (const operation of operations) {
    try {
      const result = calculate(operation, num1, num2);
      console.log(`${operation.toUpperCase()}: ${num1} and ${num2} => ${result}`);
    } catch (error) {
      console.log(`${operation.toUpperCase()} ERROR: ${error.name} - ${error.message}`);
    }
  }

  // Explicitly demonstrate the negative-root and unknown-operation errors.
  for (const [operation, a, b] of [["root", -9, 0], ["multiply", 25, 2]]) {
    try {
      console.log(`${operation}: ${calculate(operation, a, b)}`);
    } catch (error) {
      console.log(`${operation.toUpperCase()} ERROR: ${error.name} - ${error.message}`);
    }
  }
}

console.log("\n========== Q8: STRICT MODE SHOWDOWN ==========");
{
  // Separate Function constructors isolate the examples so a syntax error
  // in one demonstration does not stop the rest of this assignment.
  try {
    const sloppyDemo = Function("a", "a", `
      total = 10;
      const deleteResult = delete total;
      return { total: typeof total === "undefined" ? "undefined" : total, deleteResult };
    `);
    console.log("Without strict mode:", sloppyDemo(5, 10));
  } catch (error) {
    console.log(`Sloppy-mode result/error: ${error.name}: ${error.message}`);
  }

  try {
    // Duplicate parameter names are a SyntaxError in strict-mode functions.
    Function('"use strict"; return function demo(a, a) { return a; };')();
  } catch (error) {
    console.log(`Strict duplicate-parameter error: ${error.name}: ${error.message}`);
  }

  try {
    Function('"use strict"; total = 10;')();
  } catch (error) {
    console.log(`Strict undeclared-variable error: ${error.name}: ${error.message}`);
  }

  try {
    Function('"use strict"; let total = 10; delete total;')();
  } catch (error) {
    console.log(`Strict delete-identifier error: ${error.name}: ${error.message}`);
  }

  // Correct ES6 version: one parameter name, declared local variable, no delete on a variable.
  function demoFixed(first, second) {
    const total = first + second;
    return { first, second, total };
  }
  console.log("Correct ES6 version:", demoFixed(5, 10));
  console.log("Strict mode prevents duplicate parameter names, accidental globals, and deleting unqualified variable bindings.");
}

console.log("\n========== Q9: JSON AUDIT ==========");
{
  const rawData = [
    '{"user":"Alex","age":25}',
    '{"id":2}',
    '{invalid}',
    '{"user":"Mina","age":"22"}'
  ];
  const cleanData = [];
  const under18Users = [];

  for (let i = 0; i < rawData.length; i++) {
    const lineNumber = i + 1;
    try {
      const parsed = JSON.parse(rawData[i]);

      if (!Object.prototype.hasOwnProperty.call(parsed, "user") ||
          !Object.prototype.hasOwnProperty.call(parsed, "age")) {
        throw new Error("Missing required key: user or age.");
      }

      const age = Number(parsed.age);
      if (!Number.isFinite(age)) {
        throw new TypeError("Age is not a valid number.");
      }

      const cleanRecord = { ...parsed, age };
      cleanData.push(cleanRecord);
      if (age < 18) under18Users.push(cleanRecord);
      console.log(`Line ${lineNumber}: valid JSON record for ${cleanRecord.user}, age ${age}`);
    } catch (error) {
      console.log(`Line ${lineNumber}: ERROR - ${error.name}: ${error.message}`);
    }
  }

  console.log("Clean data:", cleanData);
  console.log("Users under 18:", under18Users);
  console.log("Debug tip: Step through JSON.parse; when an error is thrown, control jumps to catch and then continues with the next loop item.");
}

console.log("\n========== Q10: NESTED HOISTING AND CLOSURES ==========");
{
  function outer() {
    console.log("outer count before assignment:", count);
    var count = 5;

    function inner() {
      // This inner var count is a separate local binding, hoisted as undefined.
      console.log("inner count before assignment:", count);
      var count = 10;
      console.log("inner count after assignment:", count);
    }

    inner();
    console.log("outer count after inner():", count);
  }
  outer();

  // Arrow functions do not create their own `this` or `arguments`, but they still
  // have their own local variables. This arrow's count shadows outer's count too.
  function outerWithArrow() {
    var count = 5;
    const innerArrow = () => {
      console.log("arrow inner count before assignment:", innerCount);
      var innerCount = 10;
      console.log("arrow inner count after assignment:", innerCount);
      console.log("arrow can read outer count:", count);
    };
    innerArrow();
  }
  outerWithArrow();

  console.log("Call stack: outer() calls inner()/innerArrow(); the inner function returns first, then execution continues in outer().");
  console.log("Debug tip: Put breakpoints on each console.log and watch the separate count bindings in Local/Closure scopes.");
}

console.log("\n========== ASSIGNMENT COMPLETE ==========");

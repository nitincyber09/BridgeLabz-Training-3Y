

// Q1. Personalized Login Greeting
{
    const userName = "Devid";
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = `Good Morning ${userName}!`;
    } else if (currentHour <= 17) {
        greeting = `Good Afternoon ${userName}!`;
    } else {
        greeting = `Good Evening ${userName}!`;
    }

    console.log("\nQ1. Personalized Login Greeting");
    console.log(greeting);
}

// Q2. Multi-Type Data Summary
{
    const userName = "Devid";                  // string
    const userAge = 21;                        // number
    const isStudent = true;                    // boolean
    const favoriteSubjects = ["HTML", "CSS"];  // array
    const userProfile = { city: "Meerut" };    // object
    const middleName = null;                   // null
    let optionalValue;                         // undefined

    // typeof [] and typeof null both return "object", so identify them explicitly.
    const dataReport = [
        { label: "userName", value: userName, type: typeof userName },
        { label: "userAge", value: userAge, type: typeof userAge },
        { label: "isStudent", value: isStudent, type: typeof isStudent },
        {
            label: "favoriteSubjects",
            value: JSON.stringify(favoriteSubjects),
            type: Array.isArray(favoriteSubjects) ? "array" : typeof favoriteSubjects
        },
        { label: "userProfile", value: JSON.stringify(userProfile), type: typeof userProfile },
        { label: "middleName", value: middleName, type: middleName === null ? "null" : typeof middleName },
        { label: "optionalValue", value: String(optionalValue), type: typeof optionalValue }
    ];

    console.log("\nQ2. Multi-Type Data Summary");
    console.table(dataReport);
}

// Q3. Monthly Expense Tracker
{
    const expenses = {
        food: 4500,
        travel: 1200,
        rent: 8000,
        bills: 1500,
        leisure: 1000
    };

    let totalBeforeTax = 0;
    for (const category in expenses) {
        totalBeforeTax += expenses[category];
    }

    const average = totalBeforeTax / Object.keys(expenses).length;
    const taxAmount = totalBeforeTax * 0.10;
    let finalTotal = totalBeforeTax;
    finalTotal += taxAmount;

    console.log("\nQ3. Monthly Expense Tracker");
    console.log(`Total before tax: ₹${totalBeforeTax.toFixed(2)}`);
    console.log(`Average expense: ₹${average.toFixed(2)}`);
    console.log(`Tax (10%): ₹${taxAmount.toFixed(2)}`);
    console.log(`Final amount after tax: ₹${finalTotal.toFixed(2)}`);
}

// Q4. Academic Performance Evaluator
{
    const marks = [88, 91, 84, 86, 90]; // Five subject marks, each out of 100.
    const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
    const average = totalMarks / marks.length;
    const percentage = (totalMarks / (marks.length * 100)) * 100;
    const failedSubject = marks.some(mark => mark < 35);

    console.log("\nQ4. Academic Performance Evaluator");
    console.log(`Marks: ${marks.join(", ")}`);
    console.log(`Average: ${average.toFixed(2)}`);
    console.log(`Percentage: ${percentage.toFixed(2)}%`);

    if (failedSubject) {
        console.log("Detained");
    } else if (percentage >= 85) {
        console.log("Promoted with Distinction");
    } else if (percentage >= 50) {
        console.log("Promoted");
    } else {
        console.log("Detained");
    }
}

// Q5. Weather Activity Planner
{
    const temperature = 28;
    const isRaining = false;
    const windSpeed = 12;

    console.log("\nQ5. Weather Activity Planner");

    if (isRaining) {
        console.log("Stay indoors with hot coffee.");
    } else if (temperature > 35) {
        console.log("Go swimming.");
    } else if (temperature < 15 && windSpeed > 20) {
        console.log("Too cold and windy — stay home.");
    } else if (!isRaining && temperature >= 15 && temperature <= 35 && windSpeed <= 20) {
        console.log("Perfect day for a walk.");
    } else {
        console.log("Choose an indoor activity if the weather is uncomfortable.");
    }
}

// Q6. Progressive Discount System
{
    const purchaseTotal = 6500;
    let discountRate;

    if (purchaseTotal >= 10000) {
        discountRate = 0.25;
    } else if (purchaseTotal >= 5000) {
        discountRate = 0.15;
    } else if (purchaseTotal >= 2000) {
        discountRate = 0.05;
    } else {
        discountRate = 0;
    }

    const discountAmount = purchaseTotal * discountRate;
    const finalPrice = Math.round(purchaseTotal - discountAmount);

    console.log("\nQ6. Progressive Discount System");
    console.log(`Original total: ₹${purchaseTotal.toFixed(2)}`);
    console.log(`Discount percentage: ${discountRate * 100}%`);
    console.log(`Discount amount: ₹${discountAmount.toFixed(2)}`);
    console.log(`Final price after discount: ₹${finalPrice}`);
}

// Q7. Smart Guessing Game
{
    const secretNumber = Math.floor(Math.random() * 50) + 1;
    const userGuess = 25; // Change this test value to try other guesses.

    console.log("\nQ7. Smart Guessing Game");
    console.log(`Secret number (for testing): ${secretNumber}`);
    console.log(`Your guess: ${userGuess}`);

    if (userGuess === secretNumber) {
        console.log("Correct guess!");
    } else {
        const difference = Math.abs(userGuess - secretNumber);

        if (difference <= 3) {
            console.log("Very close!");
        } else if (userGuess > secretNumber) {
            console.log("Too high");
        } else {
            console.log("Too low");
        }
    }
}

// Q8. Employee Salary Projection
{
    const currentSalary = 30000;
    const annualIncrementRate = 8;
    let projectedSalary = currentSalary;
    const salaryReport = [];

    for (let year = 1; year <= 5; year++) {
        projectedSalary *= 1 + annualIncrementRate / 100;
        projectedSalary = Math.round(projectedSalary);

        salaryReport.push({
            Year: year,
            Salary: `₹${projectedSalary.toFixed(2)}`
        });
    }

    console.log("\nQ8. Employee Salary Projection");
    console.table(salaryReport);
}

// Q9. Random Math Quiz Generator
{
    const firstNumber = Math.floor(Math.random() * 20) + 1;
    const secondNumber = Math.floor(Math.random() * 20) + 1;
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let correctAnswer;

    switch (operator) {
        case "+":
            correctAnswer = firstNumber + secondNumber;
            break;
        case "-":
            correctAnswer = firstNumber - secondNumber;
            break;
        case "*":
            correctAnswer = firstNumber * secondNumber;
            break;
        case "/":
            correctAnswer = firstNumber / secondNumber;
            break;
        default:
            throw new Error("Unsupported operator");
    }

    const formattedAnswer = operator === "/" ? correctAnswer.toFixed(2) : correctAnswer;

    console.log("\nQ9. Random Math Quiz Generator");
    console.log(`Question: ${firstNumber} ${operator} ${secondNumber} = ?`);
    console.log(`Correct answer: ${formattedAnswer}`);
}

// Q10. Citizen Eligibility Validator
{
    const age = 19;
    const isCitizen = true;

    console.log("\nQ10. Citizen Eligibility Validator");

    /*
      Note: The assignment's first condition ("citizen and age >= 18")
      overlaps with "citizen and age 18–20". This solution gives priority
      to the first condition as it appears first in the assignment.
    */
    if (isCitizen) {
        if (age >= 18) {
            console.log("Eligible for all services.");
        } else {
            console.log("Not eligible yet.");
        }
    } else if (age >= 18) {
        console.log("Only age criteria met.");
    } else {
        console.log("Not eligible yet.");
    }
}

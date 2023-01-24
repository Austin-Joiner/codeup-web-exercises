"use strict";

/* ########################################################################## */

/**
 * TODO:
 * Create a function named `analyzeColor` that accepts a string that is a color
 * name as input. This function should return a message which relates to the
 * color stated in the argument of the function. For colors you do not have
 * responses written for, return a string stating so
 *
 * Example:
 *  > analyzeColor('blue') // returns "blue is the color of the sky"
 *  > analyzeColor('red') // returns "Strawberries are red"
 *
 *
 *
 *  > analyzeColor('cyan') // returns "I don't know anything about cyan"
 *
 * You should use an if-else-if-else block to return different messages.
 *
 * Test your function by passing various string literals to it and
 * console.logging the function's return value
 */

   /* function analyzeColor(color) {
        if (color.toLocaleLowerCase().replace("."," ").trim() === "red") {
            alert("WOW! Red is my favorite color.");
        } else if (color.toLocaleLowerCase().replace("."," ").trim() === "blue") {
            alert("Blue, that is the same color as sky");
        } else if (color.toLocaleLowerCase().replace("."," ").trim() === "brown") {
            alert("Brown, that is the same color as mud");
        } else if (color.toLocaleLowerCase().replace("."," ").trim() === "green") {
            alert("green, that is the same color as grass");
        } else {
            alert("Sorry that is not in my database.");
        }
    }    */

// Don't change the next two lines!
// These lines create two variables for you:
// - `colors`: a list of the colors of the rainbow
// - `randomColor`: contains a single random color value from the list (this
//                  will contain a different color every time the page loads)
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
var randomColor = colors[Math.floor(Math.random() * colors.length)];
/**
 * TODO:
 * Pass the `randomColor` variable to your 'analyzeColor' function and console.log the results.
 * You should see a different message every time you refresh the page
 */

    //console.log(analyzeColor(randomColor))

/**
 * TODO:
 * Comment out the code above, and refactor your function to use a switch-case statement
 */

/*function analyzeColor(color) {

    switch (color.toLocaleLowerCase().replace(".", " ").trim()) {
        case "red":
            alert("WOW! Red is my favorite color.");
            break;
        case "blue":
            alert("Blue, that is the same color as sky");
            break;
        case "brown":
            alert("Brown, that is the same color as mud");
            break;
        case "green":
            alert("green, that is the same color as grass");
            break;
        default:
            alert("Sorry that is not in my database.");
            break;
    }
} */

/**
 * TODO:
 * Prompt the user for a color when the page loads, and pass the input from the
 * user to your `analyzeColor` function. Alert the return value from your
 * function to show it to the user.
 */
    var userColor = prompt("Type a color in to the box.");

function analyzeColor(color) {
    switch (color.toLocaleLowerCase().replace(".", " ").trim()) {
        case "red":
            alert("WOW! Red is my favorite color.");
            return "WOW! Red is my favorite color.";
            break;
        case "blue":
            alert("Blue, that is the same color as sky");
            return "Blue, that is the same color as sky";
            break;
        case "brown":
            alert("Brown, that is the same color as mud");
            return "Brown, that is the same color as mud";
            break;
        case "green":
            alert("green, that is the same color as grass");
            return "green, that is the same color as grass";
            break;
        default:
            alert("Sorry that is not in my database.");
            return "Sorry that is not in my database.";
            break;
    }
}

 var userColorTest = analyzeColor(userColor);
console.log(userColorTest);

/* ########################################################################## */

/**
 * TODO:
 * Suppose there's a promotion in Walmart, each customer is given a randomly
 * generated "lucky number" between 0 and 5. If your lucky number is 0 you have
 * no discount, if your lucky number is 1 you'll get a 10% discount, if it's 2,
 * the discount is 25%, if it's 3, 35%, if it's 4, 50%, and if it's 5 you'll get
 * everything for free!.
 *
 * Write a function named `calculateTotal` which accepts a lucky number and total
 * amount, and returns the discounted price.
 *
 * Example:
 * calculateTotal(0, 100) // returns 100
 * calculateTotal(4, 100) // returns 50
 * calculateTotal(5, 100) // returns 0
 *
 * Test your function by passing it various values and checking for the expected
 * return value.
 */


    function calculateTotal (lucky,total) {
        alert("Your Lucky Number is " + lucky);
        if (lucky === 0) {
           var discountZero = 0 * total;
            alert("your total before discount is " + total + "$.")
            alert("sadly, you got " + discountZero + "$ off your total today. Sorry.");
            return alert("Making your total remain " + (total - discountZero) + "$.");
        } else if (lucky === 1) {
            var discountOne = .1 * total;
            alert("your total before discount is " + total + "$.")
            alert("You got " + discountOne + "$ off your total today.");
            return alert("Making your total " + discountOne + "$.");
        } else if (lucky === 2) {
            var discountTwo = .25 * total;
            alert("your total before discount is " + total + "$.")
            alert("You got " + discountTwo + "$ off your total today.");
            return alert("Making your total " + (total - discountTwo) + "$.");
        } else if (lucky === 3) {
            var discountThree = .35 * total;
            alert("your total before discount is " + total + "$.")
            alert("You got " + discountThree + "$ off your total today.");
            return alert("Making your total " + (total - discountThree) + "$.");
        } else if (lucky === 4) {
            var discountFour = .5 * total;
            alert("your total before discount is " + total + "$.")
            alert("You got " + discountFour + "$ off your total today.");
            return alert("Making your total " + (total - discountFour) + "$.");
        } else if (lucky === 5) {
            var discountFive = 1 * total;
            alert("your total before discount is " + total + "$.")
            alert("WOW! You got " + discountFive + "$ off your total today. Good Job!");
            return alert("Making your total " + (total - discountFive) + "$. Its Free!");
        } else {
            alert("This is an invalid lucky number.");
        }

}
/**
 * TODO:
 * Uncomment the line below to generate a random number between 0 and 5.
 * (In this line of code, 0 is inclusive, and 6 is exclusive)
 * Prompt the user for their total bill, then use your `calculateTotal` function
 * and alerts to display to the user what their lucky number was, what their
 * price before the discount was, and what their price after the discount is.
 */
 //Generate a random number between 0 and 6
 var luckyNumber = Math.floor(Math.random() * 6);

 var totalRequest = prompt("Hello welcome to Walmart. What was your total bill today");
 var discountScan = calculateTotal(luckyNumber, totalRequest);


/**
 * TODO:
 * Write some JavaScript that uses a `confirm` dialog to ask the user if they
 * would like to enter a number. If they click 'Ok', prompt the user for a
 * number, then use 3 separate alerts to tell the user:
 *
 * - whether the number is even or odd
 * - what the number plus 100 is
 * - if the number is negative or positive
 *
 * Do *NOT* display any of the above information
 * if the user enters a value that is not of the number data type.
 * Instead, use an alert to inform them of the incorrect input data type.
 *
 *
 * Can you refactor your code to use functions?
 * HINT: The way we prompt for a value could be improved
 */
    var numberGame = confirm("Would you like to enter a number?");
    var gameOn = gameConfirm();
        function gameConfirm(answer) {
            if (numberGame == true) {
                alert("YAY! Lets get ready!");
            } else {
               return alert("okay thanks for coming.");
            }
            do {
                alert("Be sure to enter in a number. Whole numbers will be the only numbers that is accepted. IF YOU SEE THIS AGAIN IT MEANS YOU DIDN'T TYPE A NUMBER IN CORRECTLY.")
                var promptTest = prompt("Type in a number.");
            }
            while (isNaN(parseFloat(promptTest)));

            numberFacts(promptTest);
        }

        function numberFacts(number) {

        alert(100 + parseInt(number));
        console.log(100 + number);
        if (number % 2 === 0) {     //
            alert("Your number is even.");
            console.log(number + " is even.");
        } else {
            alert("Your number is odd.");
            console.log(number + " is odd.");
        }

        if (number > 0.0) {
            alert("Your number is positive.");
            return "The " + number + " is a positive number.";
        } else if (number < 0.0) {
            alert("Your number is negative.");
            return "The " + number + " is a negative number.";
        } else {
            alert("Your number is neither positive nor negative.");
            return "The " + number + " is neither positive nor negative.";
        }

}













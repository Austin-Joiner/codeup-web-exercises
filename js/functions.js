"use strict";

/**
 * TODO:
 * Create a function called 'sayHello' that takes a parameter 'name'.
 * When called, the function should return a message that says hello to the passed in name.
 *
 * Example
 * > sayHello("codeup") // returns "Hello, codeup!"
 */
    alert("Welcome to my Website!");

    function sayHello(name) {     // (name) is parameter
        alert("Hello, " + name + "!");
        return "Hello, " + name + "!";
    }



/**
 * TODO:
 * Call the function 'sayHello' and pass your name as a string literal argument.
 * Store the result of the function call in a variable named 'helloMessage'.
 *
 * console.log 'helloMessage' to check your work
 */

var helloMessage = sayHello('Austin Joiner'); // austin joiner is argument.
console.log(helloMessage);




/**
 * TODO:
 * Store your name as a string in a variable named 'myName', and pass that
 * variable to the 'sayHello' function. You should see the same output in the
 * console.
 */
var myName = "Austin Joiner"
sayHello(myName);
console.log(sayHello(myName));
// Don't modify the following line, it generates a random number between 1 and 3
// and stores it in a variable named random
var random = Math.floor((Math.random() * 3) + 1);

/**
 * TODO:
 * Create a function called 'isTwo' that takes a number as a parameter.
 * The function should return a boolean value based on whether or not the passed
 * number is the number 2.
 *
 * Example
 * > isTwo(1) // returns false
 * > isTwo(2) // returns true
 * > isTwo(3) // returns false
 *
 * Call the function 'isTwo' passing the variable 'random' as a argument.
 *
 * console.log *outside of the function* to check your work (you should see a
 * different result everytime you refresh the page if you are using the random
 * number)
 */
    function isTwo(number) {
       return 2 === (number);
}
    isTwo(random);

    console.log(isTwo(random));

/**
 * TODO:
 * Create a function named 'calculateTip' to calculate a tip on a bill at a
 * restaurant. The function should accept a tip percentage and the total of the
 * bill, and return the amount to tip
 *
 * Examples:
 * > calculateTip(0.20, 20) // returns 4
 * > calculateTip(0.25, 25.50) // returns 6.375
 * > calculateTip(0.15, 33.42) // returns 5.013
 */
    function calculateTip(tip,total) {
        var tipAmount = tip * total;
        if (tipAmount >= total) {
            alert("WOW. Thank you for the Big tip.");
            return tipAmount;
        } else if (tipAmount <= 0) {
            alert("Rude!");
            return tipAmount;
        } else {
        alert("Thank you for the tip.");
        return tipAmount;

    }
    }

/**
 * TODO:
 * Use prompt and alert in combination with your calculateTip function to
 * prompt the user for the bill total and a percentage they would like to tip,
 * then display the dollar amount they should tip
 */
    var userTotal = prompt("What was the total amount of the bill?");
    var userTip = prompt("What percent Would you like to tip?(use a decimal unless you want to tip me really big.)");
    var userTipResult = alert(calculateTip(userTip,userTotal));

    /**
 * TODO:
 * Create a function named `applyDiscount`. This function should accept a price
 * (before a discount is applied), and a discount percentage (a number between 0
 * and 1). It should return the result of applying the discount to the original
 * price.
 *
 * Example:
 * > var originalPrice = 100;
 * > var discountPercent = .2; // 20%
 * > applyDiscount(originalPrice, discountPercent) // 80
 *
 * > applyDiscount(45.99, 0.12) // 40.4712
 */

    function  applyDiscount(price,discount) {
        discount = Math.min(discount, 1);
        discount = Math.max(discount, 0);
        var difference = price * discount;
        var discountApplied = price - difference;
        return discountApplied;
    }
    var testDiscount = applyDiscount(100, 2); // 0   Should correct any number over 1 or under 0.



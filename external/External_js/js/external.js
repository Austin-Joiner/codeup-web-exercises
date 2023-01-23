"use strict"
console.log("Hello from external JavaScript.");

alert("Welcome to my Website!");
alert("answer the following questions!");
    var userColor = prompt("What is your favorite color?");
        alert("WOW! " + (userColor) + " is my favorite color too.");

    var questionOne = prompt("You have rented some movies for your kids: The little mermaid (for 3 days), Brother Bear (for 5 days, they love it), and Hercules (1 day, you don't know yet if they're going to like it). If price for a movie per day is $3, how much will you have to pay?");
        if (questionOne == 27) {
            alert("you are correct.");
        } else {
            alert("you are wrong. The answer is 27.");
        }

    var questionTwo = prompt("Suppose you're working as a contractor for 3 companies: Google, Amazon and Facebook, they pay you a different rate per hour. Google pays $400, Amazon $380, and Facebook $350. You worked 10 hours for Facebook, 6 hours for Google and 4 hours for Amazon. How much will you receive in payment for this week?");
        if (questionTwo ==7420) {
            alert("you are correct.")
        } else {
            alert("you are wrong. The answer is 7420.");
        }

    var questionThree = alert("A student can be enrolled in a class only if the class is not full and the class schedule does not conflict with her current schedule. answer the following questions about the student?");
        alert("Can this student be in the following class if they are busy at 1 PM.")


// just some fun code.
       /* var classLimit = 100;
        var classCurrent = 90;
        var classNotFull = classLimit > classCurrent;
        var classTime = "8:00 AM - 9:00 AM";

        var studentIsBusy = "1 PM";

        var canStudentEnroll = classNotFull && ((studentIsBusy.substring(2, 4) !== classTime.substring(5, 7)) || (parseInt(classTime) !== parseInt(studentIsBusy))); */



       var questionThreeCheck = confirm("can the student do a class at 8:00 AM-9:00 AM, that has 90 students in it with 100 student capacity?");

        if (questionThreeCheck === true) {
            alert("you are correct.");
        } else {
            alert("you are wrong. The answer is true.");
        }

    var questionFour = alert("A product offer can be applied only if a person buys more than 2 items, and the offer has not expired. Premium members do not need to buy a specific amount of products.");
        alert("so lets see. Susan has a premium membership.");
        alert("Susan has 43 items in her cart.");
        alert("Susans coupon is expired.");

       var questionFourCheck = confirm("can Susan get her offer?");

            if (questionFourCheck == false) {
                alert("you are correct.");
            } else {
                alert("you are wrong. The answer is false.");
            }
     alert("Thank you for playing along!");
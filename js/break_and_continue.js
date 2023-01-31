"use strict";



    var startTest = breakContinue();
    //var userInput = parseInt(prompt("Pick an odd number."));


function breakContinue() {
    var userInput = parseInt(prompt("Pick an odd number, between 1 - 50."));



    while (userInput % 2 === 0 || userInput < 1 || userInput > 50 || isNaN(userInput)) {

        if (false) {
        break;
        }
        userInput = parseInt(prompt("I said pick a odd number, 1-50, you chose " + userInput + "."));
    }




    alert("Good Job! " + userInput + " is an odd number.");
    console.log(userInput + " is the number to skip.");
    for (var i = 1; i <= 50; i++) {

        if (i % 2 === 0) {
            continue;
        } else if (userInput === i) {
            console.log("WOAH! Skipping number: " + userInput);
            continue;
        }
        console.log("Here is an odd number: " + i);

    }
}

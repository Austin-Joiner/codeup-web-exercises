"use strict";





    var startTest = breakContinue();

function breakContinue() {
    var userInput = parseInt(prompt("Pick an odd number."));
    while (!userInput || userInput % 2 === 0 || (userInput < 1 || userInput > 50)) {

        if ((userInput % 2 !== 0) && (userInput >= 1 && userInput < 50)) {
          console.log(userInput + " that is an odd number good job.");
            alert(userInput + " that is an odd number good job.");

            break;
        }
        console.log(userInput + " that is an even number try again.");
    }
    for (var i = 1; i <= 50; i++) {

        if (i % 2 === 0) {
            continue;
        } else if (userInput === false) {
            continue;

        }
        console.log(i + " is an odd number.");
    }
}

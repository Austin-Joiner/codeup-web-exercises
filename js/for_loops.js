"use strict";

function showMultiplicationTable(number) {
    for (var i = 1; i <= 10; i++) {
        var result = number * i;
        console.log(number + " x " + i + " = " + result);
    }
}

// Math.floor()    takes a number and rounds down useful for random number in case of a decimal.
// Math.random() gives a random number between 0 and 1 ex: .23412451
//Math.min   ?
//Math.max   ?
function numberGenCheck() {
    for (var i = 1; i <= 10; i++) {    // will increment up  to 10 giving me ten values.   i++ is the same as i = i + 1
        var result = Math.floor(Math.random() * (200 - 20) + 20); // this will randomize those 10 values between 20-200.
        if (result % 2 === 0) { // checking if it is even.
            console.log(result + " is even.");
        } else {                // otherwise it is odd.
            console.log(result + " is odd.");   // var exTernary = (result % 2 === 0) ? console.log(result + " is even.") : console.log(result + " is odd.");
        }
    }
}

function concatenationNumbers() {
    for (var i = 1; i <= 9; i++) {
        var concatNumber = ""; // not sure how 100% but the var a is going in to this var making a string of "" for 1, 2,33,444,5555.
        //console.log(concatNumber);
        //console.log(i);
        for (var a = 1; a <= i; a++) { // keeps repeating til it matches i ex 1 = 3 a will go 1 2 3.
            // console.log(a);
            //console.log(concatNumber);
            concatNumber = i + concatNumber; // so here we are essentially matching a as a string + i. both incrementing.
        }
        console.log(concatNumber)
    }
}
function CountdownFive() {
    for (var i = 100; i >= 5; i -= 5) { //countdown from 100 by 5 until it equals 5.
        console.log(i);
    }
}



















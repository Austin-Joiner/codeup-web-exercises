"use strict";

console.log("one message will pop up from internal JS then external will pop up next.");
console.log("now lets add a confirm and a prompt next.");

alert("RUN Forest RUN");
var trueConfirm = confirm("Do you like to Code?");
var userInput = prompt("Please enter name");
console.log("The user entered: " + userInput);
var haveLunch = confirm("did you eat lunch yet?");
    if (haveLunch === false) {
       location.href = "https://www.grubhub.com/";
       console.log((userInput) + (" did not have lunch yet, so ") + (userInput) + (" has been sent to grubhub."));
    } else {
        alert("I hope it was good!");
        console.log(userInput + " has already had lunch.");
    }

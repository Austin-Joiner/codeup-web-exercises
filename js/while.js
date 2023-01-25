"use strict";


function whileLoop() {
    var newNumber = 2
    while (newNumber <= 65536) {
        console.log(newNumber);
        newNumber = newNumber * 2;

    }

    console.log("finished.");
}




var conesInventory = Math.floor(Math.random() * 50) + 50;

function doWhileLoop() {
    var conesSold = 0;
    console.log("I have a total of " + conesInventory + " cones to sell.");
    do {
        var conesBought = Math.floor(Math.random() * 5) + 1;

        if(conesInventory - conesBought < 0) {
            console.log("I am sorry you wanted " + conesBought + " cones and I only have " + conesInventory + ".");
            continue;
        }

        conesSold = conesSold + conesBought;//action
        conesInventory -= conesBought;
        console.log("I just sold " + conesBought + " cones. I have sold a total of " + conesSold + " cones. I have " + conesInventory + " left.");

    } while (conesInventory > 0);// requirements that need to be met to start loop ---- true means run loop ---- false means end loop.
    console.log("All my cones have been sold!");
}




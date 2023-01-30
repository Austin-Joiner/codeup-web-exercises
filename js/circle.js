(function(radius) {
    "use strict";

    // create a circle object
    var circle = {
        radius: 3,

        getArea: function (radius) {
            // TODO: complete this method
            // hint: area = pi * radius^2
            var result = Math.pow(radius,2);
            var areaCircle = Math.PI * result;
            return areaCircle; // TODO: return the proper value
        },

        logInfo: function (doRounding) {
            // TODO: complete this method.
            if (doRounding - parseInt(doRounding) >= doRounding - doRounding + .5) {
                return Math.round(doRounding);
            } else {
                return doRounding;
            }
            // If doRounding is true, round the result to the nearest integer.
            // Otherwise, output the complete value

            console.log("Area of a circle with radius: " + this.radius + ", is: " + this.getArea(this.radius));
        }
    };

    // log info about the circle
    console.log("The radius of the circle is " + circle.radius + ".");
    circle.logInfo(false);
    console.log(circle.logInfo(circle.getArea(circle.radius)) + " is the area of the circle.");
    circle.logInfo(true);

    console.log("=======================================================");
    // TODO: Change the radius of the circle to 5.

    // log info about the circle
    circle.radius = 5;
    console.log("The radius of the circle is " + (circle.radius) + ".");
    circle.logInfo(false);
    console.log(circle.logInfo(circle.getArea(circle.radius)) + " is the area of the circle.");
    circle.logInfo(true);
})();
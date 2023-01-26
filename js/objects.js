(function() {
    "use strict";

    /**
     * TODO:
     * Create an object with firstName and lastName properties that are strings
     * with your first and last name. Store this object in a variable named
     * `person`.
     *
     * Example:
     *  > console.log(person.firstName) // "Rick"
     *  > console.log(person.lastName) // "Sanchez"
     */


    var person = {
        first: "Austin",
        last: "Joiner",



};

    console.log(person.first);
    console.log(person.last);

    /**
     * TODO:
     * Add a sayHello method to the person object that returns a greeting using
     * the firstName and lastName properties.
     * console.log the returned message to check your work
     *
     * Example
     * > console.log(person.sayHello()) // "Hello from Rick Sanchez!"
     */

    var person = {};

    person.first = "Austin";
    person.last = "Joiner";


    person.fullName = function () {
        console.log("Hello from " + this.first + " " + this.last + "!");
    };
    person.fullName();

    /** TODO:
     * HEB has an offer for the shoppers that buy products amounting to
     * more than $200. If a shopper spends more than $200, they get a 12%
     * discount. Write a JS program, using conditionals, that logs to the
     * browser, how much Ryan, Cameron and George need to pay. We know that
     * Cameron bought $180, Ryan $250 and George $320. Your program will have to
     * display a line with the name of the person, the amount before the
     * discount, the discount, if any, and the amount after the discount.
     *
     * Uncomment the lines below to create an array of objects where each object
     * represents one shopper. Use a foreach loop to iterate through the array,
     * and console.log the relevant messages for each person
     */

    var shoppers = [
        {name: 'Cameron', amount: 180},
        {name: 'Ryan', amount: 250},
        {name: 'George', amount: 320}
    ];

   function discountCalculator (total) {

       shoppers.forEach(function(callOut) {
           if (callOut.amount > 200) {  // callOut.amount is how you call this function not shoppers.amount!
               var discount = callOut.amount * .12;
               var discountedPrice = callOut.amount - discount;
           console.log("Hi! " + callOut.name + " Your total today is " + callOut.amount + "$. Your discount today is " + discount.toFixed(2) + "$. Bringing you the amount you owe to " + discountedPrice.toFixed(2) + "$. Thank you for shopping with us today.");
       } else {
           console.log("Hi! " + callOut.name + " Your total today is " + callOut.amount + "$. You will have no discount because you didnt spend over 200$. Which means your price stays at a total of " + callOut.amount + "$. Thank you for shopping with us today.");// this line left cant use var in if statements.
       }
        });
   };


    /** TODO:
     * Create an array of objects that represent books and store it in a
     * variable named `books`. Each object should have a title and an author
     * property. The author property should be an object with properties
     * `firstName` and `lastName`. Be creative and add at least 5 books to the
     * array
     *
     * Example:
     * > console.log(books[0].title) // "The Salmon of Doubt"
     * > console.log(books[0].author.firstName) // "Douglas"
     * > console.log(books[0].author.lastName) // "Adams"
     */
    var books = [
            {title:"The Art of Loyalty", author: {firstName:"Benedict", lastName:"Arnold"}},
            {title:"Common Cents", author: {firstName:"Thomas", lastName:"Lincoln"}},
            {title:"The Little Giant", author: {firstName:"Peter", lastName:"Dinklage"}},
            {title:"Bonds of Family", author: {firstName:"Jaime", lastName:"Lannister"}},
            {title:"Don\'t Lose Your Head", author: {firstName:"Ned", lastName:"Stark"}}
        ];


    /**
     * TODO:
     * Loop through the books array and output the following information about
     * each book:
     * - the book number (use the index of the book in the array)
     * - the book title
     * - author's full name (first name + last name)
     *
     * Example Console Output:
     *
     *      Book # 1
     *      Title: The Salmon of Doubt
     *      Author: Douglas Adams
     *      ---
     *      Book # 2
     *      Title: Walkaway
     *      Author: Cory Doctorow
     *      ---
     *      Book # 3
     *      Title: A Brief History of Time
     *      Author: Stephen Hawking
     *      ---
     *      ...
     */

    books.forEach(function(bookInfo) {

        console.log("Book #" + (books.indexOf(bookInfo) + 1) + "\n" + "Title: " + bookInfo.title + "\n" + "Author: " + bookInfo.author.firstName + " " + bookInfo.author.lastName  + "\n---");
    }); // book.indexOf(bookInfo) gives you the index of the books since books up top can not be pulled by the function. Why?

    /**
     * Bonus:
     * - Create a function named `createBook` that accepts a title and author
     *   name and returns a book object with the properties described
     *   previously. Refactor your code that creates the books array to instead
     *   use your function.
     * - Create a function named `showBookInfo` that accepts a book object and
     *   outputs the information described above. Refactor your loop to use your
     *   `showBookInfo` function.
     */
    function createBook (title, first, last) {
        return {
            title: title,
            author: {
                firstName: first,
                lastName: last
            }
        }
    }
    var books = [

        createBook("The Art of Loyalty", "Benedict", "Arnold"),
        createBook("Common Cents", "Thomas", "Arnold"),
        createBook("The Little Giant", "Peter", "Dinklage"),
        createBook("Bonds of Family", "Jaime", "Lannister"),
        createBook("Don\'t Lose Your Head", "Ned", "Stark")

    ];






})();
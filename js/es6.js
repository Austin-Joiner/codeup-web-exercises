/*
  Complete the TODO items below
 */
const users = [
    {
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash']
    },
    {
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript']
    },
    {
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php']
    },
    {
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql']
    },
    {
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php']
    }
];

// TODO: fill in your name and email and add some programming languages you know
// TODO: replace the `var` keyword with `const`, then try to reassign a variable
// declared as `const` this create a variables that i can push up later in the array of objects
const name = 'Austin';
const email = 'austin@codeup.com';
const languages = ["HTML", "JS", "CSS"];

//var name = 'john'

// TODO: rewrite the object literal using object property shorthand
// users.push({
//     name: name,
//     email: email,
//     languages: languages
// });


// this is pulling the const that i made above and pushing it into the array of objects to the back.
users.push({
    name,
    email,
    languages
});



// TODO: replace `var` with `let` in the following variable declarations

let emails = [];
let names = [];

// TODO: rewrite the following using arrow functions
// users.forEach(function(user) {
//     return emails.push(user.email);
// });

// this is just the new es6 way of writing called a short-handed function
// this was not needed however for the outcome of this exercise
users.forEach(user => emails.push(user.email));




// users.forEach(function(user) {
//     return names.push(user.name);
// });

// this was not needed however for the outcome of this exercise
users.forEach(user => names.push(user.name));

// TODO: replace `var` with `let` in the following declaration
let developers = [];


users.forEach(function(user) {
    // TODO: rewrite the code below to use object destructuring assignment
    //       note that you can also use destructuring assignment in the function
    //       parameter definition
    // const name = user.name;
    // const email = user.email;
    // const languages = user.languages;

    // const {name, email, languages} = user;






    // TODO: rewrite the assignment below to use template strings
    //using the template string shortens the code no +'s, "'s, or / are needed.
    developers.push(`${name}'s email is ${email} ${name} knows ${languages.join(', ')}`);
});

// TODO: Use `let` for the following variable
let list = '<ul>';

// TODO: rewrite the following loop to use a for..of loop
//developers.forEach(function (developer) {


//for of loop creates the variable developer while using developers enabling us to call on developer later to run the function for the proper output.
    for (let developer of developers) {




    // TODO: rewrite the assignment below to use template strings
        //outputs the developer.push line of code at line 95, adding it to a unordered list for HTML.
    list += `<li>${developer}</li>`;
}
list += '</ul>';
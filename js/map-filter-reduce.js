const users = [
    {
        id: 1,
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript'],
        yearsOfExperience: 5
    },
    {
        id: 2,
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php'],
        yearsOfExperience: 6
    },
    {
        id: 3,
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash'],
        yearsOfExperience: 7
    },
    {
        id: 4,
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql'],
        yearsOfExperience: 8
    },
    {
        id: 5,
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php'],
        yearsOfExperience: 9
    }
];

//a function that creates a copy of the array of obj above that only includes(filters) users info with 3 or more languages.
// old way
// const newLang = users.filter(function(lang) {
//    return lang.languages.length > 2;
// });

// es6
const newLang = users.filter(lang => lang.languages.length > 2);
console.log(newLang);

const userEmail = users.map(displayEmail => displayEmail.email);
console.log(userEmail);


// using reduce to fine total years of experience and 0 at then cause were not adding any to it.
const yearsTotal = users.reduce((expYears, user) => {
    return expYears + user.yearsOfExperience;
}, 0);
console.log(yearsTotal);


// taking the total experience from above and the total amount of users to find the average experience... 7
var averageYear = yearsTotal / users.length;
console.log(averageYear);

const emailKing = users.reduce((email, user) => {
   if (user.email.length > email.length) {
       console.log(`I, ${user.email} am the biggest so far!`)
       return user.email;// this log whenever an email is bigger than the previous since it loops through all emails
   }
   console.log(`I, ${user.email} am not the biggest`)
    return email; // this logs the one that's not the biggest
}, ''); // you need this otherwise it will log the whole object
console.log(`${emailKing} is the KING of all Emails`);






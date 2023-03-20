const gitHub_Token = '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';


var userInput = prompt('Type in username.');
var username = userInput;

//fetch(url, {headers: {'Authorization': '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'}})



fetch('https:api.github.com/users/' + username +'/events',
    {headers: {'Authorization': gitHub_Token}})
    .then(response => response.json())
    .then(results => {
        console.log(results);
        console.log('updated: ' + results[0]);
    });











// made my own promise using function wait creating the promise with the executor resolve setting a timeout that isn't pre-set, so we can input any time.
function wait(time) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(time), time));
    // time in () is used to actual input the chosen number without it would be NAN and time out of () is what will actually let the time trigger without it would be instant.
    }


//using 2000 milliseconds time is called on we have to divide the time or 2000 milliseconds by 1000, so we get 1 for everything 1000 milliseconds to have it output in proper seconds.
wait(2000).then(time => console.log(`This will display after ${time / 1000} seconds`));





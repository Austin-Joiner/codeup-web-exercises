"use strict";


//https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/ for keycode list
var keyCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
var secret = [38, 38, 38, 38, 40, 40, 40, 40, 13];
var ind = 0; //starts index at 0 so we can increment it up
var newInd = 0;
$(document).keyup(function(event) {
    console.log(event.keyCode);
    if (event.which === keyCode[ind]) {
        ind++;  // adds 1 to index if input code correctly making it to where it will be 11 in total
    } else {
        ind = 0; // this it to reset the code if typed wrong
    }
    if (ind === keyCode.length) { // once ind = 11 it will successfully pass through this if statement and reset it to zero
        ind = 0;
        alert('You have added 30 lives!');
        $('*').css('background-color', 'black')
        $('h1').css('color', 'white')
        $('.invis').css('display', 'block')
        $('#secret-pass').css('color', 'black')
        var fireAudio = $('#fireworksAudio');
        fireAudio[0].play();
        var cheerAudio = $('#cheersAudio');
        setTimeout(function () {
            cheerAudio[0].play();
        }, 5000);
    }



});


$(document).keyup(function(newEvent) {
    if (newEvent.which === secret[newInd]) {
        newInd++;
    } else {
        newInd = 0; // this it to reset the code if typed wrong
    }
    if (newInd === secret.length) {
        newInd = 0;
        alert('You have added 3 lives!');
        $('*').css('background-color', 'white')
        $('h1').css('color', 'black')
        $('#secret-pass').css('color', 'white')
        var fireAudio = $('#fireworksAudio');
        fireAudio[0].pause();
        var cheerAudio = $('#cheersAudio');
        cheerAudio[0].pause();

    }

});
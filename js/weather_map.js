$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: OPEN_WEATHER_APPID,
    q:     "Tallahassee, US"
}).done(function(data) {
    console.log(data);

     var html =

    '<div class="container-wrap row"><div class="temp-wrap col-md-6 card">' +
         '<h4 class="temp">Temperature: ' + data.main.temp + '°F' +
         '<p class="feels_like">Feels Like: ' + data.main.feels_like + '</p></div>' +
         '<div class="humid-wrap col-md-6 card"><h4 class="humid">Humidity: ' + data.main.humidity + '%</h4></div>' +
         '<div class="weather-wrap col-md-6 card"><h4 class="weather">Weather: ' + data.weather[0].main + '</h4></div>' +
         '<div class="wind-wrap col-md-6 card"><h4 class="wind">Wind: ' + data.wind.speed + 'MPH</h4></div></div>';


     $('#forecast').html(html);




});
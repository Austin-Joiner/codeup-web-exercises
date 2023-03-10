$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: OPEN_WEATHER_APPID,
    q:     "San Antonio, US"
}).done(function(data) {
    console.log(data);

     var html =
    '<h4>Temperature: ' + data.main.temp + '°F' +
         '<p>Feels Like: ' + data.main.feels_like + '</p>' +
         '<h4>Humidity: ' + data.main.humidity + '%</h4>' +
         '<h4>Weather: ' + data.weather[0].main + '</h4>' +
         '<h4>Wind: ' + data.wind.speed + 'MPH</h4>';


     $('#forecast').html(html);

});
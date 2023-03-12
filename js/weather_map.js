$.get("https://api.openweathermap.org/data/2.5/forecast?q=Tallahassee, US&units=imperial&appid=" + OPEN_WEATHER_APPID)
// {lon: -84.2807, lat: 30.4383}
.done(function(data) {
    console.log(data);


    var forecastInfo = data.list;
     var html = '';

         for ( var i = 0; i < 5; i++) {


             html += '<div class="container-wrap"><div class="temp-wrap">';
             html += '<h4 class="temp">Temperature: ' + forecastInfo[i].main.temp + '°F' +
             '<p class="feels_like">Feels Like: ' + forecastInfo[i].main.feels_like + '</p></div>';
             html += '<div class="humid-wrap"><h4 class="humid">Humidity: ' + forecastInfo[i].main.humidity + '%</h4></div>';
             html += '<div class="weather-wrap"><h4 class="weather">Weather: ' + forecastInfo[i].weather[0].main + '</h4></div>';
             html += '<div class="wind-wrap"><h4 class="wind">Wind: ' + forecastInfo[i].wind.speed + 'MPH</h4></div></div>';

         }
     $('#forecast').html(html);




});
$.get("https://api.openweathermap.org/data/2.5/forecast?q=Tallahassee, US&units=imperial&appid=" + OPEN_WEATHER_APPID)
    // {lon: -84.2807, lat: 30.4383}
    .done(function (data) {
        console.log(data);


        var forecastInfo = data.list;
        var html = '';

        for (var i = 0; i < 5; i++) {


            html += '<div class="container-wrap">';
            html += '<div class="date-wrap">';
            html += '<h4></h4>'
            html += '</div>';
            html += '<div class="temp-wrap">';
            html += '<h4 class="temp">Temperature: ' + forecastInfo[i].main.temp + '°F' + '</h4>';
            html += '</div>';
            html += '<div class="humid-wrap">';
            html += '<h4 class="humid">Humidity: ' + forecastInfo[i].main.humidity + '%</h4>';
            html += '</div>';
            html += '<div class="weather-wrap">';
            html += '<div class="forecast-icon">';
            html += '<img src="https://openweathermap.org/img/w/' + forecastInfo[i].weather[0].icon + '.png"></div>';
            html += '<h4 class="weather">Weather: ' + forecastInfo[i].weather[0].main + '</h4>';
            html += '</div>';
            html += '<div class="wind-wrap">';
            html += '<h4 class="wind">Wind: ' + forecastInfo[i].wind.speed + 'MPH</h4>';
            html += '</div>';
            html += '</div>';

        }
        $('#forecast').html(html);


    });
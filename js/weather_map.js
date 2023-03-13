////////////////Weather API
$.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=30.438083&lon=-84.280933&appid=" + OPEN_WEATHER_APPID)
    // {lon: -84.2807, lat: 30.4383}
    .done(function (data) {
        console.log(data);

////////////////Weather INFO add to HTML
        var forecastInfo = data.list;
        var html = '';


        var locationFinderCity = data.city.name;
        var locationFinderCountry = data.city.country;

        console.log(locationFinderCity + ', ' + locationFinderCountry);

        $('#location-input').html(locationFinderCity + ', ' + locationFinderCountry);

        for (var i = 0; i < 5; i++) {


            html += '<a href="#" type="button" id="card-' + [i] + '" class="container-wrap card col-sm-4 col-lg-2">';
            html += '<div class="date-wrap">';
            html += '<h4>Date Here</h4>'
            html += '</div>';
            html += '<div class="temp-wrap">';
            html += '<h4 class="temp">' + forecastInfo[i].main.temp + '°F' + '</h4>';
            html += '</div>';
            html += '<div class="weather-wrap">';
            html += '<div class="forecast-icon">';
            html += '<img src="https://openweathermap.org/img/w/' + forecastInfo[i].weather[0].icon + '.png"></div>';
            html += '<h4 class="weather">' + forecastInfo[i].weather[0].main + '</h4>';
            html += '</div>';
            html += '</a>';

        }
        $('#forecast').html(html);
        dailyWeatherOne();
        dailyWeatherTwo();
        dailyWeatherThree();
        dailyWeatherFour();
        dailyWeatherFive();


    });

////////////////GLOBAL VARIABLES 1

var lonInput = -84.280933;
var latInput = 30.438083;
var marker = document.getElementsByClassName('mapboxgl-marker');
const styleStreets = 'mapbox://styles/mapbox/streets-v12';
const styleOutdoors = 'mapbox://styles/mapbox/outdoors-v12';
const styleLight = 'mapbox://styles/mapbox/light-v11';
const styleDark = 'mapbox://styles/mapbox/dark-v11';
const styleSatellite = 'mapbox://styles/mapbox/satellite-v9';
const styleSatelliteStreets = 'mapbox://styles/mapbox/satellite-streets-v12';
const styleNavigationDay = 'mapbox://styles/mapbox/navigation-day-v1';
const styleNavigationNight = 'mapbox://styles/mapbox/navigation-night-v1';


//////////////// MAP API
accessToken = MAPBOX_KEY
mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: styleStreets, // style URL
    center: [-84.2807, 30.4383], // starting position [lng, lat]
    zoom: 10, // starting zoom

});


/////////////////basic geocode function
function geocode(search, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function (res) {
            return res.json();
            // to get all the data from the request, comment out the following three lines...
        }).then(function (data) {
            return data.features[0].center;
        });
}

/////////////////ORIGIN SETTING ON TALLAHASSEE FL
geocode("Tallahassee, FL", mapboxgl.accessToken).then(function (result) {
    console.log(result);
    map.setCenter(result.center);
    map.setZoom(10);
    var marker = new mapboxgl.Marker({draggable: true})
        .setLngLat([-84.280933, 30.438083])
        .addTo(map);

    marker.on('dragend', function () {

        lonInput = marker.getLngLat().lng;
        latInput = marker.getLngLat().lat;

        runForecast();
    });

    ////////////////marker function on click fly to inside the origin function
    marker.getElement().addEventListener('click', function () {

        map.flyTo({
            center: marker.getLngLat(),
            zoom: 10,
            speed: 1
        })
    });

});

////////////////GLOBAL VARIABLES 2
var searchGeo = document.querySelector('#search-geo');
var submitButton = document.querySelector('#submit');
var grabCoordinates;


////////////////Function that runs the search value to place a marker via search
function searchGeocode(search, token) {
    var searchInput = searchGeo.value
    geocode(searchInput, token).then(function (coordinates) {

        var marker = new mapboxgl.Marker({draggable: true})
            .setLngLat(coordinates)
            .addTo(map)

        grabCoordinates = coordinates;
        lonInput = grabCoordinates[0];
        latInput = grabCoordinates[1];
        console.log("longitude: " + lonInput);
        console.log("latitude: " + latInput);

        ////////////////Drag marker function/ grab lon and lat
        marker.on('dragend', function () {

            lonInput = marker.getLngLat().lng;
            latInput = marker.getLngLat().lat;
            console.log("you dragged to: " + marker.getLngLat())
            runForecast();

        });

        map.flyTo({
            center: marker.getLngLat(),
            zoom: 10,
            speed: 1,


        });
////////////////marker function on click fly to inside the  function
        marker.getElement().addEventListener('click', function () {

            map.flyTo({
                center: marker.getLngLat(),
                zoom: 10,
                speed: 1

            });
        });
        ////////////////runs the get request on bottom similar to top
        runForecast();
    });
}

////////////////submit button runs above function using search.value and token
submitButton.addEventListener('click', function () {
    var searchInput = searchGeo.value;

    for (var i = marker.length - 1; i >= 0; i--) {
        marker[i].remove();
    }
    searchGeocode(searchInput, MAPBOX_KEY);
});


////////////////Map BOX API STYLE CHANGER


    var styleSwap = document.querySelector('#style-change');

    function styleChanger() {

        switch (styleSwap.value) {
            case 'Streets':
                map.setStyle(styleStreets);
                console.log('streets');
                break;
            case 'Outdoors':
                map.setStyle(styleOutdoors);
                console.log('streets');
                break;
            case 'Light':
                map.setStyle(styleLight);
                console.log('streets');
                break;
            case 'Dark':
                map.setStyle(styleDark);
                break;
            case 'Satellite':
                map.setStyle(styleSatellite);
                break;
            case 'Satellite Streets':
                map.setStyle(styleSatelliteStreets);
                break;
            case 'Navigation Day':
                map.setStyle(styleNavigationDay);
                break;
            case 'Navigation Night':
                map.setStyle(styleNavigationNight);
                break;
        }
        // map.style(styleSwap.value);

    }

    styleSwap.addEventListener('change', styleChanger)











///////////////
///////////////Functions to be called on later
///////////////
///////////////GET request similar to top
function runForecast() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {
            console.log(data);


            var forecastInfo = data.list;
            var html = '';


            var locationFinderCity = data.city.name;
            var locationFinderCountry = data.city.country;

            console.log(locationFinderCity + ', ' + locationFinderCountry);

            $('#location-input').html(locationFinderCity + ', ' + locationFinderCountry);


            for (var i = 0; i < 5; i++) {


                html += '<a href="#" type="button" id="card-' + [i] + '" class="container-wrap card col-sm-4 col-lg-2">';
                html += '<div class="date-wrap">';
                html += '<h4>Date Here</h4>'
                html += '</div>';
                html += '<div class="temp-wrap">';
                html += '<h4 class="temp">' + forecastInfo[i].main.temp + '°F' + '</h4>';
                html += '</div>';
                html += '<div class="weather-wrap">';
                html += '<div class="forecast-icon">';
                html += '<img src="https://openweathermap.org/img/w/' + forecastInfo[i].weather[0].icon + '.png"></div>';
                html += '<h4 class="weather">' + forecastInfo[i].weather[0].main + '</h4>';
                html += '</div>';
                html += '</a>';


            }
            $('#forecast').html(html);
            dailyWeatherOne();
            dailyWeatherTwo();
            dailyWeatherThree();
            dailyWeatherFour();
            dailyWeatherFive();
        });

}

//////////////////////function event listener

function dailyWeatherOne() {
    var forecastOne = document.querySelector('#card-0');
    forecastOne.addEventListener('click', function () {

        forecastOneChart();

    });
}
function dailyWeatherTwo() {
    var forecastTwo = document.querySelector('#card-1');
    forecastTwo.addEventListener('click', function () {

        forecastTwoChart();

    });
}
function dailyWeatherThree() {
    var forecastThree = document.querySelector('#card-2');
    forecastThree.addEventListener('click', function () {

        forecastThreeChart();

    });
}
function dailyWeatherFour() {
    var forecastFour = document.querySelector('#card-3');
    forecastFour.addEventListener('click', function () {

        forecastFourChart();

    });
}
function dailyWeatherFive() {
    var forecastFive = document.querySelector('#card-4');
    forecastFive.addEventListener('click', function () {

        forecastFiveChart();

    });
}


////////////////////single weather chart function

function forecastOneChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {


            var forecastInfo = data.list;
            var htmlBottom = '';


            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>Date Here</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + forecastInfo[0].main.temp + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + forecastInfo[0].main.feels_like + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[0].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[0].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">Weather: ' + forecastInfo[0].weather[0].description + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + forecastInfo[0].wind.speed + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}
function forecastTwoChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {


            var forecastInfo = data.list;
            var htmlBottom = '';


            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>Date Here</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + forecastInfo[1].main.temp + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + forecastInfo[1].main.feels_like + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[1].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[1].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">Weather: ' + forecastInfo[1].weather[0].description + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + forecastInfo[1].wind.speed + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}
function forecastThreeChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {


            var forecastInfo = data.list;
            var htmlBottom = '';


            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>Date Here</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + forecastInfo[2].main.temp + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + forecastInfo[2].main.feels_like + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[2].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[2].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">Weather: ' + forecastInfo[2].weather[0].description + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + forecastInfo[2].wind.speed + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}
function forecastFourChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {


            var forecastInfo = data.list;
            var htmlBottom = '';


            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>Date Here</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + forecastInfo[3].main.temp + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + forecastInfo[3].main.feels_like + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[3].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[3].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">Weather: ' + forecastInfo[3].weather[0].description + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + forecastInfo[3].wind.speed + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}
function forecastFiveChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {


            var forecastInfo = data.list;
            var htmlBottom = '';


            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>Date Here</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + forecastInfo[4].main.temp + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + forecastInfo[4].main.feels_like + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[4].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[4].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">Weather: ' + forecastInfo[4].weather[0].description + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + forecastInfo[4].wind.speed + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}




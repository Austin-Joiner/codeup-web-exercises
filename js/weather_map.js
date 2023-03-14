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


        var prevDay = '';
        var prevTime = '';


        for (var i = 0; i < 40; i++) {


            const day = new Date(data.list[i].dt * 1000).toLocaleDateString([], {
                month: 'short',
                day: '2-digit'

            });
            const time = new Date(data.list[i].dt * 1000).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            });


            if (day === false || day !== prevDay && time === '5:00 PM' ) {
                html += '<a href="#" type="button" id="card-' + [i] + '" class="container-wrap card col-sm-4 col-lg-2">';
                html += '<div class="date-wrap">';
                html += '<h4>' + day + '</h4>'
                html += '</div>';
                html += '<div class="temp-wrap">';
                html += '<h4 class="temp">' + parseInt(forecastInfo[i].main.temp) + '°F' + '</h4>';
                html += '</div>';
                html += '<div class="weather-wrap">';
                html += '<div class="forecast-icon">';
                html += '<img src="https://openweathermap.org/img/w/' + forecastInfo[i].weather[0].icon + '.png"></div>';
                html += '<h4 class="weather">' + forecastInfo[i].weather[0].main + '</h4>';
                html += '</div>';
                html += '</a>';
                prevDay = day;
                prevTime = time;
                dayData.push(day);
                indexArray.push(i);

            } else {

            }

        }
        $('#forecast').html(html);
        dailyWeatherOne();
        dailyWeatherTwo();
        dailyWeatherThree();
        dailyWeatherFour();
        dailyWeatherFive();
        currentWeather();
        currentWeatherEvent()

    });

////////////////////////////////
///////////////current weather event listener
////////////////////////////////

function currentWeatherEvent() {

    var currentEvent = document.querySelector('#location-input');
    currentEvent.addEventListener('click', function () {

        currentWeather();

    });
}




//////////////// current Weather API

function currentWeather() {

    $.get("https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        .done(function (currentData) {
            console.log(currentData);


////////////////Current Weather INFO add to HTML
            var currentInfo = currentData;
            var htmlBottom = '';


            var windSpeed = currentInfo.wind.speed * 1.151;


            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>Current Weather</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + parseInt(currentInfo.main.temp) + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + parseInt(currentInfo.main.feels_like) + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + currentInfo.main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + currentInfo.weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">' + currentInfo.weather[0].description.toUpperCase() + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + parseInt(windSpeed) + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}




////////////////GLOBAL VARIABLES 1

var indexArray = [];
var dayData = [];
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
                speed: 1,
            });
        });



        runForecast(marker.getLngLat(), MAPBOX_KEY);
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





// Add a new marker when the map is clicked and change the forecast using runForecast function.
map.on('dblclick', function (event) {
    for (var i = marker.length - 1; i >= 0; i--) {
        marker[i].remove();
    }

    var newMarker = new mapboxgl.Marker({draggable: true})
        .setLngLat(event.lngLat)
        .addTo(map);
        lonInput = newMarker.getLngLat().lng;
        latInput = newMarker.getLngLat().lat;

        runForecast();

    newMarker.on('dragend', function () {
        lonInput = newMarker.getLngLat().lng;
        latInput = newMarker.getLngLat().lat;
        console.log("you dragged to: " + newMarker.getLngLat());
        runForecast();
    });

    newMarker.getElement().addEventListener('click', function () {
        map.flyTo({
            center: newMarker.getLngLat(),
            zoom: 10,
            speed: 1,
        });
    });
    // lonInput = event.lngLat.lng;
    // latInput = event.lngLat.lat;
    console.log("lon" + lonInput);
    console.log("lat" + latInput);
});





////////////////Map BOX API STYLE CHANGER


    var styleSwap = document.querySelector('#style-change');

    function styleChanger() {

        switch (styleSwap.value) {
            case 'Streets':
                map.setStyle(styleStreets);

                break;
            case 'Outdoors':
                map.setStyle(styleOutdoors);

                break;
            case 'Light':
                map.setStyle(styleLight);

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


            var prevDay = '';
            var prevTime = '';
            for (var i = 0; i < 40; i++) {


                const day = new Date(data.list[i].dt * 1000).toLocaleDateString([], {
                    month: 'short',
                    day: '2-digit'

                });
                const time = new Date(data.list[i].dt * 1000).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                });


                if (day === false || day !== prevDay && time === '5:00 PM' ) {
                    html += '<a href="#" type="button" id="card-' + [i] + '" class="container-wrap card col-sm-4 col-lg-2">';
                    html += '<div class="date-wrap">';
                    html += '<h4>' + day + '</h4>'
                    html += '</div>';
                    html += '<div class="temp-wrap">';
                    html += '<h4 class="temp">' + parseInt(forecastInfo[i].main.temp) + '°F' + '</h4>';
                    html += '</div>';
                    html += '<div class="weather-wrap">';
                    html += '<div class="forecast-icon">';
                    html += '<img src="https://openweathermap.org/img/w/' + forecastInfo[i].weather[0].icon + '.png"></div>';
                    html += '<h4 class="weather">' + forecastInfo[i].weather[0].main + '</h4>';
                    html += '</div>';
                    html += '</a>';
                    prevDay = day;
                    prevTime = time;

                } else {

                }
            }
            $('#forecast').html(html);
            dailyWeatherOne();
            dailyWeatherTwo();
            dailyWeatherThree();
            dailyWeatherFour();
            dailyWeatherFive();
            currentWeather();

        });

}

//////////////////////function event listener

function dailyWeatherOne() {
        let card = '#card-' + indexArray[0];
    var forecastOne = document.querySelector(card);
    forecastOne.addEventListener('click', function () {

        forecastOneChart();

    });
}
function dailyWeatherTwo() {
    let card = '#card-' + indexArray[1];
    var forecastTwo = document.querySelector(card);
    forecastTwo.addEventListener('click', function () {

        forecastTwoChart();

    });
}
function dailyWeatherThree() {
    let card = '#card-' + indexArray[2];
    var forecastThree = document.querySelector(card);
    forecastThree.addEventListener('click', function () {

        forecastThreeChart();

    });
}
function dailyWeatherFour() {
    let card = '#card-' + indexArray[3];
    var forecastFour = document.querySelector(card);
    forecastFour.addEventListener('click', function () {

        forecastFourChart();

    });
}
function dailyWeatherFive() {
    let card = '#card-' + indexArray[4];
    var forecastFive = document.querySelector(card);
    forecastFive.addEventListener('click', function () {

        forecastFiveChart();

    });
}

// new date data.dt * 1000.tolocaldatestring
// new date data.dt * 1000.tolocaltimestring
////////////////////single weather chart function
// const timeCheck = new Date(data.list[i].dt * 1000).toLocaleTimeString([], {
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true
// });
function forecastOneChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {




            day = dayData[0];

            let weatherPlace = indexArray[0];

            var forecastInfo = data.list;
            var htmlBottom = '';

            var windSpeed = forecastInfo[weatherPlace].wind.speed * 1.151;



            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>'+ day +'</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + parseInt(forecastInfo[weatherPlace].main.temp) + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + parseInt(forecastInfo[weatherPlace].main.feels_like) + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[weatherPlace].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[weatherPlace].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">' + forecastInfo[weatherPlace].weather[0].description.toUpperCase() + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + parseInt(windSpeed) + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}
function forecastTwoChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {


            day = dayData[1];

            let weatherPlace = indexArray[1];

            var forecastInfo = data.list;
            var htmlBottom = '';


            var windSpeed = forecastInfo[weatherPlace].wind.speed * 1.151;

            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>'+ day +'</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + parseInt(forecastInfo[weatherPlace].main.temp) + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + parseInt(forecastInfo[weatherPlace].main.feels_like) + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[weatherPlace].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[weatherPlace].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">' + forecastInfo[weatherPlace].weather[0].description.toUpperCase() + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + parseInt(windSpeed) + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}
function forecastThreeChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {

            day = dayData[2];

            let weatherPlace = indexArray[2];

            var forecastInfo = data.list;
            var htmlBottom = '';


            var windSpeed = forecastInfo[weatherPlace].wind.speed * 1.151;



            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>'+ day +'</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + parseInt(forecastInfo[weatherPlace].main.temp) + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + parseInt(forecastInfo[weatherPlace].main.feels_like) + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[weatherPlace].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[weatherPlace].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">' + forecastInfo[weatherPlace].weather[0].description.toUpperCase() + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + parseInt(windSpeed) + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}
function forecastFourChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {


            day = dayData[3];

            let weatherPlace = indexArray[3];

            var forecastInfo = data.list;
            var htmlBottom = '';


            var windSpeed = forecastInfo[weatherPlace].wind.speed * 1.151;


            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>'+ day +'</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + parseInt(forecastInfo[weatherPlace].main.temp) + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + parseInt(forecastInfo[weatherPlace].main.feels_like) + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[weatherPlace].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[weatherPlace].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">' + forecastInfo[weatherPlace].weather[0].description.toUpperCase() + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + parseInt(windSpeed) + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}
function forecastFiveChart() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {


            day = dayData[4];

            let weatherPlace = indexArray[4];

            var forecastInfo = data.list;
            var htmlBottom = '';


            var windSpeed = forecastInfo[weatherPlace].wind.speed * 1.151;


            htmlBottom += '<div class="solo-container-wrap card">';
            htmlBottom += '<div class="solo-date-wrap">';
            htmlBottom += '<h4>' + day + '</h4>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-temp-wrap">';
            htmlBottom += '<h4 class="solo-temp">' + parseInt(forecastInfo[weatherPlace].main.temp) + '°F</h4>';
            htmlBottom += '<p>Feels Like: ' + parseInt(forecastInfo[weatherPlace].main.feels_like) + '°F</p>'
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-humid-wrap">';
            htmlBottom += '<h4 class="solo-humid">Humidity: ' + forecastInfo[weatherPlace].main.humidity + '%</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-weather-wrap">';
            htmlBottom += '<div class="solo-forecast-icon">';
            htmlBottom += '<img src="https://openweathermap.org/img/w/' + forecastInfo[weatherPlace].weather[0].icon + '.png"></div>';
            htmlBottom += '<h4 class="solo-weather">' + forecastInfo[weatherPlace].weather[0].description.toUpperCase() + '</h4>';
            htmlBottom += '</div>';
            htmlBottom += '<div class="solo-wind-wrap">';
            htmlBottom += '<h4 class="solo-wind">Wind: ' + parseInt(windSpeed) + 'MPH</h4>';
            htmlBottom += '</div>';
            htmlBottom += '</div>';


            $('#singleForecast').html(htmlBottom);
        });
}




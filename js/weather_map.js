////////////////Weather API
$.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=30.438083&lon=-84.280933&appid=" + OPEN_WEATHER_APPID)
    // {lon: -84.2807, lat: 30.4383}
    .done(function (data) {
        console.log(data);

////////////////Weather INFO add to HTML
        var forecastInfo = data.list;
        var html = '';


        var locationFinder = data.city.name;
        console.log(locationFinder);

        $('#location-input').html(locationFinder);




        for (var i = 0; i < 5; i++) {


            html += '<a href="#" id="card-' + [i] + '" class="container-wrap card col-sm-2 ">';
            html += '<div class="date-wrap">';
            html += '<h4>Date Here</h4>'
            html += '</div>';
            html += '<div class="temp-wrap">';
            html += '<h4 class="temp">' + forecastInfo[i].main.temp + '°F' + '</h4>';
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
            html += '</a>';

        }
        $('#forecast').html(html);
    });

////////////////GLOBAL VARIABLES

var lonInput = -84.280933;
var latInput = 30.438083;
var marker = document.getElementsByClassName('mapboxgl-marker');


//////////////// MAP API
accessToken = MAPBOX_KEY
mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
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
        console.log("longitude: " + lonInput);
        console.log("latitude: " + latInput);
        console.log("you dragged to: " + marker.getLngLat())
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

////////////////GLOBAL VARIABLES
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

///////////////GET request similar to top get
function runForecast() {
    $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + latInput + "&lon=" + lonInput + "&appid=" + OPEN_WEATHER_APPID)
        // {lon: -84.2807, lat: 30.4383}
        .done(function (data) {
            console.log(data);


            var forecastInfo = data.list;
            var html = '';


            var locationFinder = data.city.name;
            console.log(locationFinder);

            $('#location-input').html(locationFinder);




            for (var i = 0; i < 5; i++) {


                html += '<a href="#" id="card-' + [i] + '" class="container-wrap card col-sm-2 ">';
                html += '<div class="date-wrap">';
                html += '<h4>Date Here</h4>'
                html += '</div>';
                html += '<div class="temp-wrap">';
                html += '<h4 class="temp">' + forecastInfo[i].main.temp + '°F' + '</h4>';
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
                html += '</a>';

            }
            $('#forecast').html(html);
        });

}










$.get("https://api.openweathermap.org/data/2.5/forecast?lat=30&lon=-84&appid=" + OPEN_WEATHER_APPID)
    // {lon: -84.2807, lat: 30.4383}
    .done(function (data) {
        console.log(data);


        var forecastInfo = data.list;
        var html = '';

        for (var i = 0; i < 5; i++) {


            html += '<div class="container-wrap card col-md-2">';
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




        accessToken = MAPBOX_KEY
        mapboxgl.accessToken = accessToken;
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-84.2807, 30.4383], // starting position [lng, lat]
            zoom: 10, // starting zoom
        });



        /////////////////ORIGIN SETTING ON TALLAHASSEE FL
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
        geocode("Tallahassee, FL", mapboxgl.accessToken).then(function (result) {
            console.log(result);
            map.setCenter(result.center);
            map.setZoom(10);
        });



        var searchGeo = document.querySelector('#search-geo');
        var submitButton = document.querySelector('#submit');
        var grabCoordinates;

        function searchGeocode(search, token) {
            var searchInput = searchGeo.value


            geocode(searchInput, token).then(function (coordinates) {

                let marker = new mapboxgl.Marker()
                    .setLngLat(coordinates)
                    .addTo(map)
                    grabCoordinates = coordinates;
                    console.log(grabCoordinates);


                map.flyTo({
                    center: coordinates,
                    zoom: 10,
                    speed: 1,
                });

                marker.getElement().addEventListener('click', function () {

                    map.flyTo({
                        center: coordinates,
                        zoom: 17,
                        speed: 1

                    });
                });
            });
        }


        submitButton.addEventListener('click', function () {
            var searchInput = searchGeo.value;


            searchGeocode(searchInput, MAPBOX_KEY);
        });


    });
var map;
var infowindow;
var idRestaurant;


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

var userDistance = 16812.4;
console.log(userDistance)

document.getElementById("myRange").addEventListener("click", function() {
    userDistance = slider.value * 1609.34
    initMapPlaces()
});


document.getElementById("btnRest").addEventListener("click", function () {

    initMapPlaces("restaurant")
});


document.getElementById("btnBar").addEventListener("click", function () {

    initMapPlaces("bar")
});


document.getElementById("btnCafe").addEventListener("click", function () {

    initMapPlaces("cafe")
});

document.getElementById("btnBakery").addEventListener("click", function () {

    initMapPlaces("bakery")
});

// Initialize function

function initMap() {

    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        var latText = parseFloat(lat);
        var longText = parseFloat(long);

        var currentLocation = { lat: latText, lng: longText };
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: currentLocation
        });

        var marker = new google.maps.Marker({
            position: currentLocation,
            map: map
        });
    });
}

// Retrieve restaurants nearby

function initMapPlaces(type) {

    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        var latText = parseFloat(lat);
        var longText = parseFloat(long);

   
        var currentLocation = { lat: latText, lng: longText };
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: currentLocation
        });


        var marker = new google.maps.Marker({
            position: currentLocation,
            map: map
        });

        var request = {
            location: currentLocation,
            radius: userDistance,
            types: [type],
   
        };
        console.log(userDistance)

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, callback);

        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
                console.log(results[0].id)
                console.log(results)
            }
        }

        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            })


            google.maps.event.addListener(marker, 'mouseover', function () {
                infowindow.setContent(place.name + "<br>" + place.vicinity)
                infowindow.open(map, this)
            });

        }
    });

}


google.maps.event.addDomListener(window, 'load', initMap)

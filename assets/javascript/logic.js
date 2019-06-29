

$("#search").on("click", function () {

    var search = $("#searchTerm").val().trim()
    console.log(search)
})


var lat
var lon
var map;
var service;
var infowindow;

function lonlat() {

    var input = document.getElementById('zip');
    var lonlat = document.getElementById('lonlat');

    if (event.keyCode === 13 && input.value.length === 5) {

        var zipCode = input.value;

        var xhr = $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&key=AIzaSyDVPLLlJAQ679Frd0gu11khJ9mW02wsvWQ');

        xhr.done(function (data) {
            lat = data.results[0].geometry.location.lat
            lon = data.results[0].geometry.location.lng

            console.log(lat, lon)
            initMap()
        });


    }
}

function initMap() {
    var userLocation = new google.maps.LatLng(lat, lon);

    var options = {
        zoom: 14,
        center: userLocation
    }

    var request = {
        location: userLocation,
        radius: "500",
        query: "restaurant"
    };
    map = new google.maps.Map(document.getElementById('map'), options);


    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

}



function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            // console.log(place);
            addMarker(results[i].geometry.location);
        }
    }
}

function addMarker(location) {
    // console.log(event);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat(), location.lng()),
        map: map
    });
    console.log(marker);
    marker.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
    // console.log(marker);
}

queryURL= 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?count=10&cat=' + input


$.ajax({
    url: queryURL,
    headers: {
        "X-RapidAPI-Host": "andruxnet-random-famous-quotes.p.rapidapi.com",
        "X-RapidAPI-Key": "fd935729eemshe08e2a6e5a6c8b3p1b9063jsn940002b244f5",
    },
    method: 'GET',
    success: function(data){
      console.log('succes: '+ data[0].quote);
    }
  });
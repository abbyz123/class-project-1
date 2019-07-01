// load cookie
let userInfo;                                   // load json user info from cookie
let userStressLevel = 3;                        // set default stress level
let userHoursNeeded = 2;                        // set default user hours needed

try {
    userInfo = JSON.parse(window.localStorage.getItem("localuser"));
    // userStressLevel = userInfo.stressLevel;
    // userHoursNeeded = userInfo.hoursNeeded;
} catch (exception) {
    console.log("error occurs for localStorage");
    console.log(exception);
}



var config = {
    apiKey: "AIzaSyCanlYIc7n-Wel8wDeaMxMzYtViVVCOwpI",
    authDomain: "recent-user-with-push.firebaseapp.com",
    databaseURL: "https://ucla-project-1-245019.firebaseio.com/",
    appId: "1:988071982552:web:4be558d1a24516bd"
};

firebase.initializeApp(config);

var database = firebase.database();








// call map API here
$('form').submit(function (event) {
    event.preventDefault();
})
$("#submit").on("click", function(){
    putZipcode()
})






function putZipcode() {
    var input = $("#zip").val();
    console.log(input)
    // if (input === 5) {

        localStorage.setItem('zipcode', input);

        window.open("./page4.html", "_self");
    // }
}

function getZipcode() {
    var input = localStorage.getItem('zipcode');
    console.log(input)
    var lonlat = document.getElementById('lonlat');


    var xhr = $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyDEhYxSl1yFFuWzmpaqZqgNbh5XBZpUqPI');

    xhr.done(function (data) {

        database.ref().push({
            lat: data.results[0].geometry.location.lat,
            lon: data.results[0].geometry.location.lng

        })
    });
}






$('#map').ready(function () {


        getZipcode()


        database.ref().on("child_added", function (childSnapshot) {
            console.log(childSnapshot.val());

            lat = childSnapshot.val().lat
            lon = childSnapshot.val().lat

        });


        var map;
        var service;
        var infowindow;

        function childAdded(lat, lon) {
            var userLocation = new google.maps.LatLng(lat, lon);

            console.log(userLocation)

            var request = {
                location: userLocation,
                radius: "500",
                query: "restaurant"
            };
            console.log(document.getElementById('map'));
            console.log(map)


            service.textSearch(request, callback);

        }
    
})



function initMap() {
    var options = {
        zoom: 8,
        center: { lat: 34.397, lng: -118.2437 }
    }

    map = new google.maps.Map(document.getElementById('map'), options);
    service = new google.maps.places.PlacesService(map);
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



//api for famous quotes
// // queryURL= 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?count=10&cat=' + input
// queryURL = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?count=10&cat=famous'

// $.ajax({
//     url: queryURL,
//     headers: {
//         "X-RapidAPI-Host": "andruxnet-random-famous-quotes.p.rapidapi.com",
//         "X-RapidAPI-Key": "fd935729eemshe08e2a6e5a6c8b3p1b9063jsn940002b244f5",
//     },
//     method: 'GET',
//     success: function (data) {
//         console.log('succes: ' + data[0].quote);
//     }
// });




// $.ajax({
//     url: "https://musixmatchcom-musixmatch.p.rapidapi.com/wsr/1.1/artist.search?s_artist_rating=desc&q_artist=coldplay&page=1&page_size=5",
//     headers: {
//         "X-RapidAPI-Host": "musixmatchcom-musixmatch.p.rapidapi.com",
//         "X-RapidAPI-Key": "fd935729eemshe08e2a6e5a6c8b3p1b9063jsn940002b244f5",
//     },
//     method: 'GET',
//     success: function (data) {
//         console.log(data)
//     }

// })
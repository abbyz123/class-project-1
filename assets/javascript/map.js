// load cookie

let userInfo; // load json user info from cookie
let userStressLevel; // set default stress level
let userHoursNeeded; // set default user hours needed


try {
    userInfo = JSON.parse(window.localStorage.getItem("localuser"));
    userStressLevel = userInfo.stressLevel;
    userHoursNeeded = userInfo.hoursNeeded;
} catch (exception) {
    // set default stress level and hours needed if localStorage throws exception
    userStressLevel =
        userHoursNeeded =
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


var map;







// call map API here
$('form').submit(function (event) {
    event.preventDefault();
})
$("#submit").on("click", function () {
    putZipcode()
})






function putZipcode() {
    var input = $("#zip").val();
    //   console.log(input)
    // if (input === 5) {

    if (input == "" || isNaN(input) ||
        input.length != 5) {
        // alert( "Please provide a zip in the format #####." );
        return false;
    }

    localStorage.setItem('zipcode', input);

    window.open("./page4.html", "_self");
    // }
}


function getZipcode() {

    var lat;
    var lon;
    var input = localStorage.getItem('zipcode');
    // console.log(input)
    var lonlat = document.getElementById('lonlat');


    var xhr = $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyDEhYxSl1yFFuWzmpaqZqgNbh5XBZpUqPI');



    xhr.done(function (data) {

        lat = data.results[0].geometry.location.lat;
        lon = data.results[0].geometry.location.lng;

        var userLocation = new google.maps.LatLng(lat, lon);

        // console.log(userLocation)

        var options = {
            zoom: 11,
            center: { lat: lat, lng: lon }
        }

        map = new google.maps.Map(document.getElementById('map'), options);
        var request = {
            location: userLocation,
            radius: "5000",
            query: ""
        }


        if (userStressLevel === 4 && userHoursNeeded < 4) {
            request.query = "club"
            $('#active').text("You need to dance it out! Here are some fun clubs!")
        }
        if (userStressLevel === 3 && userHoursNeeded < 4) {
            request.query = "hike"
            $('#active').text("Getting into nature does wonders for your mood! Check out these hikes!")
        }
        if (userStressLevel === 2 && userHoursNeeded < 4) {
            request.query = "restraunt"
            $('#active').text("You just need a delicious meal! Try one of these restauraunts")
        }
        if (userStressLevel === 1 && userHoursNeeded < 4) {

            request.query = "cinema"
            $('#active').text("Relax, sit back and enjoy a movie")

        }

        if (userStressLevel === 1 && userHoursNeeded > 4) {
            request.query = "theme parks"
            $('#active').text("Take the day, touch base with your inner child, and go to a theme park!")
        }
        if (userStressLevel === 2 && userHoursNeeded > 4) {
            request.query = "theme parks"
            $('#active').text("Take the day, touch base with your inner child, and go to a theme park!")

        }
        if (userStressLevel === 3 && userHoursNeeded > 4) {
            request.query = "camp"
            $('#active').text("Pack your bags, spend a night unplugged in nature, and go Camping!")
        }
        if (userStressLevel === 4 && userHoursNeeded > 4) {
            request.query = "camp"
            $('#active').text("Pack your bags, spend a night unplugged in nature, and go Camping!")

        }


        service.textSearch(request, callback);
        console.log(userHoursNeeded)
        console.log(userStressLevel);
        // console.log(document.getElementById('map'));
        // console.log(map)


    })
}

function waitGoogleReady() {
    setTimeout(() => {
        if(typeof google !== 'undefined') {
            getZipcode()
            getQuote()    
        } else {
            waitGoogleReady();
        }
    },100);
}
$(document).ready(function () {
    if (window.location.href.indexOf('page4') > 0) {
        waitGoogleReady();
    }
})




function initMap() {
    //   console.log('initMap');
    var options = {
        zoom: 12,
        center: {
            lat: 34.0656,
            lng: -118.3097
        }
    }

    map = new google.maps.Map(document.getElementById('map'), options);
    service = new google.maps.places.PlacesService(map);
}



function callback(results, status) {
    console.log(results, status)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            // console.log(place);
            addMarker(results[i].geometry.location);
            // fetch activity info
            let currActivity = $("<div class='container'>");
            currActivity.append($("<h3>").text(results[i].name));
            currActivity.append($("<p>").text(results[i].formatted_address));
            currActivity.append($("<p>").text("rating: " + results[i].rating));
            $("#activity").append(currActivity);

        }
    }
}

function addMarker(location) {

    // console.log(event);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat(), location.lng()),
        map: map
    });
    // console.log(marker);
    marker.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
    // console.log(marker);

}



//api for famous quotes

function getQuote() {

    if (userStressLevel === 1) {
        queryURL = 'https://yusufnb-quotes-v1.p.rapidapi.com/widget/~cheer.json'
    }
    if (userStressLevel === 2) {
        queryURL = 'https://yusufnb-quotes-v1.p.rapidapi.com/widget/~happy.json'
    }
    if (userStressLevel === 3) {
        queryURL = 'https://yusufnb-quotes-v1.p.rapidapi.com/widget/~active.json'
    }
    if (userStressLevel === 4) {
        queryURL = 'https://yusufnb-quotes-v1.p.rapidapi.com/widget/~inspire.json'
    }
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        headers: {
            "X-RapidAPI-Host": "yusufnb-quotes-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "fd935729eemshe08e2a6e5a6c8b3p1b9063jsn940002b244f5",
        },
        method: 'GET',
        success: function (data) {
            // console.log(data.quote);
            var newDiv = $("<div>").append(
              $("<div>").text(data.quote),  
              $("<div>").text( "~ "+ data.by),
                


            );
            $('#quote').append(newDiv)
        }
    });
}




$("#reset").on("click", function () {
    window.open("./index.html", "_self");
})


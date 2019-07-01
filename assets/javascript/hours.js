let userInfo;           // user information JSON structure

$(function() {
    $("#dropdownid>*").each(function() {
        // get hour from id
        let hour = parseInt(this.id);

        // Add click even handler for menu items
        $(this).on("click", function() {
            try {
                userInfo = JSON.parse(window.localStorage.getItem("localuser"))    // get the json from localStorage using "localuser" key
                console.log(userInfo);
                userInfo.hoursNeeded = hour;
                window.localStorage.setItem("localuser", JSON.stringify(userInfo));
            } catch (exception) {
                console.log("error occurs for localStorage");
                console.log(exception);
            }

            window.open("./page3.html", "_self");           // go to page 3 no matter what
        })
    })
})
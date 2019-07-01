$(function() {
    $("#dropdownid>*").each(function() {
        // get hour from id
        let hour = parseInt(this.id);

        // Add click even handler for menu items
        $(this).on("click", function() {
            userInfo = Cookies.getJSON("localuser");        // get the json from localuser cookie
            console.log(userInfo);
            if (userInfo !== undefined) {                   // update hours needed from clicked menu item                  
                userInfo.hoursNeeded = hour;
                Cookies.set("localuser", userInfo);         // update cookie
            } else {
                console.log("cookie failed.");              // if cookie fails, do nothing. Will setup default values
            }

            window.open("./page3.html", "_self");           // go to page 3 no matter what
        })
    })
})
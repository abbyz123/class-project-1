// load cookie
let userInfo = Cookies.getJSON("localuser");    // load json user info from cookie
let userStressLevel = 3;                        // set default stress level
let userHoursNeeded = 2;                        // set default user hours needed

if (userInfo !== undefined) {                   // update user info from cookie
    userStressLevel = userInfo.stressLevel;     // stress level
    userHoursNeeded = userInfo.hoursNeeded;     // hours needed
} else {
    console.log("Failed to load cookie, use default user data");
}

// call map API here
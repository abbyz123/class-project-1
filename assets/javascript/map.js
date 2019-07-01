// load cookie
let userInfo;                                   // load json user info from cookie
let userStressLevel = 3;                        // set default stress level
let userHoursNeeded = 2;                        // set default user hours needed

try {
    userInfo = JSON.parse(window.localStorage.getItem("localuser"));
    userStressLevel = userInfo.stressLevel;
    userHoursNeeded = userInfo.hoursNeeded;
} catch (exception) {
    console.log("error occurs for localStorage");
    console.log(exception);
}

// call map API here
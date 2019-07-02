// global variables
let bubbleDiameter = 150;                           // bubble diameter
let bubbleArr = [];                                 // bubble arrays
let bubbleNum = 4;                                  // number of bubbles
let speedOpt = [1, 2];                              // bubble speed options
let speedDir = [-1, 1];                             // bubble speed directions
let bubbleWeight = 5;                               // bubble stroke weight
let bubbleTextSize = 50;                            // bubble text size;
let canvasWidth = 1024;                             // canvas width (for standard laptop)
let canvasHeight = 768;                             // canvas height (for standard laptop)

// for future update: need to verify that canvasWidthSegNum * canvasHeightSegNum === bubbleNum
let canvasWidthSegNum = 3;                          // devide canvas width into 3 segments
let canvasHeightSegNum = 2;                         // device canvas height into 2 segments
let canvasWidthSegLen = canvasWidth / canvasWidthSegNum;        // segment width length
let canvasHeightSegLen = canvasHeight / canvasHeightSegNum;     // segment height length

// setup p5 canvas
function setup() {
    // Setup canvas
    let myCanvas = createCanvas(canvasWidth, canvasHeight);    // create canvas
    myCanvas.parent('bubbleCanvas');                           // canvas under the container
    frameRate(25);                                             // frame rate = 25 fps

    // create bubbles with random position and push the bubble objects into global array
    for (let i = 0; i < bubbleNum; i++) {
        // devide the canvas into six segment. Bubbles' initial location is at the center of each segment
        let segCol = i % canvasWidthSegNum;                    // determine column
        let segRow = floor(i / canvasWidthSegNum);             // determine row
        let colPos = (segCol + 0.5) * canvasWidthSegLen;       // x position
        let rowPos = (segRow + 0.5) * canvasHeightSegLen;      // y position
        bubble = new Bubbles(i, colPos, rowPos, bubbleDiameter, random(speedDir) * random(speedOpt), random(speedDir) * random(speedOpt), bubbleArr, "color");
        bubbleArr.push(bubble);
    }
}

// Bubble class 
class Bubbles {
    // Bubble class constructor
    constructor(id, centerX, centerY, diameter, speedX, speedY, bubbleArr, color = "white") {
        this.centerX = centerX;
        this.centerY = centerY;
        this.diameter = diameter;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.otherBubbles = bubbleArr;
        this.id = id;
        this.stopOrNot = false;
    }

    // move the bubble with pre-defined speed
    move() {
        // if the bubble is stopped, give it random kick!
        if (true === this.stopOrNot) {
            this.stopOrNot = false;
            this.speedX = random(speedOpt) * random(speedDir);
            this.speedY = random(speedOpt) * random(speedDir);
        }
        // update the bubble position with speed
        this.centerX += this.speedX;
        this.centerY += this.speedY;

        // if the bubble is hitting the canvas boundary, change the speed direction
        if ((this.centerX - this.diameter / 2) < bubbleWeight || (this.centerX + this.diameter / 2) > width - bubbleWeight) {
            this.speedX *= -1;
        }
        if ((this.centerY - this.diameter / 2) < bubbleWeight || (this.centerY + this.diameter / 2) > height - bubbleWeight) {
            this.speedY *= -1;
        }
    }

    // show bubble
    show() {
        // create bubble as ellipse
        stroke(255);                            // bubble stroke color white (can be adjusted)
        strokeWeight(bubbleWeight);             // bubble stroke weight 5 px
        noFill();                               // no fill 
        ellipse(this.centerX, this.centerY, this.diameter, this.diameter);

        // show the stress level as a number on bubble
        let textColor = color(255, 255, 255)                                             // white text. can change later
        fill(textColor);                                                                 // set fill color
        textSize(bubbleTextSize);                                                        // set font size 
        textAlign(CENTER);                                                               // center align the text
        text((this.id + 1).toString(), this.centerX, this.centerY + bubbleTextSize / 4);     // show stress level, adjust text to be at bubble center
    }

    // bouncing algorithm for bubbles
    collide() {
        // check if other bubbles are colliding with this bubble
        for (let idx = this.id + 1; idx < this.otherBubbles.length; idx++) {
            let dx = this.centerX - this.otherBubbles[idx].centerX;
            let dy = this.centerY - this.otherBubbles[idx].centerY;
            let dist = sqrt(dx * dx + dy * dy);
            let minDist = this.diameter / 2 + this.otherBubbles[idx].diameter / 2 + bubbleWeight;
            if (dist > minDist) {
                // do nothing if this bubble is not colliding with other bubbles
                continue;
            } else {
                // update the speed for both bubbles according to the colliding directions
                // This is a pseudo-momentum conservative model. It only works when 
                // the bubble moves very very slow
                let newSpeedX = dx / max(abs(dx), abs(dy));
                let newSpeedY = dy / max(abs(dx), abs(dy));
                this.speedX = newSpeedX;
                this.speedY = newSpeedY;
                this.otherBubbles[idx].speedX = -newSpeedX;
                this.otherBubbles[idx].speedY = -newSpeedY;
            }
        }
    }

    // stop this bubbles
    stop() {
        this.speedX = 0;
        this.speedY = 0;
        this.stopOrNot = true;
    }
}

// Define 2D euclidean distance between two coordinates
function distCalc(x1, y1, x2, y2) {
    return sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

// go to page2 on mouse pressed
function mousePressed() {
    for (let i = 0; i < bubbleArr.length; i++) {
        let mouseDist = distCalc(mouseX, mouseY, bubbleArr[i].centerX, bubbleArr[i].centerY);
        if (mouseDist < bubbleArr[i].diameter / 2) {
            try {
                // build a json structure storing user information and save it to the localStorage
                userInfo = {
                    stressLevel: (bubbleArr[i].id + 1),                                // bubble id as stress level
                    name: "TBD",                                                       // name to be determined for now at front page
                    hoursNeeded: "TBD",                                                // hours needed to be determined
                    zipcode: "TBD"                                                     // zip code to be determined
                };
                window.localStorage.setItem("localuser", JSON.stringify(userInfo));    // use "localuser" as the key for localStorage lookup in the entire site

            } catch (e) {
                console.log("error occurs while saving user info");
                console.log(e);
            }
            window.open("./page2.html", "_self");
        } else {
            // do nothing
        }
    }
}

function draw() {
    // background color black (can be adjusted)
    background('#222222');
    for (let i = 0; i < bubbleArr.length; i++) {
        bubbleArr[i].show();
        bubbleArr[i].collide();
        let mouseDist = distCalc(mouseX, mouseY, bubbleArr[i].centerX, bubbleArr[i].centerY);
        if (mouseDist < bubbleArr[i].diameter / 2) {
            bubbleArr[i].stop();
        } else {
            bubbleArr[i].move();
        }
    }
}

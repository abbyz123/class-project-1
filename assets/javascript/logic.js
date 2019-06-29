// global variables
let bubbleDiameter = 150;                           // bubble diameter
let bubbleArr = [];                                 // bubble arrays
let bubbleNum = 6;                                  // number of bubbles
let speedOpt = [1, 2];                              // bubble speed options
let speedDir = [-1, 1];                             // bubble speed directions

// setup p5 canvas
function setup() {
    // Setup canvas
    let myCanvas = createCanvas(1024, 768);         // 1024 x 768 for standard laptop
    myCanvas.parent('bubbleCanvas');                // canvas under the container
    frameRate(25);                                  // frame rate = 25 fps

    // create bubbles with random position and push the bubble objects into global array
    for (i = 0; i < bubbleNum; i++) {
        bubble = new Bubbles(i, random(bubbleDiameter, width - bubbleDiameter), random(bubbleDiameter, height - bubbleDiameter), bubbleDiameter, random(speedDir) * random(speedOpt), random(speedDir) * random(speedOpt), bubbleArr, "color");
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
        if(true === this.stopOrNot) {
            this.stopOrNot = false;
            this.speedX = random(speedOpt) * random(speedDir);
            this.speedY = random(speedOpt) * random(speedDir);
        }
        // update the bubble position with speed
        this.centerX += this.speedX;
        this.centerY += this.speedY;

        // if the bubble is hitting the canvas boundary, change the speed direction
        if ((this.centerX - this.diameter / 2) < 0 || (this.centerX + this.diameter / 2) > width) {
            this.speedX *= -1;
        }
        if ((this.centerY - this.diameter / 2) < 0 || (this.centerY + this.diameter / 2) > height) {
            this.speedY *= -1;
        }
    }

    // show bubble
    show() {
        stroke(255);                // bubble stroke color white (can be adjusted)
        strokeWeight(5);            // bubble stroke weight 5 px
        noFill();                   // no fill 
        ellipse(this.centerX, this.centerY, this.diameter, this.diameter);
    }

    // bouncing algorithm for bubbles
    collide() {
        // check if other bubbles are colliding with this bubble
        for (let idx = this.id + 1; idx < this.otherBubbles.length; idx++) {
            let dx = this.centerX - this.otherBubbles[idx].centerX;
            let dy = this.centerY - this.otherBubbles[idx].centerY;
            let dist = sqrt(dx * dx + dy * dy);
            let minDist = this.diameter / 2 + this.otherBubbles[idx].diameter / 2;
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

function draw() {
    // background color black (can be adjusted)
    background('#222222');
    for (let i = 0; i < bubbleArr.length; i++) {
        bubbleArr[i].show();
        bubbleArr[i].collide();
        let mouseDist = distCalc(mouseX, mouseY, bubbleArr[i].centerX, bubbleArr[i].centerY);
        if(mouseDist < bubbleArr[i].diameter / 2){
           bubbleArr[i].stop();
        } else {
            bubbleArr[i].move();
        }
    }
}

let bubbleDiameter = 150;
let bubbleArr = [];
let bubbleNum = 6;
let speedOpt = [1, 2];
let speedDir = [-1, -1];

function setup() {
    let myCanvas = createCanvas(1024, 768);
    myCanvas.parent('bubbleCanvas');
    frameRate(25);
    
    for (i = 0; i < bubbleNum; i++) {
        bubble = new Bubbles(i, random(bubbleDiameter, width-bubbleDiameter), random(bubbleDiameter, height-bubbleDiameter), bubbleDiameter, random(speedDir) * random(speedOpt), random(speedDir) * random(speedOpt), bubbleArr, "color");
        bubbleArr.push(bubble);
    }
}


class Bubbles {
    constructor(id, centerX, centerY, diameter, speedX, speedY, bubbleArr, color="white") {
        this.centerX = centerX;
        this.centerY = centerY;
        this.diameter = diameter;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.otherBubbles = bubbleArr;
        this.id = id;
    }

    move() {
        this.centerX += this.speedX;
        this.centerY += this.speedY;

        if ((this.centerX - this.diameter) < 0 || (this.centerX + this.diameter) > width) {
            this.speedX *= -1;
        }
        if ((this.centerY - this.diameter) < 0 || (this.centerY + this.diameter) > height) {
            this.speedY *= -1;
        }
    }

    // move method
    show() {
        // print("entering function show");
        stroke(255);
        strokeWeight(5);
        noFill();
        ellipse(this.centerX, this.centerY, this.diameter, this.diameter);
    }

    collide() {
        //print("entering function collide");
        // check if other bubbles are colliding with this bubble
        for (let idx = this.id + 1; idx < this.otherBubbles.length; idx++) {
            let dx = this.centerX - this.otherBubbles[idx].centerX;
            let dy = this.centerY - this.otherBubbles[idx].centerY;
            let dist = sqrt(dx * dx + dy * dy);
            let minDist = this.diameter/2 + this.otherBubbles[idx].diameter/2;
            if (dist > minDist) {
                continue;
            } else {
                let newSpeedX = dx / max(abs(dx), abs(dy));
                let newSpeedY = dy / max(abs(dx), abs(dy));
                this.speedX = newSpeedX;
                this.speedY = newSpeedY;
                this.otherBubbles[idx].speedX = -newSpeedX;
                this.otherBubbles[idx].speedY = -newSpeedY;
                print("collide");
                print([this.speedX, this.speedY]);
            }
        }
    }

    stop() {
        this.speedX = 0;
        this.speedY = 0;
    }

    hide() {
        noStroke();
        noFill();
    }
}

function draw() {
    background('#222222');
    for (let i = 0; i < bubbleArr.length; i++) {
        bubbleArr[i].show();
        bubbleArr[i].collide();
        bubbleArr[i].move();
    }
}

let bubbleRadius = 150;
let bubbleArr = [];
let bubbleNum = 4;
let speedOpt = [1, 2];
let speedDir = [-1, 1];

function setup() {
    let myCanvas = createCanvas(1024, 768);
    myCanvas.parent('bubbleCanvas');
    
    for (i = 0; i < bubbleNum; i++) {
        bubble = new Bubbles(random(bubbleRadius, width-bubbleRadius), random(bubbleRadius, height-bubbleRadius), bubbleRadius, random(speedDir) * random(speedOpt), random(speedDir) * random(speedOpt), "color");
        bubbleArr.push(bubble);
    }
}

class Bubbles {
    constructor(centerX, centerY, radius, speedX, speedY, color) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }
    // move method
    show() {
        stroke(255);
        strokeWeight(5);
        noFill();
        ellipse(this.centerX, this.centerY, this.radius, this.radius);
    }

    move() {
        this.centerX += this.speedX;
        this.centerY += this.speedY;

        if ((this.centerX - this.radius) < 0 || (this.centerX + this.radius) > width) {
            this.speedX *= -1;
        }
        if ((this.centerY - this.radius) < 0 || (this.centerY + this.radius) > height) {
            this.speedY *= -1;
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
    for (i = 0; i < bubbleArr.length; i++) {
        bubbleArr[i].show();
        bubbleArr[i].move();
    }
}
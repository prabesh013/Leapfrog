mainArea = document.querySelector(".main-area");
mainArea.style.height = 650 + "px";
mainArea.style.width = 650 + "px";
colors = [
  "#99d8d0",
  "#ffa931",
  "#b9ac92",
  "#e79cc2",
  "#99b898",
  "#5a3d55",
  "#84a9ac",
];
var min = 0;
var max = colors.length;
var directionValue = [-1, 1]; //directions
var movement = [3, 3]; //speed
var hw = [20, 25, 30, 35]; //heightwidth array for the circles
let circles = [];

function ball() {
  var self = this;
  this.create = function () {
    this.divSmall = document.createElement("div");
    this.divSmall.setAttribute("class", "box");
    this.heightWidth = hw[Math.floor(Math.random() * hw.length)];

    this.divSmall.style.height = this.heightWidth + "px";
    this.divSmall.style.width = this.heightWidth + "px";
    this.ballRadius = parseInt(this.heightWidth / 2);
    this.divSmall.style.top = Math.floor(Math.random() * 625) + "px";
    this.divSmall.style.left = Math.floor(Math.random() * 625) + "px";
    this.index = Math.floor(Math.random() * (max - min + 1)) + min;
    this.divSmall.style.backgroundColor = colors[this.index];
    mainArea.appendChild(this.divSmall);

    this.dx = directionValue[Math.floor(Math.random() * directionValue.length)];
    this.dy = directionValue[Math.floor(Math.random() * directionValue.length)];

    this.speedX = movement[Math.floor(Math.random() * movement.length)];
    this.speedY = movement[Math.floor(Math.random() * movement.length)];

    this.x = parseInt(this.divSmall.style.left);
    this.y = parseInt(this.divSmall.style.top);
    circles.push(this.divSmall);
  };

  this.move = function () {
    //border collision detection
    if (
      self.x + self.dx * self.speedX > 645 - self.ballRadius ||
      self.x + self.dx * self.speedX < self.ballRadius
    ) {
      self.dx = -self.dx;
    }
    if (
      self.y + self.dy * self.speedY > 645 - self.ballRadius ||
      self.y + self.dy * self.speedY < self.ballRadius
    ) {
      self.dy = -self.dy;
    }
    self.x += self.dx * self.speedX;
    self.y += self.dy * self.speedY;

    self.divSmall.style.top = self.y + "px";
    self.divSmall.style.left = self.x + "px";

    //collision with others
    for (let i = 0; i < circles.length; i++) {
      if (circles[i] === self.divSmall) continue;
      let rect1 = {
        x: self.x,
        y: self.y,
        width: self.heightWidth,
        height: self.heightWidth,
      };
      let rect2 = {
        x: parseInt(circles[i].style.left),
        y: parseInt(circles[i].style.top),
        width: parseInt(circles[i].style.width),
        height: parseInt(circles[i].style.height),
      };

      if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      ) {
        self.dx = -self.dx;
        self.dy = -self.dy;
        self.x += self.dx * self.speedX;
        self.y += self.dy * self.speedY;

        self.divSmall.style.top = self.y + "px";
        self.divSmall.style.left = self.x + "px";
      }
    }
  };
}

var b = [];
//creating balls
for (let i = 0; i < 20; i++) {
  b[i] = new ball();
  b[i].create();
}
for (let i = 0; i < 20; i++) {
  setInterval(b[i].move, 1000 / 60);
}

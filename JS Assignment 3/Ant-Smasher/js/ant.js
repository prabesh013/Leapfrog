mainArea = document.querySelector(".main-area");
mainArea.style.height = 650 + "px";
mainArea.style.width = 650 + "px";

var counter = 0;
var directionValue = [-1, 1]; //directions
var movement = [1, 2]; //speed
let circles = [];

function ball() {
  var self = this;
  this.create = function () {
    this.divSmall = document.createElement("div");
    this.divSmall.setAttribute("class", "box");

    this.heightWidth = 35;

    this.divSmall.style.height = this.heightWidth + "px";
    this.divSmall.style.width = this.heightWidth + "px";
    this.ballRadius = parseInt(this.heightWidth / 2);
    this.divSmall.style.top = Math.floor(Math.random() * 625) + "px";
    this.divSmall.style.left = Math.floor(Math.random() * 625) + "px";

    mainArea.appendChild(this.divSmall);

    this.img = document.createElement("img");
    this.img.setAttribute("class", "ant-images");
    this.img.setAttribute("src", "./img/ant.png");

    this.divSmall.appendChild(this.img);

    this.divSmall.addEventListener("click", function () {
      counter++;
      self.divSmall.removeChild(self.img);
      mainArea.removeChild(self.divSmall);
    });

    this.dx = directionValue[Math.floor(Math.random() * directionValue.length)];
    this.dy = directionValue[Math.floor(Math.random() * directionValue.length)];

    this.speedX = movement[Math.floor(Math.random() * movement.length)];
    this.speedY = movement[Math.floor(Math.random() * movement.length)];

    this.x = parseInt(this.divSmall.style.left);
    this.y = parseInt(this.divSmall.style.top);
    circles.push(this.divSmall);
  };

  //   this.touching = function (circle) {};

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
  };
  function check() {
    var rect1 = { x: self.x, y: self.y, width: 35, height: 35 };
    var rect2 = { x: 20, y: 10, width: 10, height: 10 };

    if (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    ) {
      // collision detected!
    }
  }
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

body = document.querySelector("body");
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

    this.heightWidth = 30;

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
      if (counter === 20) {
        alert("YOU WON!!!");
      }
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
    body.querySelector(".count").querySelector("span").innerText = counter;
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

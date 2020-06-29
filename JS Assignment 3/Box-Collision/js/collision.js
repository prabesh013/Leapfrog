mainArea = document.querySelector(".main-area");
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
var directionValue = [-1, 1];
var movement = [1, 2];
var hw = [20, 25, 30, 35];

function ball() {
  var self = this;
  this.divSmall = document.createElement("div");
  this.divSmall.setAttribute("class", "box");
  this.heightWidth = hw[Math.floor(Math.random() * hw.length)];
  this.divSmall.style.height = this.heightWidth + "px";
  this.divSmall.style.width = this.heightWidth + "px";
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

  this.move = function () {
    self.x += self.dx * self.speedX;
    self.y += self.dy * self.speedY;
    self.divSmall.style.top = self.y + "px";
    self.divSmall.style.left = self.x + "px";
  };
}
// var b = [];
// for (let i = 0; i < 50; i++) {
//   b[i] = new ball();
// }

var b1 = new ball();
setInterval(b1.move, 1000 / 60);

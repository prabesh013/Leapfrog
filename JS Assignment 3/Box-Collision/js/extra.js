var b2 = new ball();
setInterval(b2.move, 1000 / 60);
var b3 = new ball();
setInterval(b3.move, 1000 / 60);
var b4 = new ball();
setInterval(b4.move, 1000 / 60);
var b5 = new ball();
setInterval(b5.move, 1000 / 60);
var b6 = new ball();
setInterval(b6.move, 1000 / 60);
var b7 = new ball();
setInterval(b7.move, 1000 / 60);
var b8 = new ball();
setInterval(b8.move, 1000 / 60);
var b9 = new ball();
setInterval(b9.move, 1000 / 60);
var b10 = new ball();
setInterval(b10.move, 1000 / 60);
var b11 = new ball();
setInterval(b11.move, 1000 / 60);
var b12 = new ball();
setInterval(b12.move, 1000 / 60);
var b13 = new ball();
setInterval(b13.move, 1000 / 60);
var b14 = new ball();
setInterval(b14.move, 1000 / 60);
var b15 = new ball();
setInterval(b15.move, 1000 / 60);
var b16 = new ball();
setInterval(b16.move, 1000 / 60);
var b17 = new ball();
setInterval(b17.move, 1000 / 60);
var b18 = new ball();
setInterval(b18.move, 1000 / 60);
var b19 = new ball();
setInterval(b19.move, 1000 / 60);
var b20 = new ball();
setInterval(b20.move, 1000 / 60);

let check = false;
let circle1 = {
  radius: self.ballRadius,
  x: self.x + self.ballRadius,
  y: self.y + self.ballRadius,
};
for (let i = 0; i < circle.length; i++) {
  let r = parseInt(circles[i].style.width) / 2;
  let x_r = parseInt(circles[i].style.left) + r;
  let y_r = parseInt(circles[i].style.top) + r;
  let circle2 = {
    radius: r,
    x: x_r,
    y: y_r,
  };
  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < circle1.radius + circle2.radius) {
    self.dx = -self.dx;
    self.dy = -self.dy;
  }
}
self.x += self.dx * self.speedX;
self.y += self.dy * self.speedY;

self.divSmall.style.top = self.y + "px";
self.divSmall.style.left = self.x + "px";

let circle1 = {
  radius: self.ballRadius,
  x: self.x + self.ballRadius,
  y: self.y + self.ballRadius,
};
for (let i = 0; i < circles.length; i++) {
  let r = parseInt(circles[i].style.width) / 2;
  let x_r = parseInt(circles[i].style.left) + r;
  let y_r = parseInt(circles[i].style.top) + r;
  let circle2 = {
    radius: r,
    x: x_r,
    y: y_r,
  };
  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < circle1.radius + circle2.radius) {
    self.dx = -self.dx;
    self.dy = -self.dy;
    self.x += self.dx * self.speedX;
    self.y += self.dy * self.speedY;

    self.divSmall.style.top = self.y + "px";
    self.divSmall.style.left = self.x + "px";
  }
}

//some unused codes

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

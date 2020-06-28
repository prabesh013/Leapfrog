var container = document.createElement("div");
container.setAttribute("class", "container");

var body = document.getElementsByTagName("body")[0];
body.appendChild(container);

var ball = document.createElement("div");
ball.setAttribute("class", "ball");
container.appendChild(ball);
var b = document.querySelector(".ball");

ball.style.backgroundColor = "red";
ball.style.top = "0px";

// console.log(container.offsetHeight);
setInterval(function () {
  // var top = parseInt(ball.style.top);
  var p = 0;
  // if (touchingTop(top) && !touchingBottom(top)) {
  //   p = 10;
  // } else if (touchingBottom(top) && !touchingTop(top)) {
  //   p = -10;
  // }

  ball.style.top = p + "px";
  p = p + 10;
}, 20);

function touchingTop(t) {
  if (t === 0) {
    return true;
  }
  return false;
}
function touchingBottom(t) {
  if (t === 440) {
    return true;
  }
  return false;
}
//   if () {
// ball.style.top = top - 10 + "px";
//   } else(top) {
//     ball.style.top = top + 10 + "px";
//   }

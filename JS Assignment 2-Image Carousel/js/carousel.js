var container = document.querySelector(".carousel-container");

//inserting clearfix
var wrapper = document.querySelector(".carousel-image-wrapper");
wrapper.classList.add("clearfix");

//adding indicators
var indicator = document.createElement("div");
indicator.classList.add("indicator");
container.insertAdjacentElement("afterend", indicator);

// creating left button
var arrowLeft = document.createElement("div");
arrowLeft.className = "arrow";
arrowLeft.id = "arrow-left";

// creating right button
var arrowRight = document.createElement("div");
arrowRight.className = "arrow";
arrowRight.id = "arrow-right";

// inserting the buttons
wrapper.insertAdjacentElement("beforebegin", arrowLeft);
wrapper.insertAdjacentElement("beforebegin", arrowRight);

//floating the images
images = document.querySelectorAll("img");
len = images.length;
for (var i = 0; i < len; i++) {
  images[i].classList.add("slide-image");
}
//making wrapper fit all images
wrapper.style.width = len * images[0].width + "px";

var current = 0;
var first = 0;
var last = len - 1;
var timer;

//adding dots via JS
function addDots() {
  for (var i = 0; i < len; i++) {
    var span = document.createElement("span");
    span.classList.add("dot");
    document.querySelector(".indicator").appendChild(span);
  }
}
addDots();

//making dots clickable
var spans = document.querySelectorAll(".indicator .dot");
for (let i = 0; i < len; i++) {
  spans[i].addEventListener("click", function () {
    moveSlide(i);
  });
}

function moveSlide(c) {
  current = c;
  makeActive(current);
  wrapper.style.left = images[0].width * -current + "px";
}

function makeActive(c) {
  var active = document.querySelector("#active");
  if (active != null) {
    active.removeAttribute("id");
  }
  spans[c].id = "active";
}
//first dot active
makeActive(current);

// adding event listeners
arrowLeft.addEventListener("click", slideLeft);
arrowRight.addEventListener("click", slideRight);

//reseting current position
function checkCurrent(c) {
  if (c === -1) {
    return last;
  } else if (c === len) {
    return first;
  } else {
    return c;
  }
}

function slideLeft() {
  current--;
  current = checkCurrent(current);
  makeActive(current);
  wrapper.style.left = images[0].width * -current + "px";
}
function slideRight() {
  current++;
  current = checkCurrent(current);
  makeActive(current);
  wrapper.style.left = images[0].width * -current + "px";
  // incremtal(current);
}

function slideShow() {
  slideRight();
}
timer = setInterval(slideShow, 3000);

// function incremtal(current) {
//   clearInterval(timer);
//   var left = parseInt(wrapper.style.left);
//   var total = images[0].width * -current;
//   var sliding = setInterval(function () {
//     left = left + 10;
//     wrapper.style.left = left + "px";
//     if (-left % images[0].width === 0) {
//       clearInterval(sliding);
//     }
//     slideShow();
//   }, 1000 / 60);
// }

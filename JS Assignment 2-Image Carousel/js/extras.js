var container = document.querySelector(".carousel-container");

//inserting clearfix
var wrapper = document.querySelector(".carousel-image-wrapper");
wrapper.classList.add("clearfix");

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

images = document.querySelectorAll("img");
len = images.length;
for (var i = 0; i < len; i++) {
  images[i].classList.add("slide-image");
}
wrapper.style.width = len * images[0].width + "px";

var current = 0;
var first = 0;
var last = len - 1;
var timer;

addDots();

function addDots() {
  for (var i = 0; i < len; i++) {
    var span = document.createElement("span");
    span.classList.add("dot");
    span.addEventListener(
      "click",
      (function () {
        var a = i;
        return function () {
          moveSlide(a);
        };
      })()
    );
    document.querySelector(".indicator").appendChild(span);
  }
  slideShow();
}
// function slideShow() {
//   var dots = document.querySelectorAll(".dot");
//   var active = document.querySelector(".active");

//   //ensure only 1 element of active
//   if (active != null) {
//     active.classList.remove("active");
//   }

//   if (current === len) {
//     current = 0;
//   }
//   wrapper.style.left = images[0].width * -current + "px";
//   dots[current].classList.add("active");
//   current++;
//   timer = setTimeout(slideShow, 3000);
// }
function slideShow() {
  slideRight();
  timer = setTimeout(slideShow, 3000);
}

function moveSlide(num) {
  current = num;
  clearTimeout(timer);
  slideShow();
}

function checkCurrent(c) {
  if (c === -1) {
    return last;
  } else if (c === len) {
    return first;
  } else {
    return c;
  }
}

// adding event listeners
arrowLeft.addEventListener("click", slideLeft);
arrowRight.addEventListener("click", slideRight);

var dots = document.querySelectorAll(".dot");
var active = document.querySelector(".active");

function slideLeft() {
  clearTimeout(timer);

  current--;
  current = checkCurrent(current);
  //ensure only 1 element of active
  if (active != null) {
    active.classList.remove("active");
  }
  wrapper.style.left = images[0].width * -current + "px";
  dots[current].classList.add("active");
  timer = setTimeout(slideShow, 3000);
}
function slideRight() {
  clearTimeout(timer);
  current++;
  current = checkCurrent(current);

  //ensure only 1 element of active
  if (active != null) {
    active.classList.remove("active");
  }
  wrapper.style.left = images[0].width * -current + "px";
  dots[current].classList.add("active");
  timer = setTimeout(slideShow, 3000);
}

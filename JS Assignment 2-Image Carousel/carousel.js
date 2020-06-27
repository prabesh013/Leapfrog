var container = document.querySelector(".carousel-container");

//inserting clearfix
wrapper = document.querySelector(".carousel-image-wrapper");
wrapper.classList.add("clearfix");

//finding number of images
var images = document.querySelectorAll("img");
len = images.length;
// setting the wrapper width
wrapper.style.width = (len + 2) * images[0].width + "px";
// floating every image
for (var i = 0; i < len; i++) {
  images[i].classList.add("slide-image");
}

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

var current = 0;
var first = 0;
var last = len - 1;

// cloning 1st and last image
var firstClone = document.createElement("img");
firstClone.classList.add("slide-image");
firstClone.id = "first-clone";
firstClone.setAttribute("src", images[0].src);

var lastClone = document.createElement("img");
lastClone.classList.add("slide-image");
lastClone.id = "last-clone";
lastClone.setAttribute("src", images[len - 1].src);

wrapper.insertBefore(lastClone, images[0]);
wrapper.appendChild(firstClone);

// function checkCurrent(c) {
//   if (c === -1) {
//     return last;
//   } else if (c === len) {
//     return first;
//   } else {
//     return c;
//   }
// }

// adding event listeners
arrowLeft.addEventListener("click", slideLeft);
arrowRight.addEventListener("click", slideRight);

arrowLeft.addEventListener("dblclick", function () {
  return;
});
arrowRight.addEventListener("dblclick", function () {
  return;
});

// var currentLeft = parseInt(wrapper.style.left);
var currentLeft = -images[0].width;
wrapper.style.left = currentLeft + "px";

function slideRight() {
  current++;
  if (current === len) {
    current = 0;
    wrapper.style.left = 0 + "px";
    currentLeft = 0;
  }
  var left = currentLeft;
  var timer = setInterval(function () {
    left = left - 10;
    wrapper.style.left = left + "px";

    currentLeft = parseInt(wrapper.style.left);
    if (-left % images[0].width === 0) {
      clearInterval(timer);
    }
  }, 1000 / 60);
}

function slideLeft() {
  current--;
  if (current === -1) {
    current = len - 1;
    wrapper.style.left = images[0].width * -(current + 2) + "px";
    currentLeft = images[0].width * -(current + 2);
  }
  var left = currentLeft;

  var timer = setInterval(function () {
    left = left + 10;
    wrapper.style.left = left + "px";

    currentLeft = parseInt(wrapper.style.left);

    if (left % images[0].width === 0) {
      clearInterval(timer);
    }
  }, 1000 / 60);
}

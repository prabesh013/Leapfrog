// creating left button
var arrowLeft = document.createElement("div");
arrowLeft.className = "arrow";
arrowLeft.id = "arrow-left";

// creating right button
var arrowRight = document.createElement("div");
arrowRight.className = "arrow";
arrowRight.id = "arrow-right";

//inserting clearfix
wrapper = document.querySelector(".carousel-image-wrapper");
wrapper.classList.add("clearfix");

var images = document.querySelectorAll("img");
len = images.length;
// wrapper.style.width = len * images[0].width;

// var container = document.querySelector(".carousel-container");
//inserting the buttons
// images[0].insertAdjacentElement("beforebegin", arrowLeft);
// images[len - 1].insertAdjacentElement("afterend", arrowRight);
wrapper.insertAdjacentElement("beforebegin", arrowLeft);
wrapper.insertAdjacentElement("beforebegin", arrowRight);

for (var i = 0; i < len; i++) {
  images[i].classList.add("slide-image");
}

var current = 0;
var first = 0;
var last = len - 1;

// arrowLeft = document.querySelector("#btn-left");
// arrowRight = document.querySelector("#btn-right");
function checkCurrent(c) {
  if (c === -1) {
    return last;
  } else if (c === len) {
    return first;
  } else {
    return c;
  }
}

arrowLeft.addEventListener("click", slideLeft);
arrowRight.addEventListener("click", slideRight);

function slideLeft() {
  //   console.log("left");
  current--;
  current = checkCurrent(current);
  console.log(current);
  wrapper.style.left = images[0].width * -current + "px";
  //   wrapper.style.marginLeft = -images[0].width;
  //   wrapper.style.marginRight = -images[0].width;
}
function slideRight() {
  //   console.log("right");
  current++;
  current = checkCurrent(current);
  console.log(current);
  wrapper.style.left = images[0].width * -current + "px";
  //   wrapper.style.marginRight = images[0].width;
  //   wrapper.style.marginLeft = -images[0].width;
}

//creating left button
var arrowLeft = document.createElement("div");
arrowLeft.className = "arrow";
arrowLeft.id = "arrow-left";

//creating right button
var arrowRight = document.createElement("div");
arrowRight.className = "arrow";
arrowRight.id = "arrow-right";

var images = document.querySelectorAll("img");
len = images.length;

//inserting clearfix
wrapper = document.querySelector(".carousel-image-wrapper");
wrapper.style.width = len * images[0].width;

wrapper.classList.add("clearfix");

inserting the buttons
var container = document.querySelector(".carousel-container");

images[0].insertAdjacentElement("beforebegin", arrowLeft);
images[len - 1].insertAdjacentElement("afterend", arrowRight);

// for (var i = 0; i < len; i++) {
//   images[i].className = "slide-image";
// }

var count = 0;

arrowLeft.addEventListener("click", slideLeft);
arrowRight.addEventListener("click", slideRight);

function slideLeft() {
  console.log("left");
}
function slideRight() {
  console.log("right");
}

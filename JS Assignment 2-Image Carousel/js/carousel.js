var containerOne = document.querySelector("#container_one");
var containerTwo = document.querySelector("#container_two");
var containerThree = document.querySelector("#container_three");
var containerFour = document.querySelector("#container_four");

function Carousel(container, ho = 0, tr = 0) {
  var wrapper = container.querySelector(".carousel-image-wrapper");
  wrapper.classList.add("clearfix");

  images = wrapper.querySelectorAll("img");
  len = images.length;
  var current = 0;
  var first = 0;
  var last = len - 1;
  var timer;
  wrapper.style.width = len * images[0].width + "px";

  dots(container, wrapper, len);
  b = buttons(container, wrapper, current, len);
  //first dot active
  makeActive(container, current);
  timer = setInterval(function () {
    console.log(container);
  }, 3000);
}
var hold;
var transition;
var c1 = new Carousel(containerOne, hold, transition);
var c2 = new Carousel(containerTwo);
var c3 = new Carousel(containerThree);
var c4 = new Carousel(containerFour);

function buttons(c, w, p, l) {
  // creating left button
  var arrowLeft = document.createElement("div");
  arrowLeft.className = "arrow";
  arrowLeft.id = "arrow-left";

  // creating right button
  var arrowRight = document.createElement("div");
  arrowRight.className = "arrow";
  arrowRight.id = "arrow-right";

  // inserting the buttons
  w.insertAdjacentElement("beforebegin", arrowLeft);
  w.insertAdjacentElement("beforebegin", arrowRight);

  // adding event listeners
  arrowLeft.addEventListener("click", slideLeft);
  arrowRight.addEventListener("click", slideRight);
  //reseting current position
  function checkCurrent(pointer) {
    if (pointer === -1) {
      return l - 1;
    } else if (pointer === l) {
      return 0;
    } else {
      return pointer;
    }
  }

  function slideLeft() {
    p--;
    p = checkCurrent(p);
    makeActive(c, p);
    w.style.left = images[0].width * -p + "px";
  }
  function slideRight() {
    p++;
    p = checkCurrent(p);
    makeActive(c, p);
    w.style.left = images[0].width * -p + "px";
    // incremtal(current);
  }
}
function dots(c, w, l) {
  //adding indicators
  var indicator = document.createElement("div");
  indicator.classList.add("indicator");
  w.insertAdjacentElement("afterend", indicator);

  for (var i = 0; i < l; i++) {
    var span = document.createElement("span");
    span.classList.add("dot");
    c.querySelector(".indicator").appendChild(span);
  }
  var spans = c.querySelectorAll(".indicator .dot");
  for (let i = 0; i < l; i++) {
    spans[i].addEventListener("click", function () {
      current = i;
      makeActive(c, current);
      w.style.left = images[0].width * -current + "px";
    });
  }
}

function makeActive(ctner, c) {
  var spans = ctner.querySelectorAll(".indicator .dot");
  var active = ctner.querySelector("#active");
  if (active != null) {
    active.removeAttribute("id");
  }
  spans[c].id = "active";
}

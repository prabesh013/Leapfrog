var containerOne = document.querySelector("#container_one");
var containerTwo = document.querySelector("#container_two");
var containerThree = document.querySelector("#container_three");
var containerFour = document.querySelector("#container_four");

function Carousel(container, ho = 1000, tr = 0) {
  var self = this;
  this.ho = ho;
  this.container = container;
  this.wrapper = container.querySelector(".carousel-image-wrapper");
  this.wrapper.classList.add("clearfix");

  images = this.wrapper.querySelectorAll("img");
  this.len = images.length;
  this.current = 0;
  this.first = 0;
  this.last = this.len - 1;
  this.timer;
  this.wrapper.style.width = this.len * images[0].width + "px";

  this.dots = dots;
  this.buttons = buttons;
  this.makeActive = makeActive;

  this.dots(this.container, this.wrapper, this.len);
  this.buttons(this.container, this.wrapper, self.current, this.len);
  //first dot active
  this.makeActive(this.container, this.current);

  //reseting current position
  function checkCurrent(pointer) {
    if (pointer === -1) {
      return self.last;
    } else if (pointer === self.len) {
      return 0;
    } else {
      return pointer;
    }
  }

  self.slideShow = function () {
    self.current++;
    self.current = checkCurrent(self.current);
    self.makeActive(self.container, self.current);
    self.wrapper.style.left = images[0].width * -self.current + "px";
  };
  this.timer = setInterval(self.slideShow, this.ho);

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
}
// var hold;
// var transition;
var c1 = new Carousel(containerOne, 2200, 0);
var c2 = new Carousel(containerTwo, 2500, 0);
var c3 = new Carousel(containerThree, 2800, 0);
var c4 = new Carousel(containerFour, 3200, 0);

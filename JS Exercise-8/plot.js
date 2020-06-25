var divElement = document.createElement("div");
divElement.setAttribute("class", "container");

var body = document.getElementsByTagName("body")[0];
body.appendChild(divElement);

var divSmall = [];

for (var i = 0; i < 5; i++) {
  divSmall[i] = document.createElement("div");
  divSmall[i].setAttribute("class", "small");
  divSmall[i].style.top = Math.floor(Math.random() * 495) + "px";
  divSmall[i].style.left = Math.floor(Math.random() * 495) + "px";
  divElement.appendChild(divSmall[i]);
}

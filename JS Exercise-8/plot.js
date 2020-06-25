var divElement = document.createElement("div");
divElement.setAttribute("class", "container");

var body = document.getElementsByTagName("body")[0];
body.appendChild(divElement);

var x = [];
var y = [];
for (var i = 0; i < 5; i++) {
  x[i] = Math.random() * 500;
  y[i] = Math.random() * 500;
}

var divSmall = document.createElement("div");
divSmall.setAttribute("class", "small");

for (var j = 0; j < 5; j++) {
  divSmall.style.top = y[j];
  divSmall.style.left = x[j];
  divElement.appendChild(divSmall);
}

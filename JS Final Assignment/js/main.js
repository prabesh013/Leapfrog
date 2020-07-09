// //Document Object Model Selector Constants
// const container = document.querySelector(".container");
// const main = document.querySelector(".main");
// const expressionArea = document.querySelector(".expression");
// const drawing = document.querySelector(".drawingArea");

// const canvas = document.querySelector("#drawing-sheet");
// const ctx = canvas.getContext("2d");

// //clears the canvas
// const button = document.querySelector(".clear-btn");
// button.addEventListener("click", function () {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = "#00000";
//   ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//   playing = false;
// });

// //drawing Logic

// //initial position
// let currentX = 0;
// let currentY = 0;
// let previousX = 0;
// let previousY = 0;

// //until clicked n the canvas area, shouldn't draw anything even if mouse moves
// let playing = false;

// //basic styling for canvas
// ctx.fillStyle = "#00000";
// ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
// ctx.strokeStyle = "#ffffff";
// ctx.lineWidth = 7;
// ctx.lineJoin = "round";

// //only when mouse is clicked in the canvas get current positions and drawing starts
// canvas.addEventListener("mousedown", function (e) {
//   playing = true;
//   currentX = e.clientX - canvas.offsetLeft;
//   currentY = e.clientY - canvas.offsetTop;
// });

// //drawing stop as soon as mouse is "unclicked"
// canvas.addEventListener("mouseup", function (e) {
//   playing = false;
// });

// //this draws the line from previous position to current position
// canvas.addEventListener("mousemove", function (e) {
//   if (playing) {
//     previousX = currentX;
//     previousY = currentY;
//     currentX = e.clientX - canvas.offsetLeft;
//     currentY = e.clientY - canvas.offsetTop;
//     draw();
//   }
// });

// function draw() {
//   ctx.beginPath();
//   ctx.moveTo(previousX, previousY);
//   ctx.lineTo(currentX, currentY);
//   ctx.closePath();
//   ctx.stroke();
// }

// //generating random number
// function randInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// let first = randInt(0, 5);
// let second = randInt(0, 4);

// let answer = first + second;
// let expression = `${first} + ${second}`;

// let p = document.createElement("p");
// let text = document.createTextNode(expression);
// p.appendChild(text);
// expressionArea.appendChild(p);

// const viewImage = document.querySelector(".view-image");
// let image = document.createElement("img");
// const playButton = document.querySelector(".play-btn");

// const imageCanvas = document.querySelector("#another");
// const imageCanvasContext = imageCanvas.getContext("2d");

// var pixel = null;
// var data = null;
// var imageRComponent = [];

// playButton.addEventListener("click", function () {
//   const dataURL = canvas.toDataURL();
//   image.style.display = "inline-block";
//   image.setAttribute("src", dataURL);
//   image.style.height = "28px";
//   image.style.width = "28px";
//   viewImage.appendChild(image);
//   imageCanvasContext.drawImage(image, 0, 0, 28, 28);
//   viewImage.appendChild(imageCanvas);
//   // var myImageData = imageCanvasContext.createImageData(width, height);
//   pixel = imageCanvasContext.getImageData(0, 0, 28, 28);
//   data = pixel.data;
//   rComponent();
//   logic(imageRComponent);
// });

// var rComponent = function () {
//   let counter = 0;
//   for (var i = 0; i < data.length; i += 4) {
//     imageRComponent[counter] = data[i];
//     counter++;
//   }
//   console.log(counter);
// };

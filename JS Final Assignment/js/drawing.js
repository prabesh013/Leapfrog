// Document Object Model Selector Constants
//main elements from html
const container = document.querySelector(".container");
const main = document.querySelector(".main");
const expressionArea = document.querySelector(".expression");
const drawing = document.querySelector(".drawingArea");
const viewImage = document.querySelector(".view-image");

//referencing the canvas
const canvas = document.querySelector("#drawing-sheet");
const ctx = canvas.getContext("2d");

//drawing Logic

//initial position
let currentX = 0;
let currentY = 0;
let previousX = 0;
let previousY = 0;

//until clicked n the canvas area, shouldn't draw anything even if mouse moves
let playing = false;

//basic styling for canvas
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
ctx.strokeStyle = "#ffffff";
ctx.lineWidth = 14;
ctx.lineJoin = "round";

//only when mouse is clicked in the canvas get current positions and drawing starts
canvas.addEventListener("mousedown", function (e) {
  playing = true;
  currentX = e.clientX - canvas.offsetLeft;
  currentY = e.clientY - canvas.offsetTop;
});

//drawing stop as soon as mouse is "unclicked"
canvas.addEventListener("mouseup", function (e) {
  playing = false;
});

//this draws the line from previous position to current position
canvas.addEventListener("mousemove", function (e) {
  if (playing) {
    previousX = currentX;
    previousY = currentY;
    currentX = e.clientX - canvas.offsetLeft;
    currentY = e.clientY - canvas.offsetTop;
    draw();
  }
});

function draw() {
  ctx.beginPath();
  ctx.moveTo(previousX, previousY);
  ctx.lineTo(currentX, currentY);
  ctx.closePath();
  ctx.stroke();
}
//clears the canvas
const button = document.querySelector(".clear-btn");
button.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  playing = false;
});

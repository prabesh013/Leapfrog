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
ctx.lineWidth = 7;
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
  imageDrawingData = null;
  data = null;
  imageGrayScaleData = null;
  newData = null;
});

//get image Data
const imgDataButton = document.querySelector(".img-data-btn");
let imageDrawingData = null;
let data = null;
imgDataButton.addEventListener("click", function () {
  imageDrawingData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageDrawingData);
  data = imageDrawingData.data;
  imageOneComponent = [];
  reshapeImage = [];
});

let grayscalebtn = document.querySelector(".grayscalebtn");
grayscalebtn.addEventListener("click", grayscale);

let outputCanvas = document.createElement("CANVAS");
let outputCtx = outputCanvas.getContext("2d");
// outputCanvas.width = imageDrawingData.width;
// outputCanvas.height = imageDrawingData.height;
outputCanvas.width = canvas.width;
outputCanvas.height = canvas.height;

let imageGrayScaleData = null;
let newData = null;

function grayscale() {
  imageGrayScaleData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  newData = imageGrayScaleData.data;

  for (let i = 0; i < newData.length; i += 4) {
    // var avg = (newData[i] + newData[i + 1] + newData[i + 2]) / 3;
    let avg = Math.floor(
      0.299 * newData[i] + 0.587 * newData[i + 1] + 0.114 * newData[i + 2]
    );
    newData[i] = avg; // red
    newData[i + 1] = avg; // green
    newData[i + 2] = avg; // blue
  }
  outputCtx.putImageData(imageGrayScaleData, 0, 0);
  console.log(imageGrayScaleData);
  // viewImage.appendChild(outputCanvas);
}
let imageOneComponent = [];
const blackWhitebtn = document.querySelector(".blackwhitebtn");
blackWhitebtn.addEventListener("click", blackWhite);

//thresholding
//increasing contrast

// The conversion of a gray scale image into black or white, so called binary image is called binarization
// The simplest way of binarization is thresholding;
const threshold = 150;

function blackWhite() {
  console.log("hi");
  let counter = 0;
  for (var i = 0; i < newData.length; i += 4) {
    if (newData[i] > threshold) {
      imageOneComponent[counter] = 255;
    } else {
      imageOneComponent[counter] = 0;
    }
    counter++;
  }
  console.log(imageOneComponent);
  console.log(imageOneComponent.length);
}

let reshapebtn = document.querySelector(".reshapebtn");
reshapebtn.addEventListener("click", reshape);

let reshapeImage = [];
const imageSIZE = 420;
function reshape() {
  let offset = 0;
  for (let i = 0; i < imageSIZE; i++) {
    let oneRow = [];
    for (let j = 0; j < imageSIZE; j++) {
      oneRow.push(imageOneComponent[offset + j]);
    }
    reshapeImage.push(oneRow);
    offset = offset + imageSIZE;
  }
  console.log(reshapeImage);
}

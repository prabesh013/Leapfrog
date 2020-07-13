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
ctx.strokeStyle = "#99ff99";
ctx.lineWidth = 5;
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
const imageWidth = 420;
const imageHeight = 210;
function reshape() {
  let offset = 0;
  for (let i = 0; i < imageHeight; i++) {
    let oneRow = [];
    for (let j = 0; j < imageWidth; j++) {
      oneRow.push(imageOneComponent[offset + j]);
    }
    reshapeImage.push(oneRow);
    offset = offset + imageWidth;
  }
  console.log(reshapeImage);
}

let hsumbtn = document.querySelector(".hsumbtn");
hsumbtn.addEventListener("click", hsum);

let horizontal_sum = [];
function hsum() {
  for (let i = 0; i < imageWidth; i++) {
    let sum = 0;
    for (let j = 0; j < imageHeight; j++) {
      sum = sum + reshapeImage[j][i];
    }
    horizontal_sum.push(sum);
  }
  console.log(horizontal_sum);
  console.log(horizontal_sum.length);
}

let leftArray = [];
let rightArray = [];

let findhbtn = document.querySelector(".findhbtn");
findhbtn.addEventListener("click", findh);
function findh() {
  let left = 0;
  let right = 0;
  for (let j = 0; j < imageWidth - 1; j++) {
    if (horizontal_sum[j] == 0 && horizontal_sum[j + 1] > 0) {
      left = j + 1;
      leftArray.push(left);
    }
    if (horizontal_sum[j] > 0 && horizontal_sum[j + 1] == 0) {
      right = j;
      rightArray.push(right);
    }
  }
  console.log(leftArray);
  console.log(rightArray);
}

let showImagebtn = document.querySelector(".showImage");
showImagebtn.addEventListener("click", showImage);

let listOfHorizontalCanvas = [];
function showImage() {
  let sourceimage = canvas;
  for (let i = 0; i < leftArray.length; i++) {
    let crops = document.createElement("CANVAS");
    // crops.height = crops.width = 0;
    let x = rightArray[i] - leftArray[i];
    // let y = bottomArray[i] - topArray[i];

    let cropsContext = crops.getContext("2d");
    crops.width = x;
    crops.height = 210;
    cropsContext.drawImage(sourceimage, leftArray[i], 0, x, 210, 0, 0, x, 210);
    listOfHorizontalCanvas.push(crops);
    viewImage.appendChild(crops);
  }
}

let listOfVerticalCanvas = [];
let vsumbtn = document.querySelector(".vsumbtn");
vsumbtn.addEventListener("click", vsum);

let vertical_sum = [];
function vsum() {
  for (let i = 0; i < imageHeight; i++) {
    let sum = 0;
    for (let j = 0; j < imageWidth; j++) {
      sum = sum + reshapeImage[i][j];
    }
    vertical_sum.push(sum);
  }
  console.log(vertical_sum.length);
}

let topArray = [];
let bottomArray = [];

let findvbtn = document.querySelector(".findvbtn");
findvbtn.addEventListener("click", findv);
function findv() {
  let top = 0;
  let bottom = 0;
  for (let j = 0; j < imageHeight - 1; j++) {
    if (vertical_sum[j] == 0 && vertical_sum[j + 1] > 0) {
      top = j + 1;
      topArray.push(top);
    }
    if (vertical_sum[j] > 0 && vertical_sum[j + 1] == 0) {
      bottom = j;
      bottomArray.push(bottom);
    }
  }
  console.log(topArray);
  console.log(bottomArray);
}

// pdamd
let horizontalImageOneComponents = [];

let reshapeHorizontalCuts = [];
function processingAfterHorizontalSplit() {
  for (let k = 0; k < listOfHorizontalCanvas.length; k++) {
    let tempCanvas = listOfHorizontalCanvas[k];
    let c = tempCanvas.getContext("2d");
    grayScaleDataHorizontal = c.getImageData(
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );
    let newHorizontalData = grayScaleDataHorizontal.data;

    for (let i = 0; i < newHorizontalData.length; i += 4) {
      let avg = Math.floor(
        0.299 * newHorizontalData[i] +
          0.587 * newHorizontalData[i + 1] +
          0.114 * newHorizontalData[i + 2]
      );
      newHorizontalData[i] = avg; // red
      newHorizontalData[i + 1] = avg; // green
      newHorizontalData[i + 2] = avg; // blue
    }
    c.putImageData(imageGrayScaleData, 0, 0);

    let horizontalComponent = [];
    let counter = 0;
    for (var i = 0; i < newHorizontalData.length; i += 4) {
      if (newHorizontalData[i] > threshold) {
        horizontalComponent[counter] = 255;
      } else {
        horizontalComponent[counter] = 0;
      }
      counter++;
    }
    horizontalImageOneComponents.push(horizontalComponent);

    let reshapeHorizontalImage = [];
    let hWidth = rightArray[k] - leftArray[k];
    let hHeight = 210;
    let offset = 0;
    for (let i = 0; i < hHeight; i++) {
      let oneHRow = [];
      for (let j = 0; j < hWidth; j++) {
        oneHRow.push(horizontalComponent[offset + j]);
      }
      reshapeHorizontalImage.push(oneHRow);
      offset = offset + hWidth;
    }
    reshapeHorizontalCuts.push(reshapeHorizontalImage);
  }
}

let listOfVerticalCanvas = [];

let vsumbtn = document.querySelector(".vsumbtn");
vsumbtn.addEventListener("click", vsum);

function vsum() {
  processingAfterHorizontalSplit();
  for (let k = 0; k < horizontalImageOneComponents.length; k++) {
    let vertical_sum = [];
    let vWidth = rightArray[k] - leftArray[k];
    let vHeight = 210;
    for (let i = 0; i < vWidth; i++) {
      let sum = 0;
      for (let j = 0; j < vWidth; j++) {
        sum = sum + reshapeHorizontalCuts[k][i][j];
      }
      vertical_sum.push(sum);
    }
    listOfVerticalCanvas.push(vertical_sum);
  }
  console.log(listOfVerticalCanvas);
}

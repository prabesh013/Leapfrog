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
ctx.lineWidth = 8;
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
  horizontal_sum = [];
  leftArray = [];
  rightArray = [];
});

// let grayscalebtn = document.querySelector(".grayscalebtn");
// grayscalebtn.addEventListener("click", grayscale);

let outputCanvas = document.createElement("CANVAS");
let outputCtx = outputCanvas.getContext("2d");
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
// const blackWhitebtn = document.querySelector(".blackwhitebtn");
// blackWhitebtn.addEventListener("click", blackWhite);

//thresholding

// The conversion of a gray scale image into black or white, so called binary image is called binarization
// The simplest way of binarization is thresholding;
const threshold = 128;

function blackWhite() {
  let counter = 0;
  for (let i = 0; i < newData.length; i += 4) {
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

// let reshapebtn = document.querySelector(".reshapebtn");
// reshapebtn.addEventListener("click", reshape);

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

// let hsumbtn = document.querySelector(".hsumbtn");
// hsumbtn.addEventListener("click", hsum);

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

// let findhbtn = document.querySelector(".findhbtn");
// findhbtn.addEventListener("click", findh);
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

// let cutHbtn = document.querySelector(".cuthbtn");
// cutHbtn.addEventListener("click", cuthorizontal);

let listOfHorizontalCanvas = [];
function cuthorizontal() {
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
    listOfHorizontalCanvas.push(crops); //important line
    // viewImage.appendChild(document.createElement("br"));
    // viewImage.appendChild(crops);
  }
  console.log(listOfHorizontalCanvas.length);
  processingAfterHorizontalSplit();
}

let horizontalImageOneComponents = [];
let reshapeHorizontalCuts = [];

function processingAfterHorizontalSplit() {
  //get horizontally split canvas data
  //grayscale the data
  //blackandwhite
  //reshape
  for (let k = 0; k < listOfHorizontalCanvas.length; k++) {
    let tempCanvas = listOfHorizontalCanvas[k];
    let c = tempCanvas.getContext("2d");
    let grayScaleDataHorizontal = c.getImageData(
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
    c.putImageData(grayScaleDataHorizontal, 0, 0);

    let horizontalComponent = [];
    let counter = 0;
    for (let i = 0; i < newHorizontalData.length; i += 4) {
      if (newHorizontalData[i] > threshold) {
        horizontalComponent[counter] = 255;
      } else {
        horizontalComponent[counter] = 0;
      }
      counter++;
    }
    horizontalImageOneComponents.push(horizontalComponent);
    console.log(horizontalComponent);

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
    console.log(reshapeHorizontalImage);
    reshapeHorizontalCuts.push(reshapeHorizontalImage);
  }
  console.log(reshapeHorizontalCuts);
}

let listOfVerticalSum = [];

// let vsumbtn = document.querySelector(".vsumbtn");
// vsumbtn.addEventListener("click", vsum);

function vsum() {
  for (let k = 0; k < horizontalImageOneComponents.length; k++) {
    let vertical_sum = [];
    let vWidth = rightArray[k] - leftArray[k];
    let vHeight = 210;
    for (let i = 0; i < vHeight; i++) {
      let sum = 0;
      for (let j = 0; j < vWidth; j++) {
        sum = sum + reshapeHorizontalCuts[k][i][j];
      }
      vertical_sum.push(sum);
    }
    listOfVerticalSum.push(vertical_sum);
  }
  console.log(listOfVerticalSum);
}

let topArray = [];
let bottomArray = [];

// let findvbtn = document.querySelector(".findvbtn");
// findvbtn.addEventListener("click", findv);
function findv() {
  for (let k = 0; k < listOfVerticalSum.length; k++) {
    let top = 0;
    let bottom = 0;
    let vertical_sum = listOfVerticalSum[k];
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
}

// let cutVbtn = document.querySelector(".cutvbtn");
// cutVbtn.addEventListener("click", cutvertical);

let listOfVerticalCanvas = [];
function cutvertical() {
  let sourceimage = canvas;
  for (let i = 0; i < leftArray.length; i++) {
    let crops = document.createElement("CANVAS");
    // crops.height = crops.width = 0;
    let x = rightArray[i] - leftArray[i];
    let y = bottomArray[i] - topArray[i];

    let cropsContext = crops.getContext("2d");
    crops.width = x;
    crops.height = y;
    cropsContext.drawImage(
      sourceimage,
      leftArray[i],
      topArray[i],
      x,
      y,
      0,
      0,
      x,
      y
    );
    listOfVerticalCanvas.push(crops); //important line
    viewImage.appendChild(document.createElement("br"));
    viewImage.appendChild(crops);
    //just checking code
    let image = document.createElement("img");
    const dataURL = crops.toDataURL();
    image.style.display = "inline-block";
    image.setAttribute("src", dataURL);
    image.style.height = "20px";
    image.style.width = "20px";
    // image.style.padding = "4px";
    viewImage.appendChild(document.createElement("br"));
    viewImage.appendChild(image);
  }
  console.log(listOfVerticalCanvas.length);
}

// let rescalebtn = document.querySelector(".rescalebtn");
// rescalebtn.addEventListener("click", rescale);

const playButton = document.querySelector(".play-btn");
playButton.addEventListener("click", function () {
  // function rescale() {
  //should I put leftArray here?
  for (let i = 0; i < leftArray.length; i++) {
    let sourceimage = canvas;
    let crops = document.createElement("CANVAS");
    let cropsContext = crops.getContext("2d");
    let w = rightArray[i] - leftArray[i];
    let h = bottomArray[i] - topArray[i];
    if (w > h) {
      //&& w > 20
      let scaleFactor = w / 20;
      w = 20;
      h = Math.floor(h / scaleFactor);
      // padding = 20 - h;
    } else if (h > w) {
      //&& h > 20
      let scaleFactor = h / 20;
      h = 20;
      w = Math.floor(w / scaleFactor);
    } else {
      w = 20;
      h = 20;
    }
    console.log("W: ", w, "H: ", h);
    crops.width = w;
    crops.height = h;
    cropsContext.drawImage(
      sourceimage,
      leftArray[i],
      topArray[i],
      rightArray[i] - leftArray[i],
      bottomArray[i] - topArray[i],
      0,
      0,
      w,
      h
    );
    viewImage.appendChild(document.createElement("br"));
    viewImage.appendChild(crops);
  }
});

function magic() {
  grayscale();
  blackWhite();
  reshape();
  hsum();
  findh();
  cuthorizontal();
  vsum();
  findv();
  cutvertical();
}

let magicbtn = document.querySelector(".magic-btn");
magicbtn.addEventListener("click", magic);

function grayscale(newCanvas) {
  let newCtx = newCanvas.getContext("2d");
  let imageGrayScaleData = newCtx.getImageData(
    0,
    0,
    newCanvas.width,
    newCanvas.height
  );
  let newData = imageGrayScaleData.data;

  for (let i = 0; i < newData.length; i += 4) {
    let avg = Math.floor(
      0.299 * newData[i] + 0.587 * newData[i + 1] + 0.114 * newData[i + 2]
    );
    newData[i] = avg; // red
    newData[i + 1] = avg; // green
    newData[i + 2] = avg; // blue
  }
  // console.log("new-data", newData)
  return newData;
}

function blackWhite(newData) {
  let imageOneComponent = [];
  const threshold = 128;
  let counter = 0;

  for (let i = 0; i < newData.length; i += 4) {
    if (newData[i] > threshold) {
      imageOneComponent[counter] = 1;
    } else {
      imageOneComponent[counter] = 0;
    }
    counter++;
  }
  // console.log("image", imageOneComponent)
  return imageOneComponent;
}

function reshape(imageW, imageH, imageOneComponent) {
  let reshapeImage = [];
  let offset = 0;
  for (let i = 0; i < imageH; i++) {
    let oneRow = [];
    for (let j = 0; j < imageW; j++) {
      oneRow.push(imageOneComponent[offset + j]);
    }
    reshapeImage.push(oneRow);
    offset = offset + imageW;
  }
  return reshapeImage;
}

function hsum(imageW, imageH, reshapeImage) {
  let horizontal_sum = [];
  for (let i = 0; i < imageW; i++) {
    let sum = 0;
    for (let j = 0; j < imageH; j++) {
      sum = sum + reshapeImage[j][i];
    }
    horizontal_sum.push(sum);
  }
  return horizontal_sum;
}

function findh(imageW, horizontal_sum, leftArray, rightArray) {
  let left = 0;
  let right = 0;
  for (let j = 0; j < imageW - 1; j++) {
    if (horizontal_sum[j] == 0 && horizontal_sum[j + 1] > 0) {
      left = j + 1;
      leftArray.push(left);
    }
    if (horizontal_sum[j] > 0 && horizontal_sum[j + 1] == 0) {
      right = j;
      rightArray.push(right);
    }
  }
}

function cuthorizontal(leftArray, rightArray) {
  let sourceimage = canvas;
  let listOfHorizontalCanvas = [];
  for (let i = 0; i < leftArray.length; i++) {
    let crops = document.createElement("CANVAS");
    let x = rightArray[i] - leftArray[i];
    let cropsContext = crops.getContext("2d");

    crops.width = x;
    crops.height = 140; //changes
    cropsContext.drawImage(sourceimage, leftArray[i], 0, x, 140, 0, 0, x, 140);
    listOfHorizontalCanvas.push(crops); //important line
  }
  return listOfHorizontalCanvas;
}

function vsum(
  leftArray,
  rightArray,
  horizontalImageOneComponents,
  reshapeHorizontalCuts
) {
  let listOfVerticalSum = [];
  for (let k = 0; k < horizontalImageOneComponents.length; k++) {
    let vertical_sum = [];
    let vWidth = rightArray[k] - leftArray[k];
    let vHeight = 140; //changes
    for (let i = 0; i < vHeight; i++) {
      let sum = 0;
      for (let j = 0; j < vWidth; j++) {
        sum = sum + reshapeHorizontalCuts[k][i][j];
      }
      vertical_sum.push(sum);
    }
    listOfVerticalSum.push(vertical_sum);
  }
  return listOfVerticalSum;
}

function findv(imageH, listOfVerticalSum, topArray, bottomArray) {
  for (let k = 0; k < listOfVerticalSum.length; k++) {
    let top = 0;
    let bottom = 0;
    let vertical_sum = listOfVerticalSum[k];
    for (let j = 0; j < imageH - 1; j++) {
      if (vertical_sum[j] == 0 && vertical_sum[j + 1] > 0) {
        top = j + 1;
        topArray.push(top);
      }
      if (vertical_sum[j] > 0 && vertical_sum[j + 1] == 0) {
        bottom = j;
        bottomArray.push(bottom);
      }
    }
  }
}

function cutvertical(leftArray, rightArray, topArray, bottomArray) {
  let listOfVerticalCanvas = [];
  let sourceimage = canvas;
  for (let i = 0; i < leftArray.length; i++) {
    let crops = document.createElement("CANVAS");
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
  }
  return listOfVerticalCanvas;
}
function resize(cv) {
  let canvaslist = [];
  for (i = 0; i < cv.length; i++) {
    let o = document.createElement("CANVAS");
    let oCon = o.getContext("2d");
    o.width = 28;
    o.height = 28;
    oCon.fillStyle = "#000000";
    oCon.fillRect(0, 0, o.width, o.height);

    let w = cv[i].width;
    let h = cv[i].height;

    if (w > h) {
      //&& w > 20
      let scaleFactor = w / 18;
      w = 18;
      h = Math.round(h / scaleFactor);
    } else if (h > w) {
      //&& h > 20
      let scaleFactor = h / 18;
      h = 18;
      w = Math.round(w / scaleFactor);
    } else {
      w = 18;
      h = 18;
    }
    let left = Math.floor(5 + (18 - w) / 2);
    // let right = 4 + (20 - w) / 2;
    let top = Math.floor(5 + (18 - h) / 2);
    // let bottom = 4 + (20 - h) / 2;

    oCon.drawImage(cv[i], 0, 0, cv[i].width, cv[i].height, left, top, w, h);
    // viewImage.appendChild(o);
    canvaslist.push(o);
  }
  return canvaslist;
}

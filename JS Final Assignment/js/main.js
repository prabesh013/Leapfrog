let container = document.querySelector(".container");
let header = document.querySelector(".header");
let gameName = document.querySelector(".game-name");
let levels = document.querySelector(".levels");
let main = document.querySelector(".main");
let help = document.querySelector(".help");
let rules = document.querySelector(".rules");
let game = document.querySelector(".game");
let scoreArea = document.querySelector(".score-area");
let mainArea = document.querySelector(".mainarea");
let expressionArea = document.querySelector(".expression-area");
let drawingArea = document.querySelector(".drawingArea");
let timer = document.querySelector(".timer");
let endScreen = document.querySelector(".endScreen");
let totalScore = document.querySelector("#total-score");
let finalScore = document.querySelector("#final-score");

let homeBtn = document.querySelector("#home");
homeBtn.addEventListener("click", mainMenu);

let easybtn = document.querySelector("#easy");
easybtn.addEventListener("click", easy);

let mediumbtn = document.querySelector("#medium");
mediumbtn.addEventListener("click", medium);

let hardbtn = document.querySelector("#hard");
hardbtn.addEventListener("click", hard);

let timeCircle = document.querySelector("#time-circle");
let perimeter = timeCircle.getAttribute("r") * 2 * Math.PI;
timeCircle.setAttribute("stroke-dasharray", perimeter);

let computedAnswer = null;
let buttonPressed = null;
let operators = ["+", "-", "*", "/"];

let helpBtn = document.querySelector(".helpBtn");
helpBtn.addEventListener("click", function () {
  rules.classList.toggle("show");
});
let close = document.querySelector("#close");
close.addEventListener("click", function () {
  rules.classList.remove("show");
});

function generateEasyExp(operator) {
  let first = null;
  let second = null;
  let expression = null;
  let answer = null;
  if (operator === "+") {
    first = randInt(0, 5);
    second = randInt(0, 4);
    expression = `${first} ${operator} ${second}`;
    answer = first + second;
    return [expression, answer];
  } else if (operator === "-") {
    first = randInt(6, 9);
    second = randInt(0, 5);
    expression = `${first} ${operator} ${second}`;
    answer = first - second;
    return [expression, answer];
  } else {
    first = randInt(0, 4);
    second = randInt(0, 2);
    expression = `${first} ${operator} ${second}`;
    answer = first * second;
    return [expression, answer];
  }
}

function generateMediumExp(number) {
  let first = null;
  let second = null;
  let third = null;
  let fourth = null;
  let expression = null;
  let answer = null;

  if (number === 1) {
    first = randInt(5, 50);
    second = randInt(20, 40);
    expression = `${first} + ${second}`;
    answer = first + second;
    return [expression, answer];
  } else if (number === 2) {
    first = randInt(4, 9);
    second = randInt(3, 9);
    expression = `${first} * ${second}`;
    answer = first * second;
    return [expression, answer];
  } else if (number === 3) {
    first = randInt(1, 9);
    second = randInt(6, 9);
    third = randInt(0, 5);
    fourth = randInt(10, 50);
    expression = `${first} + ${second} - ${third} + ${fourth}`;
    answer = first + second - third + fourth;
    return [expression, answer];
  } else if (number === 4) {
    let sixMultiples = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];
    first = sixMultiples[randInt(0, 9)];
    second = randInt(2, 3);
    third = randInt(10, 20);
    expression = `${first} / ${second} + ${third}`;
    answer = first / second + third;
    return [expression, answer];
  } else {
    first = randInt(60, 70);
    second = randInt(1, 20);
    third = randInt(1, 2);
    expression = `${first} - ${second} * ${third}`;
    answer = first - second * third;
    return [expression, answer];
  }
}

function generateHardExp(number) {
  let first = null;
  let second = null;
  let third = null;
  let fourth = null;
  let fifth = null;
  let expression = null;
  let answer = null;

  if (number === 1) {
    first = 2;
    second = randInt(7, 9);
    let secondStr = `${second}`;
    expression = `${first}` + secondStr.sup();
    answer = Math.pow(first, second);
    return [expression, answer];
  } else if (number === 2) {
    first = 3;
    second = randInt(5, 6);
    let secondStr = `${second}`;
    expression = `${first}` + secondStr.sup();
    answer = Math.pow(first, second);
    return [expression, answer];
  } else if (number === 3) {
    first = randInt(10, 20);
    second = randInt(10, 20);
    third = randInt(30, 50);
    fourth = randInt(1, 9);
    expression = `${first} * ${second} + ${third} - ${fourth}`;
    answer = first * second + third - fourth;
    return [expression, answer];
  } else if (number === 4) {
    first = randInt(400, 500);
    second = randInt(100, 200);
    third = randInt(100, 200);
    fourth = randInt(40, 90);
    fifth = randInt(100, 150);
    expression = `${first} + ${second} - ${third} + ${fourth} - ${fifth}`;
    answer = first + second - third + fourth - fifth;
    return [expression, answer];
  } else {
    let quotient = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    first = quotient[randInt(0, 8)];
    second = [5, 10][randInt(0, 1)];
    third = randInt(100, 150);
    fourth = randInt(1, 2);
    expression = `${first} / ${second} + ${third} * ${fourth}`;
    answer = first / second + third * fourth;
    return [expression, answer];
  }
}

function easy() {
  buttonPressed = easy;
  levels.classList.add("hide");
  help.classList.add("hide");
  main.classList.remove("hide");
  gameName.style.marginTop = "0px";
  gameName.style.marginBottom = "0px";
  clear();

  let totalTime = 20000;
  let t = new Timer(totalTime);

  let operator = operators[randInt(0, 2)];
  let expWithAns = generateEasyExp(operator);
  addExpression(expWithAns[0]);
  console.log(expWithAns[1]);
  computedAnswer = expWithAns[1];
}

function medium() {
  buttonPressed = medium;
  levels.classList.add("hide");
  help.classList.add("hide");
  main.classList.remove("hide");
  gameName.style.marginTop = "0px";
  gameName.style.marginBottom = "0px";
  clear();

  let totalTime = 25000;
  let t = new Timer(totalTime);

  let num = randInt(1, 5);
  let expWithAns = generateMediumExp(num);
  addExpression(expWithAns[0]);
  console.log(expWithAns[1]);
  computedAnswer = expWithAns[1];
}

function hard() {
  buttonPressed = hard;
  levels.classList.add("hide");
  help.classList.add("hide");
  main.classList.remove("hide");
  gameName.style.marginTop = "0px";
  gameName.style.marginBottom = "0px";
  clear();

  let totalTime = 35000;
  let t = new Timer(totalTime);

  let num = randInt(1, 5);
  let expWithAns = generateHardExp(num);
  addExpression(expWithAns[0]);
  console.log(expWithAns[1]);
  computedAnswer = expWithAns[1];
}

let intervalId = null;
let countDown = document.querySelector("#countdown");

class Timer {
  constructor(totalTime) {
    this.totalTime = totalTime;
    this.timeInSec = totalTime / 1000;

    this.timeValue = -Math.round(perimeter / this.timeInSec);
    this.time = totalTime / perimeter;
    this.value = -perimeter;
    this.start();
    this.increment = -perimeter;
  }
  start = () => {
    this.tick();
    this.increment--;
    countDown.innerText = `${this.timeInSec}`;
    this.interval = setInterval(this.tick, this.time);
    intervalId = this.interval;
  };
  tick = () => {
    timeCircle.setAttribute("stroke-dashoffset", this.value);

    this.value = this.value - 1;
    this.increment--;
    if (this.value < 2 * -perimeter) {
      clearInterval(this.interval);
      gameOver();
    }
    if (this.increment === this.timeValue - perimeter) {
      this.timeInSec = this.timeInSec - 1;
      countDown.innerText = `${this.timeInSec}`;
      this.increment = -perimeter;
    }
  };
}

function nextQuestion(btnPress) {
  clearExp();
  clearInterval(intervalId);
  btnPress();
}
function addExpression(expression) {
  let hTwo = document.createElement("h2");
  // let text = document.createTextNode(expression);
  hTwo.innerHTML = expression;
  // hTwo.appendChild(expression);
  hTwo.style.color = "white";
  expressionArea.appendChild(hTwo);
}

const check = document.querySelector(".check-btn");
check.addEventListener("click", checkAnswer);

let final = 0;
let scoredNum = 0;
function checkAnswer() {
  let recognizedNum = digitrecognize();
  let arrayOfDigits = Array.from(String(computedAnswer), Number);
  if (
    recognizedNum.length != arrayOfDigits.length ||
    recognizedNum.length === 0
  ) {
    //stop program
    console.log("redraw");
  } else {
    for (let i = 0; i < arrayOfDigits.length; i++) {
      if (arrayOfDigits[i] === recognizedNum[i]) {
        scoredNum = scoredNum + 1;
      }
    }
  }

  final = scoredNum;
  totalScore.innerText = `${scoredNum}`;
  nextQuestion(buttonPressed);
}

function digitrecognize() {
  let d = grayscale(canvas);
  let b = blackWhite(d);
  let r = reshape(canvas.width, canvas.height, b);
  let hs = hsum(canvas.width, canvas.height, r);

  let leftArray = []; //change this
  let rightArray = []; //change this

  findh(canvas.width, hs, leftArray, rightArray);
  let hCanvasList = cuthorizontal(leftArray, rightArray);
  let horizontalImageOneComponents = [];
  let reshapeHorizontalCuts = [];
  for (let k = 0; k < hCanvasList.length; k++) {
    let tempCanvas = hCanvasList[k];
    let gr = grayscale(tempCanvas);
    let bw = blackWhite(gr);

    horizontalImageOneComponents.push(bw);

    let rh = reshape(rightArray[k] - leftArray[k], canvas.height, bw);
    reshapeHorizontalCuts.push(rh);
  }
  let vs = vsum(
    leftArray,
    rightArray,
    horizontalImageOneComponents,
    reshapeHorizontalCuts
  );
  let topArray = [];
  let bottomArray = [];
  findv(canvas.height, vs, topArray, bottomArray);
  let cv = cutvertical(leftArray, rightArray, topArray, bottomArray);
  let cList = resize(cv);
  console.log(cList);
  let oneCompFinalCanvas = [];
  let ans = null;
  for (let i = 0; i < cList.length; i++) {
    let grey = grayscale(cList[i]);
    let black = blackWhite(grey);
    ans = logic(black);
    oneCompFinalCanvas.push(ans);
  }
  return oneCompFinalCanvas;
}

function gameOver() {
  levels.classList.add("hide");
  help.classList.add("hide");
  main.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerText = `${final}`;
}

function mainMenu() {
  final = 0;
  scoredNum = 0;
  intervalId = null;
  computedAnswer = null;
  buttonPressed = null;
  clearExp();
  clearInterval(intervalId);
  totalScore.innerText = `${0}`;
  levels.classList.remove("hide");
  help.classList.remove("hide");
  gameName.style.marginTop = "150px";
  gameName.style.marginBottom = "50px";
  // main.classList.("hide");
  endScreen.classList.add("hide");
}
function clearExp() {
  let exp = document.querySelector(".expression-area h2");
  if (exp !== null || exp !== undefined) {
    expressionArea.removeChild(exp);
  }
}
//generating random number
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

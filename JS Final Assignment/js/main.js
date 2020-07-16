//generating random number
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let operators = ["+", "-", "*", "/"];

function addExpression(expression) {
  let p = document.createElement("p");
  let text = document.createTextNode(expression);
  p.appendChild(text);
  expressionArea.appendChild(p);
}
function checkAnswer(answer) {}

let container = document.querySelector(".container");
let header = document.querySelector(".header");
let gameName = document.querySelector(".game-name");
let levels = document.querySelector(".levels");

let main = document.querySelector(".main");
let game = document.querySelector(".game");
let score = document.querySelector(".score");
let mainArea = document.querySelector(".mainarea");
let expression = document.querySelector(".expression");
let drawingArea = document.querySelector(".drawingArea");
let timer = document.querySelector("timer");

let easybtn = document.querySelector("#easy");
easybtn.addEventListener("click", easy);

let mediumbtn = document.querySelector("#medium");
mediumbtn.addEventListener("click", medium);

let hardbtn = document.querySelector("#hard");
hardbtn.addEventListener("click", hard);

function easy() {
  levels.classList.add("hide");
  main.classList.remove("hide");
  gameName.style.marginTop = "0px";
  gameName.style.marginBottom = "0px";
  clear();
}
function medium() {
  levels.classList.add("hide");
  main.classList.remove("hide");
  gameName.style.marginTop = "0px";
  gameName.style.marginBottom = "0px";
  clear();
}
function hard() {
  levels.classList.add("hide");
  main.classList.remove("hide");
  gameName.style.marginTop = "0px";
  gameName.style.marginBottom = "0px";
  clear();
}

// function easy() {
//   let first = randInt(0, 5);
//   let second = randInt(0, 4);
//   let operator = operators[0];
//   //   let timer =

//   let expression = `${first} ${operator} ${second}`;
//   let answer = first + second;

//   addExpression(expression);
//   checkAnswer(answer);
// }
// function medium() {
//   let first = randInt(0, 5);
//   let second = randInt(0, 4);
//   let operator = operators[randInt(0, 3)];

//   let expression = `${first} ${operator} ${second}`;
//   let answer = first + second;

//   addExpression(expression);
//   checkAnswer(answer);
// }

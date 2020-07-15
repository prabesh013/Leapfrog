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

function easy() {
  let first = randInt(0, 5);
  let second = randInt(0, 4);
  let operator = operators[0];
  //   let timer =

  let expression = `${first} ${operator} ${second}`;
  let answer = first + second;

  addExpression(expression);
  checkAnswer(answer);
}
function medium() {
  let first = randInt(0, 5);
  let second = randInt(0, 4);
  let operator = operators[randInt(0, 3)];

  let expression = `${first} ${operator} ${second}`;
  let answer = first + second;

  addExpression(expression);
  checkAnswer(answer);
}

var container = document.querySelector(".container");
var scoreSpeed = container.querySelector(".score-speed");
var startScreen = document.querySelector(".startScreen");
var endScreen = document.querySelector(".endScreen");
var gameArea = document.querySelector(".gameArea");
var carList = ["car2.png", "car3.png", "car4.png", "car5.png", "car6.png"];
var chosenOne = carList[Math.floor(Math.random() * carList.length)];

var fromLeft = ["47px", "115px", "186px"];
var fromTop = ["-90px", "-225px", "-400px"];

var car = document.createElement("div");

var speedUserCar = 2;
var speedOppoCar = 2;

var rightLane = false;
var leftLane = false;
var middleLane = false;

var opponents = [];
var score = 0;

var finalScore = document.querySelector("#finalscore");

var NUMBER_OF_INSTANCES = 3;

//showing score and gameArea after button is clicked
var startButton = document.querySelector("#start");
startButton.addEventListener("click", startGame);

//showing score and gameArea after button is clicked
var restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", restartGame);

//initially hiding score and gameArea
scoreSpeed.classList.add("hide");
gameArea.classList.add("hide");
endScreen.classList.add("hide");

var stop = [];
var userCarLeft = 115;
var enemyCar = [];

var roadDiv = document.createElement("div");
var roadImg = document.createElement("img");

//generates opponent car
function generateOpponentCar() {
  var self = this;
  this.updater = 1;

  this.makeOpponentCar = function () {
    let leftPositionEnemyCar =
      fromLeft[Math.floor(Math.random() * fromLeft.length)];
    let topPositionEnemyCar =
      fromTop[Math.floor(Math.random() * fromTop.length)];

    self.oppoCar = document.createElement("div");
    self.oppoCar.setAttribute("class", "opponent-car");
    self.oppoCar.style.width = "67px";
    self.oppoCar.style.height = "90px";
    self.oppoCar.style.background = `url("./img/${chosenOne}")`;
    self.oppoCar.style.backgroundSize = "cover";
    self.oppoCar.style.backgroundPosition = "center center";
    self.oppoCar.style.position = "absolute";
    self.oppoCar.style.zIndex = 1;
    self.oppoCar.style.top = topPositionEnemyCar;
    self.oppoCar.style.borderRadius = "5px";
    self.oppoCar.style.left = leftPositionEnemyCar;
    gameArea.appendChild(self.oppoCar);
    opponents.push(self.oppoCar);
  };

  //moving the enemy car
  this.moveOppo = function () {
    self.updater++;
    if (self.updater === 1500) {
      self.updater = 0;
      changeSpeed();
    }
    var top = parseInt(self.oppoCar.style.top);
    top = top + speedOppoCar;
    if (top === 630) {
      score = score + 1;
      updateScore();
      top = -90;
      self.oppoCar.style.left =
        fromLeft[Math.floor(Math.random() * fromLeft.length)];
      self.oppoCar.style.top =
        fromTop[Math.floor(Math.random() * fromTop.length)];
    }
    self.oppoCar.style.top = top + "px";
    moveRoad();
    // checkCollisionWithUserCar();
    //collision with others
    for (let i = 0; i < opponents.length; i++) {
      if (opponents[i] === self.oppoCar) continue;

      let car1 = {
        x: userCarLeft,
        y: 530,
        width: 67,
        height: 90,
      };
      let car2 = {
        x: parseInt(opponents[i].style.left),
        y: parseInt(opponents[i].style.top),
        width: parseInt(opponents[i].style.width),
        height: parseInt(opponents[i].style.height),
      };

      if (
        car1.x < car2.x + car2.width &&
        car1.x + car1.width > car2.x &&
        car1.y < car2.y + car2.height &&
        car1.y + car1.height > car2.y
      ) {
        self.updater = 0;
        gameEnd();
      }
    }
  };
}

function clearEverything() {
  let opponentCars = document.querySelectorAll(".opponent-car");

  opponents = [];
  score = 0;
  updater = 1;
  speedUserCar = 2;
  speedOppoCar = 2;

  rightLane = false;
  leftLane = false;
  middleLane = false;
  stop = [];
  userCarLeft = 115;

  for (let i = 0; i < opponentCars.length; i++) {
    console.log(opponentCars[i]);
    opponentCars[i].parentElement.removeChild(opponentCars[i]);
  }
}

function updateSpeed() {
  scoreSpeed.querySelector("#speed").innerText = speedUserCar;
}
function updateScore() {
  scoreSpeed.querySelector("#score").innerText = score;
}

function startGame() {
  startScreen.classList.add("hide");
  scoreSpeed.classList.remove("hide");
  scoreSpeed.classList.add("show");
  gameArea.classList.remove("hide");
  gameArea.classList.add("show");
  document.querySelector("body").style.backgroundColor = "#b9ac92";
  createRoad();
  generateUserCar();
  updateScore();
  updateSpeed();
  runCars();
}

function restartGame() {
  clearEverything();

  startGame();
}

//generates user car
function generateUserCar() {
  car.style.width = "67px";
  car.style.height = "90px";
  car.style.background = 'url("./img/car1.png")';
  car.style.backgroundSize = "cover";
  car.style.backgroundPosition = "center center";
  car.style.position = "absolute";
  car.style.left = "115px";
  car.style.borderRadius = "5px";
  middleLane = true;
  car.style.top = "530px";
  gameArea.appendChild(car);
}

//Code that moves the User Car Vertically
document.addEventListener("keydown", moveCar);
function moveCar(e) {
  if (e.key === "a" && middleLane) {
    car.style.left = "47px";
    userCarLeft = 47;
    middleLane = false;
    leftLane = true;
  }
  if (e.key === "a" && rightLane) {
    car.style.left = "115px";
    userCarLeft = 115;
    middleLane = true;
    rightLane = false;
  }
  if (e.key === "d" && middleLane) {
    car.style.left = "186px";
    userCarLeft = 186;
    middleLane = false;
    rightLane = true;
  }
  if (e.key === "d" && leftLane) {
    car.style.left = "115px";
    userCarLeft = 115;
    middleLane = true;
    leftLane = false;
  }
}

function changeSpeed() {
  if (!(speedUserCar === 5 || speedOppoCar === 5)) {
    console.log(speedUserCar, speedOppoCar);
    speedUserCar += 1;
    updateSpeed();
    speedOppoCar++;
  }
}

function createRoad() {
  gameArea.appendChild(roadDiv);
  roadDiv.style.position = "absolute";
  roadDiv.style.width = "300px";
  roadDiv.style.height = "1260px";
  roadDiv.style.top = "-630px";
  roadImg.setAttribute("src", "./img/road.png");
  roadImg.style.height = "100%";
  roadImg.style.width = "100%";

  roadDiv.appendChild(roadImg);
}

function moveRoad() {
  var topOfImage = parseInt(roadDiv.style.top);
  //needs more logic
  if (speedUserCar % -topOfImage === 0) {
    // console.log("Reload", topOfImage);
    roadDiv.style.top = "-630px";
  } else {
    topOfImage = topOfImage + speedUserCar;
    roadDiv.style.top = topOfImage + "px";
  }
}

function gameEnd() {
  for (let i = 0; i < NUMBER_OF_INSTANCES; i++) {
    clearInterval(stop[i]);
  }
  finalScore.innerText = score;
  endScreen.classList.remove("hide");
  endScreen.classList.add("show");
  scoreSpeed.classList.add("hide");
  scoreSpeed.classList.remove("show");

  gameArea.classList.add("hide");
  gameArea.classList.remove("show");
  //   clearEverything();
}

function runCars() {
  for (let i = 0; i < NUMBER_OF_INSTANCES; i++) {
    enemyCar[i] = new generateOpponentCar();
  }
  for (let i = 0; i < NUMBER_OF_INSTANCES; i++) {
    console.log("Runing cars...");
    enemyCar[i].makeOpponentCar();
    stop[i] = setInterval(enemyCar[i].moveOppo, 10);
  }
}

//moving obstacles
function moveObstacles(oT, oB) {
  var left = parseInt(oT.style.left);
  oT.style.left = left - obstacleSpeed + "px";
  oB.style.left = left - obstacleSpeed + "px";
  var l = parseInt(oT.style.left);
  if (l < 0) {
    return true;
  }
}

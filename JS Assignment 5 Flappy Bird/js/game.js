//selecting dom elements
var startScreen = document.querySelector(".startScreen");
var gameScreen = document.querySelector(".gameScreen");
var score = document.querySelector(".score-area span");
var game = document.querySelector(".game");
var endScreen = document.querySelector(".endScreen");

//top height for the obstacle
var dynamicHeight = [228, 342, 114];

//values that take bird up and down
var birdSpeed = 2;
var gravity = 2;

//Starting the Game
var startButton = document.querySelector("#start");
startButton.addEventListener("click", startGame);

//tracking our key presses
var keys = {};
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  keys[e.code] = true;
}

function keyUp(e) {
  keys[e.code] = false;
}

//generating random number
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//everything related to bird
function Bird() {
  var self = this;
  var topPostions = [200, 250, 300, 350, 400];
  this.birdY = topPostions[randInt(0, topPostions.length)];

  this.create = function () {
    var bird = document.createElement("div");
    bird.setAttribute("id", "bird");
    bird.style.top = self.birdY + "px";
    return bird;
  };
}

//everything related to obstacle
function Obstacle() {
  var self = this;
  this.pipeWidth = parseInt(gameScreen.style.width) * (1 / 4);

  this.create = function () {
    // var spacing
    var obstacleBottom = document.createElement("div");
    obstacleBottom.setAttribute("id", "obstacleBottom");
  };
}

var obstacleTop = document.createElement("div");
obstacleTop.setAttribute("id", "obstacleTop");
obstacleTop.height =
  //game starting point
  function startGame() {
    startScreen.classList.add("hide");
    gameScreen.classList.remove("hide");
    var b = new Bird();
    game.insertAdjacentElement("afterbegin", b.create());
    window.requestAnimationFrame(playGame);
  };

//game logic
function playGame() {
  var bird = document.querySelector("#bird");
  var birdTop = parseInt(bird.style.top);
  bird.style.backgroundImage = "url(./img/bird.png)";

  if (keys.Space) {
    //taking bird up
    bird.style.backgroundImage = "url(./img/birdUp.png)";
    birdTop = birdTop - birdSpeed * 3;
  }
  //drag
  birdTop = birdTop + gravity;

  //check collision
  //touch anything --> gameover()

  //updating bird position
  bird.style.top = birdTop + "px";

  //game loop
  window.requestAnimationFrame(playGame);
}

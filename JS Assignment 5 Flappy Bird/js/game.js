//selecting dom elements
var startScreen = document.querySelector(".startScreen");
var gameScreen = document.querySelector(".gameScreen");
var score = document.querySelector(".score-area span");
var finalScore = document.querySelector("#finalscore");
var game = document.querySelector(".game");
var endScreen = document.querySelector(".endScreen");

//top height for the obstacle
var dynamicHeight = [50, 94, 110, 140, 188, 220, 240, 260, 282];

//values that take bird up and down
var birdSpeed = 2;
var gravity = 2;
var obstacleSpeed = 1;

//score
var s = 0;

//playing or not
var playing = false;

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

var obstaclesTopArray = [];
var obstaclesBottomArray = [];

//everything related to obstacle
function Obstacle() {
  var self = this;
  this.pipeWidth = 55;
  this.startPostion = 410;

  this.create = function (position) {
    let obstacleTop = document.createElement("div");
    obstacleTop.setAttribute("id", "obstacleTop");
    obstacleTop.style.width = self.pipeWidth + "px";
    var h = dynamicHeight[randInt(0, dynamicHeight.length)];
    obstacleTop.style.height = h + "px";
    obstacleTop.style.left = position + self.startPostion + "px";
    obstacleTop.style.top = 0 + "px";
    // game.insertAdjacentElement("afterbegin", obstacleTop);
    obstaclesTopArray.push(obstacleTop);
    game.appendChild(obstacleTop);

    var spaceBtwObs = 120;

    let obstacleBottom = document.createElement("div");
    obstacleBottom.setAttribute("id", "obstacleBottom");
    obstacleBottom.style.width = self.pipeWidth + "px";
    obstacleBottom.style.height = 470 - (h + spaceBtwObs) + "px";
    obstacleBottom.style.left = position + self.startPostion + "px";
    obstacleBottom.style.top = h + spaceBtwObs + "px";
    obstaclesBottomArray.push(obstacleBottom);
    game.appendChild(obstacleBottom);
  };
}
//game starting point
function startGame() {
  playing = true;
  startScreen.classList.add("hide");
  gameScreen.classList.remove("hide");
  var b = new Bird();
  game.insertAdjacentElement("afterbegin", b.create());

  var position = 0;
  for (let x = 0; x < 500; x++) {
    var o = new Obstacle();
    // obstacles[x] = o.create(position);
    o.create(position);
    position += 150;
  }
  window.requestAnimationFrame(playGame);
}

//game logic
function playGame() {
  if (playing) {
    var bird = document.querySelector("#bird");
    var birdTop = parseInt(bird.style.top);
    bird.style.backgroundImage = "url(./img/bird.png)";

    var oT = document.querySelectorAll("#obstacleTop");
    var oB = document.querySelectorAll("#obstacleBottom");

    if (keys.Space) {
      //taking bird up
      bird.style.backgroundImage = "url(./img/birdUp.png)";
      birdTop = birdTop - birdSpeed * 3;
    }

    //drag
    birdTop = birdTop + gravity;

    //collision dectection of bird with top and bottom
    if (birdTop <= 5 || birdTop >= 450) {
      gameover();
    }

    //collision detection between bird and obstacles
    for (let i = 0; i < obstaclesTopArray.length; i++) {
      let rect1 = {
        x: 80,
        y: birdTop,
        width: 38,
        height: 30,
      };
      let rect2 = {
        x: parseInt(obstaclesTopArray[i].style.left),
        y: parseInt(obstaclesTopArray[i].style.top),
        width: parseInt(obstaclesTopArray[i].style.width),
        height: parseInt(obstaclesTopArray[i].style.height),
      };
      let rect3 = {
        x: parseInt(obstaclesBottomArray[i].style.left),
        y: parseInt(obstaclesBottomArray[i].style.top),
        width: parseInt(obstaclesBottomArray[i].style.width),
        height: parseInt(obstaclesBottomArray[i].style.height),
      };
      if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      ) {
        gameover();
      }
      if (
        rect1.x < rect3.x + rect3.width &&
        rect1.x + rect1.width > rect3.x &&
        rect1.y < rect3.y + rect3.height &&
        rect1.y + rect1.height > rect3.y
      ) {
        gameover();
      }
    }
    //updating bird position
    bird.style.top = birdTop + "px";

    for (let i = 0; i < 500; i++) {
      moveObstacles(oT[i], oB[i]);
      var l = parseInt(oT[i].style.left);
      if (l === 35) {
        //   game.removeChild(oT);
        // game.removeChild(oB);
        s++;
        score.innerText = `${s}`;
      }
    }
  }

  //game loop
  window.requestAnimationFrame(playGame);
}

//moving obstacles
function moveObstacles(oT, oB) {
  var left = parseInt(oT.style.left);
  oT.style.left = left - obstacleSpeed + "px";
  oB.style.left = left - obstacleSpeed + "px";
}

//game over
function gameover() {
  var birdFinal = document.querySelector("#bird");
  playing = false;
  gameScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerText = `${s}`;
  birdSpeed = 2;
  gravity = 2;
  obstacleSpeed = 1;
  s = 0;
  keys = {};
  game.removeChild(birdFinal);
  for (let x = 0; x < 500; x++) {
    var oTFinal = document.querySelector("#obstacleTop");
    var oBFinal = document.querySelector("#obstacleBottom");
    game.removeChild(oTFinal);
    game.removeChild(oBFinal);
  }
}

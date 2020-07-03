var canvas = document.getElementById("helix");
var context = canvas.getContext("2d");
var phase = 90;
var speed = 0.1;
var maxRadius = 11;
var frameCounter = 0;
var rows = 20;
var cols = 38;
var numStrands = 2;
var y;
var colors = "orange";

var PI = 3.1416;

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  var x = 0;
  var cOffset = 0;
  frameCounter++;
  phase = frameCounter * speed;

  for (var strand = 0; strand < numStrands; strand++) {
    if (strand === 0) {
      var strandPhase = phase;
    } else {
      var strandPhase = phase + strand * PI;
    }
    x = 0;
    for (var column = 0; column < cols; column++) {
      x = x + 15;
      cOffset = (column * 2 * PI) / 15;
      for (var row = 0; row < rows; row++) {
        var y =
          canvas.height / 4 + row * 15 + Math.sin(strandPhase + cOffset) * 30;

        var sizeOffset =
          (Math.cos(strandPhase - row * 0.1 + cOffset) + 1) * 0.4;
        var circleRadius = sizeOffset * maxRadius;

        context.beginPath();
        context.arc(x, y, circleRadius, 0, PI * 2, false);

        context.fillStyle = colors;
        context.fill();
        context.closePath();
      }
    }
  }
  window.requestAnimationFrame(draw);
}
draw();

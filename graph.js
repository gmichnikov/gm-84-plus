var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function drawAxes() {
  ctx.clearRect(0,0,400,400)
  ctx.beginPath();
  ctx.rect(canvas.width/2, 0, 1, canvas.height);
  ctx.rect(0, canvas.height/2, canvas.width, 1);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function calcXCoord(xPixel) {
  return (xPixel - canvas.width / 2) / (canvas.width/20);
}

function calcYPixel(xCoord) {
  // x^2 + 2x - 3
  let yCoord = Math.pow(xCoord, 2) + 2 * xCoord - 3;
  // console.log("x", xCoord, "y", yCoord);
  return (-canvas.height / 20) * yCoord + (canvas.height / 2)
}

function randomColor(opacity = 1) {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${opacity}`;
}

function drawParabola() {
  for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
    let xCoord = calcXCoord(xPixel);
    let yPixel = calcYPixel(xCoord);
    ctx.beginPath();
    ctx.arc(xPixel, yPixel, 3, 0, Math.PI*2);
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.closePath();
  }
}

drawAxes();
drawParabola();

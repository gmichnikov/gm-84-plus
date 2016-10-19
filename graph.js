var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function drawAxes() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.beginPath();
  ctx.rect(canvas.width/2, 0, 1, canvas.height);
  ctx.rect(0, canvas.height/2, canvas.width, 1);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  let textWidth = ctx.measureText('10').width;
  ctx.fillRect(canvas.width/2 - textWidth/2, 0, textWidth, 20)
  ctx.fillStyle = "purple";
  ctx.fillText("10", canvas.width/2, 14);
}


// document.addEventListener("mousemove", mouseMoveHandler, false);
// function mouseMoveHandler(e) {
//     let relativeX = e.clientX - canvas.offsetLeft;
//     // console.log(math.round(calcXCoord(relativeX), 1));
// }

function calcXCoord(xPixel) {
  return (xPixel - canvas.width / 2) / (canvas.width/20);
}

function calcYPixel(xCoord, c) {
  // x^2 + 2x - 3
  let yCoord = Math.pow(xCoord, 2) + 2 * xCoord + c;
  // console.log("x", xCoord, "y", yCoord);
  return (-canvas.height / 20) * yCoord + (canvas.height / 2)
}

function calcYPixelSin(xCoord, c) {
  let yCoord = c * math.sin(xCoord + c);
  return (-canvas.height / 20) * yCoord + (canvas.height / 2)
}

function rand256() {
  return math.randomInt(0,256);
}

function randomColor(opacity = 1) {
  return `rgba(${rand256()}, ${rand256()}, ${rand256()}, ${opacity}`;
}

function drawParabola(c) {
  for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
    let xCoord = calcXCoord(xPixel);
    let yPixel = calcYPixel(xCoord, c);
    ctx.beginPath();
    ctx.arc(xPixel, yPixel, 3, 0, Math.PI*2);
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.closePath();
  }
}

function drawSin(c) {
  for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
    let xCoord = calcXCoord(xPixel);
    let yPixel = calcYPixelSin(xCoord, c);
    ctx.beginPath();
    ctx.arc(xPixel, yPixel, 3, 0, Math.PI*2);
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.closePath();
  }
}

function drawAnything(compiledExpr, c) {
  for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
    let xCoord = calcXCoord(xPixel);
    let scope = {x: xCoord, c: c}

    try {
      let yCoord = math.format(compiledExpr.eval(scope));
      let yPixel = (-canvas.height / 20) * yCoord + (canvas.height / 2)

      ctx.beginPath();
      ctx.arc(xPixel, yPixel, 3, 0, Math.PI*2);
      // ctx.fillStyle = randomColor();
      ctx.fillStyle = $("#colorpicker").spectrum("get");
      ctx.fill();
      ctx.closePath();
    }
    catch (err) {
    }
  }
}

function animateGraph(compiledExpr) {
  let c = -10;
  function step() {
    drawAxes();
    // drawParabola(c)
    // drawSin(c)
    drawAnything(compiledExpr, c);
    c += 0.5;
    if (c < 10) {
      window.requestAnimationFrame(step);
    } else {
      let drawButton = document.getElementById('draw-graph');
      drawButton.disabled = false;
    }
  }
  window.requestAnimationFrame(step);
}


function drawGraphOnce(compiledExpr) {
  drawAxes();
  drawAnything(compiledExpr, 0);
}

function animateGraphNow() {
  let colorpicker = document.getElementById('colorpicker');
  console.log(colorpicker.value);

  let drawButton = document.getElementById('draw-graph');
  drawButton.disabled = true;

  let expr = document.getElementById('expression');

  try {
    let node = math.parse(expr.value);
    let compiledExpr = node.compile();
    animateGraph(compiledExpr);
  }
  catch (err) {
  }
}


function logEquation(){ // called on input in forms
  let expr = document.getElementById('expression');
  let xVal = document.getElementById('x-value');
  let result = document.getElementById('result');
  let pretty = document.getElementById('pretty');

  let node = null;

  try {
    node = math.parse(expr.value);
    let compiledExpr = node.compile();
    drawGraphOnce(compiledExpr);
    // result.innerHTML = '';
    let scope = {x: xVal.value, c: 0};
    result.innerHTML = math.format(compiledExpr.eval(scope));
  }
  catch (err) {
    result.innerHTML = '<span style="color: red;">' + err.toString() + '</span>';
  }

  try {
    let latex = node ? node.toTex({implicit:'show'}) : '';
    console.log("latex", latex);
    let elem = MathJax.Hub.getAllJax('pretty')[0];
    MathJax.Hub.Queue(['Text', elem, latex]);
  }
  catch (err) {
  }
}


$("#colorpicker").spectrum({
  showPaletteOnly: true,
  showPalette:true,
  hideAfterPaletteSelect:true,
  color: 'black',
  palette: [
      ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'black']
  ],
  change: logEquation,
});

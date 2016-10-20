import Plane from './plane';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const plane = new Plane(canvas, ctx);




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

  ctx.fillStyle = "black";
  let chooseRandom = document.getElementById("randomColor").checked;
  let selectedColor = $("#colorpicker").spectrum("get");

  for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
    let xCoord = calcXCoord(xPixel);
    let scope = {x: xCoord, c: c}

    try {
      let yCoord = math.format(compiledExpr.eval(scope));
      let yPixel = (-canvas.height / 20) * yCoord + (canvas.height / 2)

      ctx.beginPath();
      ctx.arc(xPixel, yPixel, 3, 0, Math.PI*2);
      ctx.fillStyle = chooseRandom ? randomColor() : selectedColor;
      ctx.fill();
      ctx.closePath();
    }
    catch (err) {
    }
  }
}

function animateGraph(compiledExpr) {
  let cValue = document.getElementById('c-value');
  let cMinVal = parseFloat(document.getElementById('c-min').value);
  let cMaxVal = parseFloat(document.getElementById('c-max').value);
  let cIncrementVal = parseFloat(document.getElementById('c-increment').value);

  console.log(cMinVal, cMaxVal, cIncrementVal);

  let c = cMinVal;

  function step() {
    plane.drawAxes();
    // drawParabola(c)
    // drawSin(c)

    drawAnything(compiledExpr, c);
    cValue.innerHTML = `c = ${c}`;
    $( "#slider" ).slider( "value", c );
    $( "#custom-handle" ).text(c);

    c = math.round(c + cIncrementVal, 2);
    if (c <= cMaxVal) {
      window.requestAnimationFrame(step);
    } else {
      let drawButton = document.getElementById('draw-graph');
      drawButton.disabled = false;
    }
  }
  window.requestAnimationFrame(step);
}


function drawGraphOnce(compiledExpr, c = 0) {
  plane.drawAxes();
  drawAnything(compiledExpr, c);
}

function animateGraphNow() {
  let colorpicker = document.getElementById('colorpicker');

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


function logEquation(c){ // called on input in forms
  if (typeof(c) !== "number") {
    c = 0;
  }
  console.log("C", c);

  let expr = document.getElementById('expression');
  let xVal = document.getElementById('x-value');
  let result = document.getElementById('result');
  let pretty = document.getElementById('pretty');

  let node = null;

  try {
    node = math.parse(expr.value);
    let compiledExpr = node.compile();
    drawGraphOnce(compiledExpr, c);
    // result.innerHTML = '';
    let scope = {x: xVal.value, c: c};
    result.innerHTML = math.format(compiledExpr.eval(scope));
  }
  catch (err) {
    result.innerHTML = '<span style="color: red;">' + err.toString() + '</span>';
  }

  try {
    let latex = node ? node.toTex({implicit:'show'}) : '';
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
  palette: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'violet'],
  change: logEquation,
});

$("#randomColor").change(logEquation);

$( function() {
  var handle = $( "#custom-handle" );
  $( "#slider" ).slider({
    create: function() {
      handle.text( $( this ).slider( "value" ) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      let c = parseFloat(ui.value);
      logEquation(c);
      document.getElementById('c-value').innerHTML = `c = ${c}`;
    },
    min: -10,
    max: 10,
    step: 0.1
  });
} );


$('#draw-graph').on("click", animateGraphNow);
$('#expression').on("input", logEquation);
$('#x-value').on("input", logEquation);

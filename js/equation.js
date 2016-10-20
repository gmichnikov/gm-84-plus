//pass a color to each equation
import * as UTIL from './util';

class Equation {
  constructor(plane) {
    this.plane = plane;
    this.setup();
    // this.drawGraphOnce = this.drawGraphOnce.bind(this);
    // this.logEquation = this.logEquation.bind(this);
  }

  setup() {
    $("#colorpicker").spectrum({
      showPaletteOnly: true,
      showPalette:true,
      hideAfterPaletteSelect:true,
      color: 'black',
      palette: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'violet'],
      change: this.logEquation,
    });

    let that = this;

    $("#randomColor").on("change", () => this.logEquation());
    $('#draw-graph').on("click", () => this.animateGraphNow());
    $('#expression').on("input", () => this.logEquation());
    $('#x-value').on("input", () => this.logEquation());

    $( function() {
      var handle = $( "#custom-handle" );
      $( "#slider" ).slider({
        create: function() {
          handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
          handle.text( ui.value );
          let c = parseFloat(ui.value);
          that.logEquation(c);
          document.getElementById('c-value').innerHTML = `c = ${c}`;
        },
        min: -10,
        max: 10,
        step: 0.1
      });
    } );
  }

  drawGraphOnce(compiledExpr, c = 0) {
    this.plane.drawAxes();
    this.drawAnything(compiledExpr, c);
  }

  logEquation(c) { // called on input in forms
    if (typeof(c) !== "number") {
      c = 0;
    }

    let expr = document.getElementById('expression');
    let xVal = document.getElementById('x-value');
    let result = document.getElementById('result');
    let pretty = document.getElementById('pretty');

    let node = null;
    let that = this;

    try {
      node = math.parse(expr.value);
      let compiledExpr = node.compile();
      that.drawGraphOnce(compiledExpr, c);
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

  animateGraphNow() {
    let that = this;
    let colorpicker = document.getElementById('colorpicker');

    let drawButton = document.getElementById('draw-graph');
    drawButton.disabled = true;

    let expr = document.getElementById('expression');

    try {
      let node = math.parse(expr.value);
      let compiledExpr = node.compile();
      that.animateGraph(compiledExpr);
    }
    catch (err) {
    }
  }


  animateGraph(compiledExpr) {
    let that = this;
    let cValue = document.getElementById('c-value');
    let cMinVal = parseFloat(document.getElementById('c-min').value);
    let cMaxVal = parseFloat(document.getElementById('c-max').value);
    let cIncrementVal = parseFloat(document.getElementById('c-increment').value);

    console.log(cMinVal, cMaxVal, cIncrementVal);

    let c = cMinVal;

    function step() {
      that.plane.drawAxes();
      // drawParabola(c)
      // drawSin(c)

      that.drawAnything(compiledExpr, c);
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

  drawAnything(compiledExpr, c) {
    let ctx = this.plane.ctx;
    let canvas = this.plane.ctx.canvas;
    ctx.fillStyle = "black";
    let chooseRandom = document.getElementById("randomColor").checked;
    let selectedColor = $("#colorpicker").spectrum("get");

    for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
      let xCoord = UTIL.calcXCoord(xPixel, canvas);
      let scope = {x: xCoord, c: c}

      try {
        let yCoord = math.format(compiledExpr.eval(scope));
        let yPixel = UTIL.calcYPixel(yCoord, canvas);

        ctx.beginPath();
        ctx.arc(xPixel, yPixel, 3, 0, Math.PI*2);
        ctx.fillStyle = chooseRandom ? UTIL.randomColor() : selectedColor;
        ctx.fill();
        ctx.closePath();
      }
      catch (err) {
      }
    }
  }

}

export default Equation;

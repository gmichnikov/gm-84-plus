//pass a color to each equation
import * as UTIL from './util';

class Equation {
  constructor(plane) {
    this.plane = plane;
    this.traceMode = false;
    this.compiledExpr = null;
    this.c = 0;

    this.setup();
    this.logEquation(0);
    // this.drawGraphOnce = this.drawGraphOnce.bind(this);
    // this.logEquation = this.logEquation.bind(this);
  }

  setup() {
    $("#colorpicker").spectrum({
      showPaletteOnly: true,
      showPalette:true,
      hideAfterPaletteSelect:true,
      color: 'black',
      palette: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', UTIL.randomColor()],
      change: () => this.logEquation(),
    });

    let that = this;

    $("#randomColor").on("change", () => this.logEquation());
    $('#draw-graph').on("click", () => this.animateGraphNow());
    $('.trigger-redraw').on("input", () => this.logEquation());
    $('.c-data').on("input", () => this.adjustSliderBounds());

    $('#trace-mode').on("click", () => {
      that.traceMode = !that.traceMode;
      that.logEquation();
    });

    $( function() {
      var handle = $( "#custom-handle" );
      $( "#slider" ).slider({
        create: function() {
          handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
          handle.text( ui.value );
          let c = parseFloat(ui.value);
          that.c = c;
          that.logEquation(c);
        },
        min: -10,
        max: 10,
        step: 0.1
      });
    } );
  }

  drawGraphOnce(compiledExpr) {
    this.plane.drawAxes();
    this.drawAnything(compiledExpr, this.c);
  }

  adjustSliderBounds() {
    let cMinVal = parseFloat(document.getElementById('c-min').value);
    let cMaxVal = parseFloat(document.getElementById('c-max').value);
    $( "#slider" ).slider( "option", "min", cMinVal );
    $( "#slider" ).slider( "option", "max", cMaxVal );
  }

  logEquation() { // called on input in forms
    let that = this;
    if (typeof(that.c) !== "number") {
      that.c = 0;
    }

    let expr = document.getElementById('expression');
    let pretty = document.getElementById('pretty');

    let node = null;

    try {
      node = math.parse(expr.value);
      let compiledExpr = node.compile();
      that.compiledExpr = compiledExpr;
      that.drawGraphOnce(compiledExpr, that.c);
    }
    catch (err) {
      console.log(err.toString());
    }

    try {
      let latex = node ? node.toTex({implicit:'show'}) : '';
      // console.log(latex);
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
      that.compiledExpr = compiledExpr;
      that.animateGraph(compiledExpr);
    }
    catch (err) {
    }
  }


  animateGraph(compiledExpr) {
    let that = this;
    let cMinVal = parseFloat(document.getElementById('c-min').value);
    let cMaxVal = parseFloat(document.getElementById('c-max').value);
    if ( cMaxVal <= cMinVal ) {
      cMaxVal = cMinVal + 20;
      document.getElementById('c-max').value = cMaxVal;
    }
    let cIncrementVal = (cMaxVal - cMinVal) / 50;

    let c = cMinVal;

    function step() {
      that.plane.drawAxes();
      // drawParabola(c)
      // drawSin(c)

      that.drawAnything(compiledExpr, c);
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
    let that = this;

    for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
      let xCoord = UTIL.calcXCoord(xPixel, canvas, that.plane);
      let scope = {x: xCoord, c: c}

      try {
        let yCoord = math.format(compiledExpr.eval(scope));

        let yPixel = UTIL.calcYPixel(parseFloat(yCoord), canvas, that.plane);

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

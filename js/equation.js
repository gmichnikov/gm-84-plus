//pass a color to each equation
import * as UTIL from './util';

class Equation {
  constructor(num, plane, startingColor) {
    this.num = num;
    this.plane = plane;
    this.traceMode = false;
    this.compiledExpr = null;
    this.startingColor = startingColor;
    this.hidden = false;

    this.setup(startingColor);
    this.logEquation(0);
    // this.drawGraphOnce = this.drawGraphOnce.bind(this);
    // this.logEquation = this.logEquation.bind(this);
  }

  setup(startingColor) {
    $(`#colorpicker${this.num}`).spectrum({
      showPaletteOnly: true,
      showPalette:true,
      hideAfterPaletteSelect:true,
      color: startingColor,
      palette: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', UTIL.randomColor()],
      change: () => this.logEquation(),
    });

    let that = this;

    $(`#randomColor${this.num}`).on("change", () => this.logEquation());
    $('#draw-graph').on("click", () => this.animateGraphNow());
    $('.trigger-redraw').on("input", () => this.logEquation());

    $(`#trace-mode${this.num}`).on("click", () => {
      that.traceMode = !that.traceMode;
      that.logEquation();
    });

  }

  drawGraphOnce(compiledExpr) {
    this.plane.drawAxes();
    this.drawAnything(compiledExpr, this.plane.c);
  }


  logEquation() { // called on input in forms
    let that = this;
    if (typeof(that.c) !== "number") {
      that.c = 0;
    }

    let expr = document.getElementById(`expression${this.num}`);
    let pretty = document.getElementById(`pretty${this.num}`);

    let node = null;

    try {
      node = math.parse(expr.value);
      let compiledExpr = node.compile();
      that.compiledExpr = compiledExpr;
      that.drawGraphOnce(compiledExpr, that.plane.c);
    }
    catch (err) {
      console.log(err.toString());
    }

    try {
      let nodeWithY = math.parse(`Y==${expr.value}`);

      let latex = nodeWithY ? nodeWithY.toTex({implicit:'show'}) : '';
      let elem = MathJax.Hub.getAllJax(`pretty${this.num}`)[0];
      if (!elem) {
        pretty.innerHTML = '$$' + nodeWithY.toTex() + '$$';
      }
      MathJax.Hub.Queue(['Text', elem, latex]);
    }
    catch (err) {
      console.log("latex error");
    }
  }



  animateGraphNow() {
    let that = this;
    let colorpicker = document.getElementById(`colorpicker${this.num}`);

    let drawButton = document.getElementById('draw-graph');
    drawButton.disabled = true;

    let expr = document.getElementById(`expression${this.num}`);

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
    ctx.fillStyle = this.startingColor;
    let chooseRandom = document.getElementById(`randomColor${this.num}`).checked;
    let selectedColor = $(`#colorpicker${this.num}`).spectrum("get");
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

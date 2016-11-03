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

    this.showSolution = false;
    this.currentSolution = null;

    this.setup(startingColor);
    this.logEquation();
  }

  setup(startingColor) {
    $(`#colorpicker${this.num}`).spectrum({
      showPaletteOnly: true,
      showPalette:true,
      hideAfterPaletteSelect:true,
      color: startingColor,
      palette: ['black', 'maroon', 'orange', 'goldenrod', 'darkgreen', 'navy', 'purple'],
      change: () => this.plane.logAllEquations(),
    });

    let that = this;

    $(`#randomColor${this.num}`).on("change", () => this.plane.logAllEquations());
    $('.trigger-redraw').on("change", () => this.plane.logAllEquations());
    $('.trigger-redraw').on("input", () => this.plane.logAllEquations());
    $(`#hide-graph${this.num}`).on("change", () => this.toggleHide());

    $(`#trace-mode${this.num}`).on("click", () => {
      that.traceMode = !that.traceMode;
      if($(`#trace-mode${this.num}`)[0].checked) {
        $(`#hide-graph${this.num}`)[0].checked = false;
        that.hidden = false;
        that.plane.tracing = true;
        that.plane.equations.forEach((eq) => {
          if (eq.num !== this.num) {
            $(`#trace-mode${eq.num}`)[0].checked = false;
            eq.traceMode = false;
          }
        });
      } else {
        that.plane.tracing = false;
      }

      that.plane.logAllEquations();
    });


    $(`#solution${this.num}`).on("click", () => {
      that.showSolution = !that.showSolution;

      if($(`#solution${this.num}`)[0].checked) {
        $(`#hide-graph${this.num}`)[0].checked = false;
        that.hidden = false;
        that.plane.equations.forEach((eq) => {
          if (eq.num !== this.num) {
            $(`#solution${eq.num}`)[0].checked = false;
            eq.showSolution = false;
          }
        });
      }

      that.plane.logAllEquations();
    });


  }

  toggleHide() {
    this.hidden = !this.hidden;
    if (this.hidden) {
      if (this.traceMode) {
        this.traceMode = false;
        this.plane.tracing = false;
        $(`#trace-mode${this.num}`)[0].checked = false;
      }
    }
    this.plane.logAllEquations();
  }


  drawGraphOnce(compiledExpr) {
    if (!this.plane.axesDrawn) {
      this.plane.drawAxes();
      this.plane.axesDrawn = true;
    }
    this.drawAnything(compiledExpr, this.plane.c);
  }


  logEquation() { // called on input in forms
    let that = this;
    if (typeof(that.plane.c) !== "number") {
      that.plane.c = 0;
    }

    let expr = document.getElementById(`hidden-expression-${this.num}`);

    let node = null;

    try {
      node = math.parse(expr.innerHTML);
      let compiledExpr = node.compile();
      that.compiledExpr = compiledExpr;
      that.drawGraphOnce(compiledExpr, that.plane.c);
    }
    catch (err) {
    }


  }


  drawAnything() {
    let ctx = this.plane.ctx;
    let canvas = this.plane.ctx.canvas;
    ctx.fillStyle = this.startingColor;
    let chooseRandom = document.getElementById(`randomColor${this.num}`).checked;
    let selectedColor = $(`#colorpicker${this.num}`).spectrum("get");
    let that = this;
    let signChange = false;
    let mostRecentSign = null;
    let currentSign = null;
    let solutionCoords = null;

    for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
      let xCoord = UTIL.calcXCoord(xPixel, canvas, that.plane);
      let scope = {x: xCoord, c: that.plane.c}

      try {
        let notReal = math.format(that.compiledExpr.eval(scope)).includes("i");
        let yCoord = parseFloat(math.format(that.compiledExpr.eval(scope)));
        // if (-3 < xCoord && xCoord < -2) console.log(notReal, yCoord);

        if (!isNaN(yCoord) && !notReal) {
          let yPixel = UTIL.calcYPixel(parseFloat(yCoord), canvas, that.plane);
          ctx.beginPath();
          ctx.arc(xPixel, yPixel, 3, 0, Math.PI*2);
          ctx.fillStyle = chooseRandom ? UTIL.randomColor() : selectedColor;
          ctx.fill();
          ctx.closePath();

          currentSign = ( yCoord > 0 ? "positive" : (yCoord < 0 ? "negative" : "zero"));
          if (!signChange && that.showSolution &&
            (currentSign === "zero" || (mostRecentSign && currentSign !== mostRecentSign))) {
            signChange = true;
            solutionCoords = that.drawSolution(xCoord, yCoord, currentSign);
          } else {
            mostRecentSign = currentSign;
          }

        }
      }
      catch (err) {
      }
    }
    if (solutionCoords) {
      ctx.textAlign = "left";
      ctx.font = "16px Arial";
      let text = `(${math.round(solutionCoords[0], 5)}, ${math.round(solutionCoords[1], 5)})`;
      let textWidth = ctx.measureText(text).width;
      ctx.fillStyle = "orange";
      ctx.fillText(text, 20, 340);
    }
  }

  drawSolution(xCoord, yCoord, currentSign) {
    let derivative;
    let nearbyX;
    let nearbyY;
    let that = this;

    if (currentSign !== "zero") {
      for (var i = 0; i < 3; i++) {
        nearbyX = xCoord + 0.01;
        nearbyY = parseFloat(math.format(that.compiledExpr.eval({x: nearbyX, c: that.plane.c})));
        derivative = (nearbyY - yCoord) / 0.01;
        xCoord = xCoord - yCoord/derivative;
        yCoord = parseFloat(math.format(that.compiledExpr.eval({x: xCoord, c: that.plane.c})));
      }
    }
    let xPixel = UTIL.calcXPixel(xCoord, that.plane.canvas, that.plane);
    let yPixel = UTIL.calcYPixel(yCoord, that.plane.canvas, that.plane);

    let ctx = that.plane.ctx;
    ctx.beginPath();
    ctx.arc(xPixel, yPixel, 10, 0, Math.PI*2);
    let prevFillStyle = ctx.fillStyle;
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = prevFillStyle;
    return [xCoord, yCoord];
  }

}

export default Equation;

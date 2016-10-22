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
    this.logEquation();
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
      change: () => this.plane.logAllEquations(),
    });

    let that = this;

    $(`#randomColor${this.num}`).on("change", () => this.plane.logAllEquations());
    $('.trigger-redraw').on("input", () => this.plane.logAllEquations());
    $(`#hide-graph${this.num}`).on("change", () => this.toggleHide());

    $(`#trace-mode${this.num}`).on("click", () => {
      that.traceMode = !that.traceMode;
      that.plane.logAllEquations();
    });

  }

  toggleHide() {
    this.hidden = !this.hidden;
    console.log(this.hidden);
    this.plane.logAllEquations();
  }


  drawGraphOnce(compiledExpr) {
    console.log(this.plane.axesDrawn);
    if (!this.plane.axesDrawn) {
      console.log("drawing axes drawgraphonce");
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

    let expr = document.getElementById(`expression${this.num}`);
    let pretty = document.getElementById(`pretty${this.num}`);

    let node = null;

    try {
      node = math.parse(expr.value);
      let compiledExpr = node.compile();
      that.compiledExpr = compiledExpr;
      that.drawGraphOnce(compiledExpr, that.plane.c);
      console.log("tried to draw");
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

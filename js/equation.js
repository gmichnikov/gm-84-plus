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
    // let pretty = document.getElementById(`pretty${this.num}`);
    // console.log(expr);

    let node = null;

    try {
      node = math.parse(expr.innerHTML);
      let compiledExpr = node.compile();
      that.compiledExpr = compiledExpr;
      that.drawGraphOnce(compiledExpr, that.plane.c);
    }
    catch (err) {
      // console.log(err.toString());
    }

    // try {
    //   let nodeWithY = math.parse(`Y==${expr.value}`);
    //   // console.log("step1");
    //   let latex = nodeWithY ? nodeWithY.toTex({implicit:'show'}) : '';
    //   // console.log("step2");
    //
    //   let elem = MathJax.Hub.getAllJax(`pretty${this.num}`)[0];
    //   // console.log("step3");
    //   if (!elem) {
    //     // console.log("step4");
    //     pretty.innerHTML = '$$' + nodeWithY.toTex() + '$$';
    //   }
    //   // console.log("step5");
    //   MathJax.Hub.Queue(['Text', elem, latex]);
    //   // console.log("step6");
    //
    // }
    // catch (err) {
    //   console.log("latex error");
    // }
  }


  drawAnything() {
    let ctx = this.plane.ctx;
    let canvas = this.plane.ctx.canvas;
    ctx.fillStyle = this.startingColor;
    let chooseRandom = document.getElementById(`randomColor${this.num}`).checked;
    let selectedColor = $(`#colorpicker${this.num}`).spectrum("get");
    let that = this;

    for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
      let xCoord = UTIL.calcXCoord(xPixel, canvas, that.plane);
      let scope = {x: xCoord, c: that.plane.c}

      try {
        let yCoord = math.format(that.compiledExpr.eval(scope));

        if (!isNaN(yCoord)) {
          let yPixel = UTIL.calcYPixel(parseFloat(yCoord), canvas, that.plane);
          ctx.beginPath();
          ctx.arc(xPixel, yPixel, 3, 0, Math.PI*2);
          ctx.fillStyle = chooseRandom ? UTIL.randomColor() : selectedColor;
          ctx.fill();
          ctx.closePath();
        }
      }
      catch (err) {
      }
    }
  }

}

export default Equation;

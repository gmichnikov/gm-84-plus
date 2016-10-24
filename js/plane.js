import Equation from './equation.js';
// import mathquillSetup from './mathquill_setup.js';
import * as UTIL from './util';

class Plane {
  constructor(ctx, xMin = -10, xMax = 10, yMin = -10, yMax = 10) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;

    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zoomFactor = 1.15;
    this.panFactor = 0.1;

    this.mouseXPixel = this.canvas.width/2;
    this.mouseYPixel = this.canvas.height/2;
    this.mouseX = 0;
    this.mouseY = 0;

    this.mousePressed = false;
    this.drag = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    this.updateAxisLocations();
    this.bindEvents();

    this.c = 0;

    this.equation1 = new Equation(1, this, 'maroon');
    this.equation2 = new Equation(2, this, 'navy');
    this.equations = [this.equation1, this.equation2];
    this.axesDrawn = false;
    this.tracing = false;

  }

  bindEvents() {
    let that = this;
    $('.window-values').on("input", () => this.updateWindow());
    $('#reset-window-standard').on("click", () => this.resetWindow(-10, 10, -10, 10));
    $('#reset-window-square').on("click", () => this.resetWindow(-16, 16, -10, 10));
    $('#zoom-in').on("click", () => this.zoom("in", true));
    $('#zoom-out').on("click", () => this.zoom("out", true));
    $('#pan-left').on("click", () => this.pan("left"));
    $('#pan-right').on("click", () => this.pan("right"));
    $('#pan-up').on("click", () => this.pan("up"));
    $('#pan-down').on("click", () => this.pan("down"));
    $('.y-equals-hider').on("click", () => $('.equations').toggleClass('hide-equations'));
    $('.c-data').on("input", () => this.adjustSliderBounds());
    $('#animate-graph').on("click", () => this.animateGraphNow());


    $( function() {
      var handle = $( "#custom-handle" );
      $( "#slider" ).slider({
        create: function() {
          handle.text( "c = " + $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
          handle.text( "c = " + ui.value );
          let c = parseFloat(ui.value);
          that.c = c;
          that.logAllEquations();
        },
        min: -10,
        max: 10,
        step: 0.4
      });
    } );

    $(window).bind('mousewheel', function(e){
      if(e.originalEvent.wheelDelta /120 > 0) {
        that.zoom("in");
      }
      else{
        that.zoom("out");
      }
    });

    $(document).mousedown(function(){
        that.mousePressed = true;
    }).mouseup(function(){
        that.mousePressed = false;
    });

    document.addEventListener("mousemove", mouseMoveHandler, false);
    function mouseMoveHandler(e) {
      // console.log(that.canvas.offsetLeft, that.canvas.offsetTop);
      that.mouseXPixel = e.clientX - (that.canvas.offsetLeft + $('.container')[0].offsetLeft);
      that.mouseYPixel = e.clientY - (that.canvas.offsetTop + $('.container')[0].offsetTop);
      that.mouseX = UTIL.calcXCoord(that.mouseXPixel, that.canvas, that);
      that.mouseY = UTIL.calcYCoord(that.mouseYPixel, that.canvas, that);

      let ctx = that.ctx;

      if (that.tracing) {

        let equation = that.equations.find((eq) => {
          return eq.traceMode;
        });

        let scope = { x: that.mouseX, c: that.c };
        let yCoord = math.format(equation.compiledExpr.eval(scope));
        let yPixel = UTIL.calcYPixel(parseFloat(yCoord), that.canvas, that);

        equation.logEquation();

        if (!isNaN(yCoord)) {
          ctx.beginPath();
          ctx.arc(that.mouseXPixel, yPixel, 10, 0, Math.PI*2);
          ctx.fillStyle = "yellow";
          ctx.fill();
          ctx.closePath();

          ctx.textAlign = "left";
          ctx.font = "16px Arial";
          let text = `(${math.round(that.mouseX, 3)}, ${math.round(yCoord, 3)})`;
          let textWidth = ctx.measureText(text).width;
          ctx.fillStyle = "yellow";
          ctx.fillText(text, 20, 20);
        }
        that.axesDrawn = false;
      } else {

        that.logAllEquations();
        ctx.textAlign = "left";
        ctx.font = "16px Arial";
        let text = `(${math.round(that.mouseX, 3)}, ${math.round(that.mouseY, 3)})`;
        let textWidth = ctx.measureText(text).width;
        ctx.fillStyle = "black";
        ctx.fillText(text, 20, 20);
        that.axesDrawn = false;


      }
      // console.log(that.mouseXPixel, that.mouseYPixel);
      // console.log(that.mouseX, that.mouseY);
    }

    window.requestAnimationFrame(() => this.dragUpdate());

  }

  logAllEquations() {
    let allHidden = true;
    this.equations.forEach((eq) => {
      if (!eq.hidden) {
        allHidden = false;
        eq.logEquation();
      }
    });
    if (allHidden) {
      this.drawAxes();
    }
    this.axesDrawn = false;
  }

  adjustSliderBounds() {
    let cMinVal = parseFloat(document.getElementById('c-min').value);
    let cMaxVal = parseFloat(document.getElementById('c-max').value);
    $( "#slider" ).slider( "option", "min", cMinVal );
    $( "#slider" ).slider( "option", "max", cMaxVal );
    $( "#slider" ).slider( "option", "step", (cMaxVal - cMinVal)/50 );
  }

  dragUpdate() {
    let that = this;
    let pixelsDraggedX = 0;
    let pixelsDraggedY = 0;
    let unitsDraggedX = 0;
    let unitsDraggedY = 0;
    if (that.mousePressed) {
        if (!that.drag) {  // picking up the plane
          that.dragstartX = that.mouseXPixel;
          that.dragstartY = that.mouseYPixel;
        }
        if (that.mouseInBounds()){ // turn drag on if clicked and in bounds
          that.drag = true;
        }

    } else { // if not clicked
      that.drag = false;
    }

    if (that.drag) {
        pixelsDraggedX = that.mouseXPixel - that.dragstartX;
        pixelsDraggedY = that.mouseYPixel - that.dragstartY;
        that.dragstartX = that.mouseXPixel;
        that.dragstartY = that.mouseYPixel;
    }

    if (math.abs(pixelsDraggedY) > 0 || math.abs(pixelsDraggedX) > 0) {
      unitsDraggedX = (pixelsDraggedX / that.canvas.width) * (that.xMax - that.xMin);
      unitsDraggedY = -(pixelsDraggedY / that.canvas.height) * (that.yMax - that.yMin);
      this.resetWindow(that.xMin - unitsDraggedX, that.xMax - unitsDraggedX, that.yMin - unitsDraggedY, that.yMax - unitsDraggedY);
    }

    window.requestAnimationFrame(() => this.dragUpdate());
  }

  mouseInBounds() {
    // console.log(this.mouseXPixel, this.mouseYPixel);
    return this.mouseXPixel > 0 && this.mouseXPixel < this.canvas.width && this.mouseYPixel > 0 && this.mouseYPixel < this.canvas.height;

  }

  zoom(direction, button = false) {
    if(this.mouseInBounds() || button) {
      let multiplier = (direction === "in" ? 1/this.zoomFactor : this.zoomFactor);

      let centerX = (this.xMax + this.xMin)/2;
      let dilationX = (button ? centerX : this.mouseX);
      this.xMax = (this.xMax - dilationX) * multiplier + dilationX;
      this.xMin = dilationX - (dilationX - this.xMin) * multiplier;

      let centerY = (this.yMax + this.yMin)/2;
      let dilationY = (button ? centerY : this.mouseY);
      this.yMax = (this.yMax - dilationY) * multiplier + dilationY;
      this.yMin = dilationY - (dilationY - this.yMin) * multiplier;

      this.resetWindow(this.xMin, this.xMax, this.yMin, this.yMax);
    }
  }

  pan(direction) {
    let xAdjust = (this.xMax - this.xMin) * this.panFactor;
    let yAdjust = (this.yMax - this.yMin) * this.panFactor;
    if (direction === "left") {
      this.resetWindow(this.xMin - xAdjust, this.xMax - xAdjust, this.yMin, this.yMax);
    } else if (direction === "right") {
      this.resetWindow(this.xMin + xAdjust, this.xMax + xAdjust, this.yMin, this.yMax);
    } else if (direction === "up") {
      this.resetWindow(this.xMin, this.xMax, this.yMin + yAdjust, this.yMax + yAdjust);
    } else if (direction === "down") {
      this.resetWindow(this.xMin, this.xMax, this.yMin - yAdjust, this.yMax - yAdjust);
    } else {
    }
  }

  updateAxisLocations() {
    this.yAxisPercentOver = -this.xMin / (this.xMax - this.xMin);
    this.yAxisPixelsOver = this.yAxisPercentOver * this.canvas.width;
    this.xAxisPercentDown = 1 - (-this.yMin / (this.yMax - this.yMin));
    this.xAxisPixelsDown = this.xAxisPercentDown * this.canvas.height;
  }

  updateWindow() {
    this.xMin = parseFloat(document.getElementById('window-x-min').value);
    this.xMax = parseFloat(document.getElementById('window-x-max').value);
    this.yMin = parseFloat(document.getElementById('window-y-min').value);
    this.yMax = parseFloat(document.getElementById('window-y-max').value);
    this.updateAxisLocations();
    this.logAllEquations();
  }

  resetWindow(xMin, xMax, yMin, yMax) {
    document.getElementById('window-x-min').value = xMin;
    document.getElementById('window-x-max').value = xMax;
    document.getElementById('window-y-min').value = yMin;
    document.getElementById('window-y-max').value = yMax;
    this.updateWindow();
  }

  drawAxes() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.ctx.beginPath();
    this.ctx.rect(0, this.xAxisPixelsDown, this.canvas.width, 1); // x axis
    this.ctx.rect(this.yAxisPixelsOver, 0, 1, this.canvas.height); // y axis
    // this.ctx.fillStyle = "#FF0000";
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
    // this.drawAxisLabels();
  }

  drawAxisLabels() {
    let estFontHeight = 20;
    let yMaxLabelHeight = 16;
    let yMinLabelHeight = this.canvas.height - estFontHeight + 16;
    let xMaxLabelX = this.canvas.width;
    let xMinLabelX = 0;
    this.ctx.textAlign = "center";
    this.ctx.font = "16px Arial";

    let xMinTextWidth = this.ctx.measureText(math.round(this.xMin, 1)).width;
    let xMaxTextWidth = this.ctx.measureText(math.round(this.xMax, 1)).width;
    let yMinTextWidth = this.ctx.measureText(math.round(this.yMin, 1)).width;
    let yMaxTextWidth = this.ctx.measureText(math.round(this.yMax, 1)).width;

    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(this.yAxisPixelsOver - yMaxTextWidth/2, 0, yMaxTextWidth, estFontHeight);
    this.ctx.fillRect(this.yAxisPixelsOver - yMinTextWidth/2, this.canvas.height - estFontHeight, yMinTextWidth, estFontHeight);
    this.ctx.fillRect(0, this.xAxisPixelsDown - estFontHeight/2, xMinTextWidth, estFontHeight);
    this.ctx.fillRect(this.canvas.width - xMaxTextWidth, this.xAxisPixelsDown - estFontHeight/2, xMaxTextWidth, estFontHeight);


    this.ctx.fillStyle = "white";
    this.ctx.fillText(math.round(this.yMax, 1), this.yAxisPixelsOver, yMaxLabelHeight);
    this.ctx.fillText(math.round(this.yMin, 1), this.yAxisPixelsOver, yMinLabelHeight);
    this.ctx.fillText(math.round(this.xMin, 1), xMinTextWidth/2, this.xAxisPixelsDown + 7);
    this.ctx.fillText(math.round(this.xMax, 1), this.canvas.width - xMaxTextWidth/2, this.xAxisPixelsDown + 7);
  }


  animateGraphNow() {
    let that = this;
    // let drawButton = document.getElementById('animate-graph');
    // drawButton.disabled = true;

    try {
      that.equations.forEach((eq) => {
        let expr = document.getElementById(`hidden-expression-${eq.num}`);
        let node = math.parse(expr.innerHTML);
        let compiledExpr = node.compile();
        eq.compiledExpr = compiledExpr;
      });
      that.animateAllGraphs();
    }
    catch (err) {
    }
  }

  animateAllGraphs() {
    let that = this;
    let cMinVal = parseFloat(document.getElementById('c-min').value);
    let cMaxVal = parseFloat(document.getElementById('c-max').value);
    if ( cMaxVal <= cMinVal ) {
      cMaxVal = cMinVal + 20;
      document.getElementById('c-max').value = cMaxVal;
    }
    let cIncrementVal = (cMaxVal - cMinVal) / 50;

    that.c = cMinVal;

    function step() {
      if(!that.axesDrawn) {
        that.drawAxes();
        that.axesDrawn = true;
      }
      // drawParabola(c)
      // drawSin(c)

      that.equations.forEach((eq) => {
        if (!eq.hidden) {
          eq.drawAnything();
        }
      });
      that.axesDrawn = false;

      $( "#slider" ).slider( "value", that.c );
      $( "#custom-handle" ).text(`c = ${that.c}`);

      that.c = math.round(that.c + cIncrementVal, 2);
      if (that.c <= cMaxVal) {
        window.requestAnimationFrame(step);
      } else {
        // let drawButton = document.getElementById('animate-graph');
        // drawButton.disabled = false;
      }
    }
    window.requestAnimationFrame(step);
  }

}

export default Plane;

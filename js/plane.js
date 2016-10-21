import Equation from './equation.js';
import * as UTIL from './util';

class Plane {
  constructor(ctx, xMin = -10, xMax = 10, yMin = -10, yMax = 10) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;

    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zoomFactor = 2;

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

    this.equation = new Equation(this);
  }

  bindEvents() {
    let that = this;
    $('.window-values').on("input", () => this.updateWindow());
    $('#reset-window-standard').on("click", () => this.resetWindow(-10, 10, -10, 10));
    $('#reset-window-square').on("click", () => this.resetWindow(-15, 15, -10, 10));
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
      that.mouseXPixel = e.clientX - that.canvas.offsetLeft;
      that.mouseYPixel = e.clientY - that.canvas.offsetTop;
      that.mouseX = UTIL.calcXCoord(that.mouseXPixel, that.canvas, that);
      that.mouseY = UTIL.calcYCoord(that.mouseYPixel, that.canvas, that);
      // console.log(that.mouseXPixel, that.mouseYPixel);
      // console.log(that.mouseX, that.mouseY);
    }

    window.requestAnimationFrame(() => this.dragUpdate());

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
    return this.mouseXPixel > 0 && this.mouseXPixel < this.canvas.width && this.mouseYPixel > 0 && this.mouseYPixel < this.canvas.height;
  }

  zoom(direction) {
    if(this.mouseInBounds()) {
      let multiplier = (direction === "in" ? 1/this.zoomFactor : this.zoomFactor);

      let dilationX = this.mouseX;
      this.xMax = (this.xMax - dilationX) * multiplier + dilationX;
      this.xMin = dilationX - (dilationX - this.xMin) * multiplier;

      let dilationY = this.mouseY;
      this.yMax = (this.yMax - dilationY) * multiplier + dilationY;
      this.yMin = dilationY - (dilationY - this.yMin) * multiplier;

      this.resetWindow(this.xMin, this.xMax, this.yMin, this.yMax);
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
    this.equation.logEquation();
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
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();
    this.drawAxisLabels();
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

}

export default Plane;

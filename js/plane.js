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
    this.zoomFactor = 1.15;

    this.mouseXPixel = this.canvas.width/2;
    this.mouseYPixel = this.canvas.height/2;

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
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function mouseMoveHandler(e) {
      that.mouseXPixel = e.clientX - that.canvas.offsetLeft;
      that.mouseYPixel = e.clientY - that.canvas.offsetTop;
    }
  }

  mouseInBounds() {
    return this.mouseXPixel > 0 && this.mouseXPixel < this.canvas.width && this.mouseYPixel > 0 && this.mouseYPixel < this.canvas.height;
  }

  zoom(direction) {
    if(this.mouseInBounds()) {
      let multiplier = (direction === "in" ? 1/this.zoomFactor : this.zoomFactor);

      let centerX = (this.xMax + this.xMin) / 2;
      this.xMax = (this.xMax - centerX) * multiplier + centerX;
      this.xMin = centerX - (centerX - this.xMin) * multiplier;

      let centerY = (this.yMax + this.yMin) / 2;
      this.yMax = (this.yMax - centerY) * multiplier + centerY;
      this.yMin = centerY - (centerY - this.yMin) * multiplier;
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

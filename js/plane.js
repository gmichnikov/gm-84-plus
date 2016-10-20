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
    this.updateAxisLocations();
    this.bindEvents();

    this.equation = new Equation(this);
  }

  bindEvents() {
    $('.window-values').on("input", () => this.updateWindow());
    $('#reset-window-standard').on("click", () => this.resetWindow(-10, 10, -10, 10));
    $('#reset-window-square').on("click", () => this.resetWindow(-15, 15, -10, 10));
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

    let xMinTextWidth = this.ctx.measureText(this.xMin).width;
    let xMaxTextWidth = this.ctx.measureText(this.xMax).width;
    let yMinTextWidth = this.ctx.measureText(this.yMin).width;
    let yMaxTextWidth = this.ctx.measureText(this.yMax).width;

    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(this.yAxisPixelsOver - yMaxTextWidth/2, 0, yMaxTextWidth, estFontHeight);
    this.ctx.fillRect(this.yAxisPixelsOver - yMinTextWidth/2, this.canvas.height - estFontHeight, yMinTextWidth, estFontHeight);
    this.ctx.fillRect(0, this.xAxisPixelsDown - estFontHeight/2, xMinTextWidth, estFontHeight);
    this.ctx.fillRect(this.canvas.width - xMaxTextWidth, this.xAxisPixelsDown - estFontHeight/2, xMaxTextWidth, estFontHeight);


    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.yMax, this.yAxisPixelsOver, yMaxLabelHeight);
    this.ctx.fillText(this.yMin, this.yAxisPixelsOver, yMinLabelHeight);
    this.ctx.fillText(this.xMin, xMinTextWidth/2, this.xAxisPixelsDown + 7);
    this.ctx.fillText(this.xMax, this.canvas.width - xMaxTextWidth/2, this.xAxisPixelsDown + 7);
  }

}

export default Plane;

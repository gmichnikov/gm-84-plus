import Equation from './equation.js';
import * as UTIL from './util';

class Plane {
  constructor(ctx, xMin = -5, xMax = 15, yMin = -10, yMax = 20) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;

    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.yAxisPercentOver = -this.xMin / (this.xMax - this.xMin);
    this.yAxisPixelsOver = this.yAxisPercentOver * this.canvas.width;
    this.xAxisPercentDown = 1 - (-this.yMin / (this.yMax - this.yMin));
    this.xAxisPixelsDown = this.xAxisPercentDown * this.canvas.height;

    this.equation = new Equation(this);
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
    let yMaxLabelHeight = 14;
    let estFontHeight = 20;
    this.ctx.textAlign = "center";
    this.ctx.font = "16px Arial";

    let xMinTextWidth = this.ctx.measureText(this.xMin).width;
    let xMaxTextWidth = this.ctx.measureText(this.xMax).width;
    let yMinTextWidth = this.ctx.measureText(this.yMin).width;
    let yMaxTextWidth = this.ctx.measureText(this.yMax).width;
    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(this.yAxisPixelsOver - yMaxTextWidth/2, 0, yMaxTextWidth, estFontHeight);
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.yMax, this.yAxisPixelsOver, yMaxLabelHeight);
  }

}

export default Plane;

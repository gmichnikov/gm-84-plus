class Plane {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  drawAxes() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.ctx.beginPath();
    this.ctx.rect(this.canvas.width/2, 0, 1, this.canvas.height);
    this.ctx.rect(0, this.canvas.height/2, this.canvas.width, 1);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.font = "16px Arial";
    let textWidth = this.ctx.measureText('10').width;
    this.ctx.fillRect(this.canvas.width/2 - textWidth/2, 0, textWidth, 20)
    this.ctx.fillStyle = "purple";
    this.ctx.fillText("10", this.canvas.width/2, 14);
  }


}

export default Plane;

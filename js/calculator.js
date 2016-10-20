import Plane from './plane';
import * as UTIL from './util';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const plane = new Plane(ctx);
plane.drawAxes();




// document.addEventListener("mousemove", mouseMoveHandler, false);
// function mouseMoveHandler(e) {
//     let relativeX = e.clientX - canvas.offsetLeft;
//     // console.log(math.round(calcXCoord(relativeX), 1));
// }

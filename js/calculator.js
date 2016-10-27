import Plane from './plane';
import * as UTIL from './util';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const plane = new Plane(ctx);

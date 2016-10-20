/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _plane = __webpack_require__(1);
	
	var _plane2 = _interopRequireDefault(_plane);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	var plane = new _plane2.default(canvas, ctx);
	
	// document.addEventListener("mousemove", mouseMoveHandler, false);
	// function mouseMoveHandler(e) {
	//     let relativeX = e.clientX - canvas.offsetLeft;
	//     // console.log(math.round(calcXCoord(relativeX), 1));
	// }
	
	function calcXCoord(xPixel) {
	  return (xPixel - canvas.width / 2) / (canvas.width / 20);
	}
	
	function calcYPixel(xCoord, c) {
	  // x^2 + 2x - 3
	  var yCoord = Math.pow(xCoord, 2) + 2 * xCoord + c;
	  // console.log("x", xCoord, "y", yCoord);
	  return -canvas.height / 20 * yCoord + canvas.height / 2;
	}
	
	function calcYPixelSin(xCoord, c) {
	  var yCoord = c * math.sin(xCoord + c);
	  return -canvas.height / 20 * yCoord + canvas.height / 2;
	}
	
	function rand256() {
	  return math.randomInt(0, 256);
	}
	
	function randomColor() {
	  var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	  return "rgba(" + rand256() + ", " + rand256() + ", " + rand256() + ", " + opacity;
	}
	
	function drawParabola(c) {
	  for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
	    var xCoord = calcXCoord(xPixel);
	    var yPixel = calcYPixel(xCoord, c);
	    ctx.beginPath();
	    ctx.arc(xPixel, yPixel, 3, 0, Math.PI * 2);
	    ctx.fillStyle = randomColor();
	    ctx.fill();
	    ctx.closePath();
	  }
	}
	
	function drawSin(c) {
	  for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
	    var xCoord = calcXCoord(xPixel);
	    var yPixel = calcYPixelSin(xCoord, c);
	    ctx.beginPath();
	    ctx.arc(xPixel, yPixel, 3, 0, Math.PI * 2);
	    ctx.fillStyle = randomColor();
	    ctx.fill();
	    ctx.closePath();
	  }
	}
	
	function drawAnything(compiledExpr, c) {
	
	  ctx.fillStyle = "black";
	  var chooseRandom = document.getElementById("randomColor").checked;
	  var selectedColor = $("#colorpicker").spectrum("get");
	
	  for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
	    var xCoord = calcXCoord(xPixel);
	    var scope = { x: xCoord, c: c };
	
	    try {
	      var yCoord = math.format(compiledExpr.eval(scope));
	      var yPixel = -canvas.height / 20 * yCoord + canvas.height / 2;
	
	      ctx.beginPath();
	      ctx.arc(xPixel, yPixel, 3, 0, Math.PI * 2);
	      ctx.fillStyle = chooseRandom ? randomColor() : selectedColor;
	      ctx.fill();
	      ctx.closePath();
	    } catch (err) {}
	  }
	}
	
	function animateGraph(compiledExpr) {
	  var cValue = document.getElementById('c-value');
	  var cMinVal = parseFloat(document.getElementById('c-min').value);
	  var cMaxVal = parseFloat(document.getElementById('c-max').value);
	  var cIncrementVal = parseFloat(document.getElementById('c-increment').value);
	
	  console.log(cMinVal, cMaxVal, cIncrementVal);
	
	  var c = cMinVal;
	
	  function step() {
	    plane.drawAxes();
	    // drawParabola(c)
	    // drawSin(c)
	
	    drawAnything(compiledExpr, c);
	    cValue.innerHTML = "c = " + c;
	    $("#slider").slider("value", c);
	    $("#custom-handle").text(c);
	
	    c = math.round(c + cIncrementVal, 2);
	    if (c <= cMaxVal) {
	      window.requestAnimationFrame(step);
	    } else {
	      var drawButton = document.getElementById('draw-graph');
	      drawButton.disabled = false;
	    }
	  }
	  window.requestAnimationFrame(step);
	}
	
	function drawGraphOnce(compiledExpr) {
	  var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	  plane.drawAxes();
	  drawAnything(compiledExpr, c);
	}
	
	function animateGraphNow() {
	  var colorpicker = document.getElementById('colorpicker');
	
	  var drawButton = document.getElementById('draw-graph');
	  drawButton.disabled = true;
	
	  var expr = document.getElementById('expression');
	
	  try {
	    var node = math.parse(expr.value);
	    var compiledExpr = node.compile();
	    animateGraph(compiledExpr);
	  } catch (err) {}
	}
	
	function logEquation(c) {
	  // called on input in forms
	  if (typeof c !== "number") {
	    c = 0;
	  }
	  console.log("C", c);
	
	  var expr = document.getElementById('expression');
	  var xVal = document.getElementById('x-value');
	  var result = document.getElementById('result');
	  var pretty = document.getElementById('pretty');
	
	  var node = null;
	
	  try {
	    node = math.parse(expr.value);
	    var compiledExpr = node.compile();
	    drawGraphOnce(compiledExpr, c);
	    // result.innerHTML = '';
	    var scope = { x: xVal.value, c: c };
	    result.innerHTML = math.format(compiledExpr.eval(scope));
	  } catch (err) {
	    result.innerHTML = '<span style="color: red;">' + err.toString() + '</span>';
	  }
	
	  try {
	    var latex = node ? node.toTex({ implicit: 'show' }) : '';
	    var elem = MathJax.Hub.getAllJax('pretty')[0];
	    MathJax.Hub.Queue(['Text', elem, latex]);
	  } catch (err) {}
	}
	
	$("#colorpicker").spectrum({
	  showPaletteOnly: true,
	  showPalette: true,
	  hideAfterPaletteSelect: true,
	  color: 'black',
	  palette: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'violet'],
	  change: logEquation
	});
	
	$("#randomColor").change(logEquation);
	
	$(function () {
	  var handle = $("#custom-handle");
	  $("#slider").slider({
	    create: function create() {
	      handle.text($(this).slider("value"));
	    },
	    slide: function slide(event, ui) {
	      handle.text(ui.value);
	      var c = parseFloat(ui.value);
	      logEquation(c);
	      document.getElementById('c-value').innerHTML = "c = " + c;
	    },
	    min: -10,
	    max: 10,
	    step: 0.1
	  });
	});
	
	$('#draw-graph').on("click", animateGraphNow);
	$('#expression').on("input", logEquation);
	$('#x-value').on("input", logEquation);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Plane = function () {
	  function Plane(canvas, ctx) {
	    _classCallCheck(this, Plane);
	
	    this.ctx = ctx;
	    this.canvas = canvas;
	  }
	
	  _createClass(Plane, [{
	    key: "drawAxes",
	    value: function drawAxes() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this.ctx.beginPath();
	      this.ctx.rect(this.canvas.width / 2, 0, 1, this.canvas.height);
	      this.ctx.rect(0, this.canvas.height / 2, this.canvas.width, 1);
	      this.ctx.fillStyle = "#FF0000";
	      this.ctx.fill();
	      this.ctx.closePath();
	      this.ctx.textAlign = "center";
	      this.ctx.fillStyle = "white";
	      this.ctx.font = "16px Arial";
	      var textWidth = this.ctx.measureText('10').width;
	      this.ctx.fillRect(this.canvas.width / 2 - textWidth / 2, 0, textWidth, 20);
	      this.ctx.fillStyle = "purple";
	      this.ctx.fillText("10", this.canvas.width / 2, 14);
	    }
	  }]);
	
	  return Plane;
	}();
	
	exports.default = Plane;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
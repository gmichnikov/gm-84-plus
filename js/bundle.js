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

	'use strict';
	
	var _plane = __webpack_require__(1);
	
	var _plane2 = _interopRequireDefault(_plane);
	
	var _util = __webpack_require__(3);
	
	var UTIL = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	var plane = new _plane2.default(ctx);
	// plane.drawAxes();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _equation = __webpack_require__(2);
	
	var _equation2 = _interopRequireDefault(_equation);
	
	var _util = __webpack_require__(3);
	
	var UTIL = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Plane = function () {
	  function Plane(ctx) {
	    var xMin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -10;
	    var xMax = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	    var yMin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -10;
	    var yMax = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
	
	    _classCallCheck(this, Plane);
	
	    this.ctx = ctx;
	    this.canvas = ctx.canvas;
	
	    this.xMin = xMin;
	    this.xMax = xMax;
	    this.yMin = yMin;
	    this.yMax = yMax;
	    this.zoomFactor = 1.15;
	
	    this.mouseXPixel = this.canvas.width / 2;
	    this.mouseYPixel = this.canvas.height / 2;
	
	    this.updateAxisLocations();
	    this.bindEvents();
	
	    this.equation = new _equation2.default(this);
	  }
	
	  _createClass(Plane, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;
	
	      var that = this;
	      $('.window-values').on("input", function () {
	        return _this.updateWindow();
	      });
	      $('#reset-window-standard').on("click", function () {
	        return _this.resetWindow(-10, 10, -10, 10);
	      });
	      $('#reset-window-square').on("click", function () {
	        return _this.resetWindow(-15, 15, -10, 10);
	      });
	      $(window).bind('mousewheel', function (e) {
	        if (e.originalEvent.wheelDelta / 120 > 0) {
	          that.zoom("in");
	        } else {
	          that.zoom("out");
	        }
	      });
	      document.addEventListener("mousemove", mouseMoveHandler, false);
	
	      function mouseMoveHandler(e) {
	        that.mouseXPixel = e.clientX - that.canvas.offsetLeft;
	        that.mouseYPixel = e.clientY - that.canvas.offsetTop;
	      }
	    }
	  }, {
	    key: 'mouseInBounds',
	    value: function mouseInBounds() {
	      return this.mouseXPixel > 0 && this.mouseXPixel < this.canvas.width && this.mouseYPixel > 0 && this.mouseYPixel < this.canvas.height;
	    }
	  }, {
	    key: 'zoom',
	    value: function zoom(direction) {
	      if (this.mouseInBounds()) {
	        var multiplier = direction === "in" ? 1 / this.zoomFactor : this.zoomFactor;
	
	        var centerX = (this.xMax + this.xMin) / 2;
	        this.xMax = (this.xMax - centerX) * multiplier + centerX;
	        this.xMin = centerX - (centerX - this.xMin) * multiplier;
	
	        var centerY = (this.yMax + this.yMin) / 2;
	        this.yMax = (this.yMax - centerY) * multiplier + centerY;
	        this.yMin = centerY - (centerY - this.yMin) * multiplier;
	        this.resetWindow(this.xMin, this.xMax, this.yMin, this.yMax);
	      }
	    }
	  }, {
	    key: 'updateAxisLocations',
	    value: function updateAxisLocations() {
	      this.yAxisPercentOver = -this.xMin / (this.xMax - this.xMin);
	      this.yAxisPixelsOver = this.yAxisPercentOver * this.canvas.width;
	      this.xAxisPercentDown = 1 - -this.yMin / (this.yMax - this.yMin);
	      this.xAxisPixelsDown = this.xAxisPercentDown * this.canvas.height;
	    }
	  }, {
	    key: 'updateWindow',
	    value: function updateWindow() {
	      this.xMin = parseFloat(document.getElementById('window-x-min').value);
	      this.xMax = parseFloat(document.getElementById('window-x-max').value);
	      this.yMin = parseFloat(document.getElementById('window-y-min').value);
	      this.yMax = parseFloat(document.getElementById('window-y-max').value);
	      this.updateAxisLocations();
	      this.equation.logEquation();
	    }
	  }, {
	    key: 'resetWindow',
	    value: function resetWindow(xMin, xMax, yMin, yMax) {
	      document.getElementById('window-x-min').value = xMin;
	      document.getElementById('window-x-max').value = xMax;
	      document.getElementById('window-y-min').value = yMin;
	      document.getElementById('window-y-max').value = yMax;
	      this.updateWindow();
	    }
	  }, {
	    key: 'drawAxes',
	    value: function drawAxes() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this.ctx.beginPath();
	      this.ctx.rect(0, this.xAxisPixelsDown, this.canvas.width, 1); // x axis
	      this.ctx.rect(this.yAxisPixelsOver, 0, 1, this.canvas.height); // y axis
	      this.ctx.fillStyle = "#FF0000";
	      this.ctx.fill();
	      this.ctx.closePath();
	      this.drawAxisLabels();
	    }
	  }, {
	    key: 'drawAxisLabels',
	    value: function drawAxisLabels() {
	      var estFontHeight = 20;
	      var yMaxLabelHeight = 16;
	      var yMinLabelHeight = this.canvas.height - estFontHeight + 16;
	      var xMaxLabelX = this.canvas.width;
	      var xMinLabelX = 0;
	      this.ctx.textAlign = "center";
	      this.ctx.font = "16px Arial";
	
	      var xMinTextWidth = this.ctx.measureText(math.round(this.xMin, 1)).width;
	      var xMaxTextWidth = this.ctx.measureText(math.round(this.xMax, 1)).width;
	      var yMinTextWidth = this.ctx.measureText(math.round(this.yMin, 1)).width;
	      var yMaxTextWidth = this.ctx.measureText(math.round(this.yMax, 1)).width;
	
	      this.ctx.fillStyle = "purple";
	      this.ctx.fillRect(this.yAxisPixelsOver - yMaxTextWidth / 2, 0, yMaxTextWidth, estFontHeight);
	      this.ctx.fillRect(this.yAxisPixelsOver - yMinTextWidth / 2, this.canvas.height - estFontHeight, yMinTextWidth, estFontHeight);
	      this.ctx.fillRect(0, this.xAxisPixelsDown - estFontHeight / 2, xMinTextWidth, estFontHeight);
	      this.ctx.fillRect(this.canvas.width - xMaxTextWidth, this.xAxisPixelsDown - estFontHeight / 2, xMaxTextWidth, estFontHeight);
	
	      this.ctx.fillStyle = "white";
	      this.ctx.fillText(math.round(this.yMax, 1), this.yAxisPixelsOver, yMaxLabelHeight);
	      this.ctx.fillText(math.round(this.yMin, 1), this.yAxisPixelsOver, yMinLabelHeight);
	      this.ctx.fillText(math.round(this.xMin, 1), xMinTextWidth / 2, this.xAxisPixelsDown + 7);
	      this.ctx.fillText(math.round(this.xMax, 1), this.canvas.width - xMaxTextWidth / 2, this.xAxisPixelsDown + 7);
	    }
	  }]);
	
	  return Plane;
	}();
	
	exports.default = Plane;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //pass a color to each equation
	
	
	var _util = __webpack_require__(3);
	
	var UTIL = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Equation = function () {
	  function Equation(plane) {
	    _classCallCheck(this, Equation);
	
	    this.plane = plane;
	    this.setup();
	    this.logEquation(0);
	    // this.drawGraphOnce = this.drawGraphOnce.bind(this);
	    // this.logEquation = this.logEquation.bind(this);
	  }
	
	  _createClass(Equation, [{
	    key: 'setup',
	    value: function setup() {
	      var _this = this;
	
	      $("#colorpicker").spectrum({
	        showPaletteOnly: true,
	        showPalette: true,
	        hideAfterPaletteSelect: true,
	        color: 'black',
	        palette: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', UTIL.randomColor()],
	        change: function change() {
	          return _this.logEquation();
	        }
	      });
	
	      var that = this;
	
	      $("#randomColor").on("change", function () {
	        return _this.logEquation();
	      });
	      $('#draw-graph').on("click", function () {
	        return _this.animateGraphNow();
	      });
	      $('.trigger-redraw').on("input", function () {
	        return _this.logEquation();
	      });
	      $('.c-data').on("input", function () {
	        return _this.adjustSliderBounds();
	      });
	
	      $(function () {
	        var handle = $("#custom-handle");
	        $("#slider").slider({
	          create: function create() {
	            handle.text($(this).slider("value"));
	          },
	          slide: function slide(event, ui) {
	            handle.text(ui.value);
	            var c = parseFloat(ui.value);
	            that.logEquation(c);
	            document.getElementById('c-value').innerHTML = 'c = ' + c;
	          },
	          min: -10,
	          max: 10,
	          step: 0.1
	        });
	      });
	    }
	  }, {
	    key: 'drawGraphOnce',
	    value: function drawGraphOnce(compiledExpr) {
	      var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      this.plane.drawAxes();
	      this.drawAnything(compiledExpr, c);
	    }
	  }, {
	    key: 'adjustSliderBounds',
	    value: function adjustSliderBounds() {
	      var cMinVal = parseFloat(document.getElementById('c-min').value);
	      var cMaxVal = parseFloat(document.getElementById('c-max').value);
	      $("#slider").slider("option", "min", cMinVal);
	      $("#slider").slider("option", "max", cMaxVal);
	    }
	  }, {
	    key: 'logEquation',
	    value: function logEquation(c) {
	      // called on input in forms
	      if (typeof c !== "number") {
	        c = 0;
	      }
	
	      var expr = document.getElementById('expression');
	      var xVal = document.getElementById('x-value');
	      var result = document.getElementById('result');
	      var pretty = document.getElementById('pretty');
	
	      var node = null;
	      var that = this;
	
	      try {
	        node = math.parse(expr.value);
	        var compiledExpr = node.compile();
	        that.drawGraphOnce(compiledExpr, c);
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
	  }, {
	    key: 'animateGraphNow',
	    value: function animateGraphNow() {
	      var that = this;
	      var colorpicker = document.getElementById('colorpicker');
	
	      var drawButton = document.getElementById('draw-graph');
	      drawButton.disabled = true;
	
	      var expr = document.getElementById('expression');
	
	      try {
	        var node = math.parse(expr.value);
	        var compiledExpr = node.compile();
	        that.animateGraph(compiledExpr);
	      } catch (err) {}
	    }
	  }, {
	    key: 'animateGraph',
	    value: function animateGraph(compiledExpr) {
	      var that = this;
	      var cValue = document.getElementById('c-value');
	      var cMinVal = parseFloat(document.getElementById('c-min').value);
	      var cMaxVal = parseFloat(document.getElementById('c-max').value);
	      var cIncrementVal = parseFloat(document.getElementById('c-increment').value);
	
	      console.log(cMinVal, cMaxVal, cIncrementVal);
	
	      var c = cMinVal;
	
	      function step() {
	        that.plane.drawAxes();
	        // drawParabola(c)
	        // drawSin(c)
	
	        that.drawAnything(compiledExpr, c);
	        cValue.innerHTML = 'c = ' + c;
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
	  }, {
	    key: 'drawAnything',
	    value: function drawAnything(compiledExpr, c) {
	      var ctx = this.plane.ctx;
	      var canvas = this.plane.ctx.canvas;
	      ctx.fillStyle = "black";
	      var chooseRandom = document.getElementById("randomColor").checked;
	      var selectedColor = $("#colorpicker").spectrum("get");
	      var that = this;
	
	      for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
	        var xCoord = UTIL.calcXCoord(xPixel, canvas, that.plane);
	        var scope = { x: xCoord, c: c };
	
	        try {
	          var yCoord = math.format(compiledExpr.eval(scope));
	          var yPixel = UTIL.calcYPixel(yCoord, canvas, that.plane);
	
	          ctx.beginPath();
	          ctx.arc(xPixel, yPixel, 3, 0, Math.PI * 2);
	          ctx.fillStyle = chooseRandom ? UTIL.randomColor() : selectedColor;
	          ctx.fill();
	          ctx.closePath();
	        } catch (err) {}
	      }
	    }
	  }]);
	
	  return Equation;
	}();
	
	exports.default = Equation;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var rand256 = exports.rand256 = function rand256() {
	  return math.randomInt(0, 256);
	};
	
	var randomColor = exports.randomColor = function randomColor() {
	  var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	  return "rgba(" + rand256() + ", " + rand256() + ", " + rand256() + ", " + opacity;
	};
	
	var calcXCoord = exports.calcXCoord = function calcXCoord(xPixel, canvas, plane) {
	  return (xPixel - canvas.width / 2) / (canvas.width / (plane.xMax - plane.xMin));
	};
	
	var calcYPixel = exports.calcYPixel = function calcYPixel(yCoord, canvas, plane) {
	  return -canvas.height / (plane.yMax - plane.yMin) * yCoord + canvas.height / 2;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
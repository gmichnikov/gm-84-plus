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
	plane.drawAxes();
	
	// document.addEventListener("mousemove", mouseMoveHandler, false);
	// function mouseMoveHandler(e) {
	//     let relativeX = e.clientX - canvas.offsetLeft;
	//     // console.log(math.round(calcXCoord(relativeX), 1));
	// }

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
	    this.equation = new _equation2.default(this);
	  }
	
	  _createClass(Plane, [{
	    key: 'drawAxes',
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
	        palette: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'violet'],
	        change: this.logEquation
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
	
	      for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
	        var xCoord = UTIL.calcXCoord(xPixel, canvas);
	        var scope = { x: xCoord, c: c };
	
	        try {
	          var yCoord = math.format(compiledExpr.eval(scope));
	          var yPixel = UTIL.calcYPixel(yCoord, canvas);
	
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
	
	var calcXCoord = exports.calcXCoord = function calcXCoord(xPixel, canvas) {
	  return (xPixel - canvas.width / 2) / (canvas.width / 20);
	};
	
	var calcYPixel = exports.calcYPixel = function calcYPixel(yCoord, canvas) {
	  return -canvas.height / 20 * yCoord + canvas.height / 2;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
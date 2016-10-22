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
	
	var _util = __webpack_require__(2);
	
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
	
	var _equation = __webpack_require__(3);
	
	var _equation2 = _interopRequireDefault(_equation);
	
	var _util = __webpack_require__(2);
	
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
	    this.panFactor = 0.1;
	
	    this.mouseXPixel = this.canvas.width / 2;
	    this.mouseYPixel = this.canvas.height / 2;
	    this.mouseX = 0;
	    this.mouseY = 0;
	
	    this.mousePressed = false;
	    this.drag = false;
	    this.dragStartX = 0;
	    this.dragStartY = 0;
	
	    this.updateAxisLocations();
	    this.bindEvents();
	
	    this.c = 0;
	
	    this.equation1 = new _equation2.default(1, this, 'black');
	    this.equation2 = new _equation2.default(2, this, 'violet');
	    this.equations = [this.equation1, this.equation2];
	    this.axesDrawn = false;
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
	        return _this.resetWindow(-16, 16, -10, 10);
	      });
	      $('#zoom-in').on("click", function () {
	        return _this.zoom("in", true);
	      });
	      $('#zoom-out').on("click", function () {
	        return _this.zoom("out", true);
	      });
	      $('#pan-left').on("click", function () {
	        return _this.pan("left");
	      });
	      $('#pan-right').on("click", function () {
	        return _this.pan("right");
	      });
	      $('#pan-up').on("click", function () {
	        return _this.pan("up");
	      });
	      $('#pan-down').on("click", function () {
	        return _this.pan("down");
	      });
	      $('.y-equals-hider').on("click", function () {
	        return $('.equations').toggleClass('hide-equations');
	      });
	      $('.c-data').on("input", function () {
	        return _this.adjustSliderBounds();
	      });
	      $('#draw-graph').on("click", function () {
	        return _this.animateGraphNow();
	      });
	
	      $(function () {
	        var handle = $("#custom-handle");
	        $("#slider").slider({
	          create: function create() {
	            handle.text("c=" + $(this).slider("value"));
	          },
	          slide: function slide(event, ui) {
	            handle.text("c=" + ui.value);
	            var c = parseFloat(ui.value);
	            that.c = c;
	            that.logAllEquations();
	          },
	          min: -10,
	          max: 10,
	          step: 0.4
	        });
	      });
	
	      $(window).bind('mousewheel', function (e) {
	        if (e.originalEvent.wheelDelta / 120 > 0) {
	          that.zoom("in");
	        } else {
	          that.zoom("out");
	        }
	      });
	
	      $(document).mousedown(function () {
	        that.mousePressed = true;
	      }).mouseup(function () {
	        that.mousePressed = false;
	      });
	
	      document.addEventListener("mousemove", mouseMoveHandler, false);
	      function mouseMoveHandler(e) {
	        // console.log(that.canvas.offsetLeft, that.canvas.offsetTop);
	        that.mouseXPixel = e.clientX - (that.canvas.offsetLeft + $('.container')[0].offsetLeft);
	        that.mouseYPixel = e.clientY - (that.canvas.offsetTop + $('.container')[0].offsetTop);
	        that.mouseX = UTIL.calcXCoord(that.mouseXPixel, that.canvas, that);
	        that.mouseY = UTIL.calcYCoord(that.mouseYPixel, that.canvas, that);
	
	        if (that.equation1.traceMode) {
	          var scope = { x: that.mouseX, c: that.c };
	          var yCoord = math.format(that.equation1.compiledExpr.eval(scope));
	          var yPixel = UTIL.calcYPixel(parseFloat(yCoord), that.canvas, that);
	          var ctx = that.ctx;
	
	          that.equation1.logEquation();
	          ctx.beginPath();
	          ctx.arc(that.mouseXPixel, yPixel, 10, 0, Math.PI * 2);
	          ctx.fillStyle = "yellow";
	          ctx.fill();
	          ctx.closePath();
	
	          ctx.textAlign = "left";
	          ctx.font = "16px Arial";
	          var text = '(' + math.round(that.mouseX, 3) + ', ' + math.round(yCoord, 3) + ')';
	          var textWidth = ctx.measureText(text).width;
	          ctx.fillStyle = "purple";
	          ctx.fillText(text, 20, 20);
	          that.axesDrawn = false;
	        }
	        // console.log(that.mouseXPixel, that.mouseYPixel);
	        // console.log(that.mouseX, that.mouseY);
	      }
	
	      window.requestAnimationFrame(function () {
	        return _this.dragUpdate();
	      });
	    }
	  }, {
	    key: 'logAllEquations',
	    value: function logAllEquations() {
	      var allHidden = true;
	      this.equations.forEach(function (eq) {
	        if (!eq.hidden) {
	          allHidden = false;
	          eq.logEquation();
	        }
	      });
	      if (allHidden) {
	        this.drawAxes();
	      }
	      this.axesDrawn = false;
	    }
	  }, {
	    key: 'adjustSliderBounds',
	    value: function adjustSliderBounds() {
	      var cMinVal = parseFloat(document.getElementById('c-min').value);
	      var cMaxVal = parseFloat(document.getElementById('c-max').value);
	      $("#slider").slider("option", "min", cMinVal);
	      $("#slider").slider("option", "max", cMaxVal);
	      $("#slider").slider("option", "step", (cMaxVal - cMinVal) / 50);
	    }
	  }, {
	    key: 'dragUpdate',
	    value: function dragUpdate() {
	      var _this2 = this;
	
	      var that = this;
	      var pixelsDraggedX = 0;
	      var pixelsDraggedY = 0;
	      var unitsDraggedX = 0;
	      var unitsDraggedY = 0;
	      if (that.mousePressed) {
	        if (!that.drag) {
	          // picking up the plane
	          that.dragstartX = that.mouseXPixel;
	          that.dragstartY = that.mouseYPixel;
	        }
	        if (that.mouseInBounds()) {
	          // turn drag on if clicked and in bounds
	          that.drag = true;
	        }
	      } else {
	        // if not clicked
	        that.drag = false;
	      }
	
	      if (that.drag) {
	        pixelsDraggedX = that.mouseXPixel - that.dragstartX;
	        pixelsDraggedY = that.mouseYPixel - that.dragstartY;
	        that.dragstartX = that.mouseXPixel;
	        that.dragstartY = that.mouseYPixel;
	      }
	
	      if (math.abs(pixelsDraggedY) > 0 || math.abs(pixelsDraggedX) > 0) {
	        unitsDraggedX = pixelsDraggedX / that.canvas.width * (that.xMax - that.xMin);
	        unitsDraggedY = -(pixelsDraggedY / that.canvas.height) * (that.yMax - that.yMin);
	        this.resetWindow(that.xMin - unitsDraggedX, that.xMax - unitsDraggedX, that.yMin - unitsDraggedY, that.yMax - unitsDraggedY);
	      }
	
	      window.requestAnimationFrame(function () {
	        return _this2.dragUpdate();
	      });
	    }
	  }, {
	    key: 'mouseInBounds',
	    value: function mouseInBounds() {
	      // console.log(this.mouseXPixel, this.mouseYPixel);
	      return this.mouseXPixel > 0 && this.mouseXPixel < this.canvas.width && this.mouseYPixel > 0 && this.mouseYPixel < this.canvas.height;
	    }
	  }, {
	    key: 'zoom',
	    value: function zoom(direction) {
	      var button = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	      if (this.mouseInBounds() || button) {
	        var multiplier = direction === "in" ? 1 / this.zoomFactor : this.zoomFactor;
	
	        var centerX = (this.xMax + this.xMin) / 2;
	        var dilationX = button ? centerX : this.mouseX;
	        this.xMax = (this.xMax - dilationX) * multiplier + dilationX;
	        this.xMin = dilationX - (dilationX - this.xMin) * multiplier;
	
	        var centerY = (this.yMax + this.yMin) / 2;
	        var dilationY = button ? centerY : this.mouseY;
	        this.yMax = (this.yMax - dilationY) * multiplier + dilationY;
	        this.yMin = dilationY - (dilationY - this.yMin) * multiplier;
	
	        this.resetWindow(this.xMin, this.xMax, this.yMin, this.yMax);
	      }
	    }
	  }, {
	    key: 'pan',
	    value: function pan(direction) {
	      var xAdjust = (this.xMax - this.xMin) * this.panFactor;
	      var yAdjust = (this.yMax - this.yMin) * this.panFactor;
	      if (direction === "left") {
	        this.resetWindow(this.xMin - xAdjust, this.xMax - xAdjust, this.yMin, this.yMax);
	      } else if (direction === "right") {
	        this.resetWindow(this.xMin + xAdjust, this.xMax + xAdjust, this.yMin, this.yMax);
	      } else if (direction === "up") {
	        this.resetWindow(this.xMin, this.xMax, this.yMin + yAdjust, this.yMax + yAdjust);
	      } else if (direction === "down") {
	        this.resetWindow(this.xMin, this.xMax, this.yMin - yAdjust, this.yMax - yAdjust);
	      } else {}
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
	      this.logAllEquations();
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
	      // this.ctx.fillStyle = "#FF0000";
	      this.ctx.fillStyle = "black";
	      this.ctx.fill();
	      this.ctx.closePath();
	      // this.drawAxisLabels();
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
	  }, {
	    key: 'animateGraphNow',
	    value: function animateGraphNow() {
	      var that = this;
	      // let drawButton = document.getElementById('draw-graph');
	      // drawButton.disabled = true;
	
	      try {
	        that.equations.forEach(function (eq) {
	          var expr = document.getElementById('expression' + eq.num);
	          var node = math.parse(expr.value);
	          var compiledExpr = node.compile();
	          eq.compiledExpr = compiledExpr;
	        });
	        that.animateAllGraphs();
	      } catch (err) {}
	    }
	  }, {
	    key: 'animateAllGraphs',
	    value: function animateAllGraphs() {
	      var that = this;
	      var cMinVal = parseFloat(document.getElementById('c-min').value);
	      var cMaxVal = parseFloat(document.getElementById('c-max').value);
	      if (cMaxVal <= cMinVal) {
	        cMaxVal = cMinVal + 20;
	        document.getElementById('c-max').value = cMaxVal;
	      }
	      var cIncrementVal = (cMaxVal - cMinVal) / 50;
	
	      that.c = cMinVal;
	
	      function step() {
	        if (!that.axesDrawn) {
	          that.drawAxes();
	          that.axesDrawn = true;
	        }
	        // drawParabola(c)
	        // drawSin(c)
	
	        that.equations.forEach(function (eq) {
	          eq.drawAnything();
	        });
	        that.axesDrawn = false;
	
	        $("#slider").slider("value", that.c);
	        $("#custom-handle").text('c=' + that.c);
	
	        that.c = math.round(that.c + cIncrementVal, 2);
	        if (that.c <= cMaxVal) {
	          window.requestAnimationFrame(step);
	        } else {
	          // let drawButton = document.getElementById('draw-graph');
	          // drawButton.disabled = false;
	        }
	      }
	      window.requestAnimationFrame(step);
	    }
	  }]);
	
	  return Plane;
	}();
	
	exports.default = Plane;

/***/ },
/* 2 */
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
	
	  return xPixel / canvas.width * (plane.xMax - plane.xMin) + plane.xMin;
	};
	
	var calcYCoord = exports.calcYCoord = function calcYCoord(yPixel, canvas, plane) {
	  var pixelFromBottom = canvas.height - yPixel;
	
	  return pixelFromBottom / canvas.height * (plane.yMax - plane.yMin) + plane.yMin;
	};
	
	var calcYPixel = exports.calcYPixel = function calcYPixel(yCoord, canvas, plane) {
	
	  return (plane.yMax - yCoord) / (plane.yMax - plane.yMin) * canvas.height;
	};
	
	// 330 240

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //pass a color to each equation
	
	
	var _util = __webpack_require__(2);
	
	var UTIL = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Equation = function () {
	  function Equation(num, plane, startingColor) {
	    _classCallCheck(this, Equation);
	
	    this.num = num;
	    this.plane = plane;
	    this.traceMode = false;
	    this.compiledExpr = null;
	    this.startingColor = startingColor;
	    this.hidden = false;
	
	    this.setup(startingColor);
	    this.logEquation();
	    // this.drawGraphOnce = this.drawGraphOnce.bind(this);
	    // this.logEquation = this.logEquation.bind(this);
	  }
	
	  _createClass(Equation, [{
	    key: 'setup',
	    value: function setup(startingColor) {
	      var _this = this;
	
	      $('#colorpicker' + this.num).spectrum({
	        showPaletteOnly: true,
	        showPalette: true,
	        hideAfterPaletteSelect: true,
	        color: startingColor,
	        palette: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', UTIL.randomColor()],
	        change: function change() {
	          return _this.plane.logAllEquations();
	        }
	      });
	
	      var that = this;
	
	      $('#randomColor' + this.num).on("change", function () {
	        return _this.plane.logAllEquations();
	      });
	      $('.trigger-redraw').on("input", function () {
	        return _this.plane.logAllEquations();
	      });
	      $('#hide-graph' + this.num).on("change", function () {
	        return _this.toggleHide();
	      });
	
	      $('#trace-mode' + this.num).on("click", function () {
	        that.traceMode = !that.traceMode;
	        if ($('#trace-mode' + _this.num)[0].checked) {
	          that.plane.equations.forEach(function (eq) {
	            if (eq.num !== _this.num) {
	              $('#trace-mode' + eq.num)[0].checked = false;
	              eq.traceMode = false;
	            }
	          });
	        }
	
	        that.plane.logAllEquations();
	      });
	    }
	  }, {
	    key: 'toggleHide',
	    value: function toggleHide() {
	      this.hidden = !this.hidden;
	      this.plane.logAllEquations();
	    }
	  }, {
	    key: 'drawGraphOnce',
	    value: function drawGraphOnce(compiledExpr) {
	      if (!this.plane.axesDrawn) {
	        this.plane.drawAxes();
	        this.plane.axesDrawn = true;
	      }
	      this.drawAnything(compiledExpr, this.plane.c);
	    }
	  }, {
	    key: 'logEquation',
	    value: function logEquation() {
	      // called on input in forms
	      var that = this;
	      if (typeof that.plane.c !== "number") {
	        that.plane.c = 0;
	      }
	
	      var expr = document.getElementById('expression' + this.num);
	      var pretty = document.getElementById('pretty' + this.num);
	
	      var node = null;
	
	      try {
	        node = math.parse(expr.value);
	        var compiledExpr = node.compile();
	        that.compiledExpr = compiledExpr;
	        that.drawGraphOnce(compiledExpr, that.plane.c);
	      } catch (err) {
	        console.log(err.toString());
	      }
	
	      try {
	        var nodeWithY = math.parse('Y==' + expr.value);
	
	        var latex = nodeWithY ? nodeWithY.toTex({ implicit: 'show' }) : '';
	        var elem = MathJax.Hub.getAllJax('pretty' + this.num)[0];
	        if (!elem) {
	          pretty.innerHTML = '$$' + nodeWithY.toTex() + '$$';
	        }
	        MathJax.Hub.Queue(['Text', elem, latex]);
	      } catch (err) {
	        console.log("latex error");
	      }
	    }
	  }, {
	    key: 'drawAnything',
	    value: function drawAnything() {
	      var ctx = this.plane.ctx;
	      var canvas = this.plane.ctx.canvas;
	      ctx.fillStyle = this.startingColor;
	      var chooseRandom = document.getElementById('randomColor' + this.num).checked;
	      var selectedColor = $('#colorpicker' + this.num).spectrum("get");
	      var that = this;
	
	      for (var xPixel = 0; xPixel < canvas.width; xPixel++) {
	        var xCoord = UTIL.calcXCoord(xPixel, canvas, that.plane);
	        var scope = { x: xCoord, c: that.plane.c };
	
	        try {
	          var yCoord = math.format(that.compiledExpr.eval(scope));
	
	          var yPixel = UTIL.calcYPixel(parseFloat(yCoord), canvas, that.plane);
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
# GM-84 Plus

[Live!][gm84plus]
[gm84plus]: http://www.gregmichnikov.com/gm-84-plus/

## Summary

GM-84 Plus is a browser-based graphing calculator. It allows users to graph math functions in multi-color, trace the values of the functions, find solutions (aka zeros) of the functions, and animate the functions to see how the graphs change as a variable within the function changes.

Other features include drag-and-drop window movement, zoom in/out on any point via mouse scroll, and immediate pretty-printing of equations.

## Instructions

+ In the left panel, type in the equations that you would like to graph. You can choose a color, choose to hide the graph, choose trace mode, or choose to see a solution. Trace Mode allows you to move your mouse in the plane and see the x-y values of this graph as you move. Solution shows you the left-most visible solution. Panning the x-y plane to the left/right allows you to see each of the solutions.
+ Basic features include zoom in/out by scrolling your mouse, and panning to different parts of the plane by dragging/dropping with your mouse. You can also zoom/pan using the buttons at the bottom right of the canvas.
+ The yellow Y= button shows/hides the left panel.
+ The blue buttons allow you to adjust the window, i.e. determine which parts of the x-y plane are visible. You can choose z-standard (the default); z-square, which adjusts the window so that the x/y ratio matches that of the canvas itself; or custom.
+ Animate shows you how your graph changes as the value of the variable c changes. The graph will only look animated if your equation includes a variable c, as the two provided examples do. You can adjust the min/max of c on either side of the slider.

## Technology

### GM-84 Plus was built using:
- [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for rendering of the equations
- [Math.js](http://mathjs.org/) for parsing, compiling, and evaluating math expressions
- [MathQuill](http://mathquill.com/) for immediate pretty-printing of math expressions
- [jQueryUI](https://jqueryui.com/) for modal, slider, and tooltip
- [Spectrum](https://bgrins.github.io/spectrum/) for color selection
- [Google](https://design.google.com/icons/) and [Font Awesome](http://fontawesome.io/icons/) for icons

## Features

### Drag and Drop Panning
GM-84 Plus includes a custom drag-and-drop panning implementation. It listens for mouse presses and then tracks the movement of the mouse, adjusting the window, axes, and graphs in real-time. The code below 1) calculates the number of pixels that the xy-plane has been dragged; 2) resets the `dragstart` to the current position; 3) converts the dragging distance from pixels to xy units; 4) adjusts the calculator's window to reflect the mouse movement. This happens in every animation frame, about 60 times per second.

```javascript
if (that.drag) {
  pixelsDraggedX = that.mouseXPixel - that.dragstartX;
  pixelsDraggedY = that.mouseYPixel - that.dragstartY;
  that.dragstartX = that.mouseXPixel;
  that.dragstartY = that.mouseYPixel;
}

if (math.abs(pixelsDraggedY) > 0 || math.abs(pixelsDraggedX) > 0) {
  unitsDraggedX = (pixelsDraggedX / that.canvas.width) * (that.xMax - that.xMin);
  unitsDraggedY = -(pixelsDraggedY / that.canvas.height) * (that.yMax - that.yMin);
  this.resetWindow(that.xMin - unitsDraggedX, that.xMax - unitsDraggedX, that.yMin - unitsDraggedY, that.yMax - unitsDraggedY);
}

window.requestAnimationFrame(() => this.dragUpdate());
```

### Scroll-Zoom
GM-84 also allows users to zoom in or out using the mouse. It treats zooming as a dilation and re-calculates the window accordingly. If the zooming comes from the mouse, the point of dilation is the mouse's location; if the zoom comes from the magnifying glass, the center of the visible window serves as the center of dilation.

```javascript
let centerX = (this.xMax + this.xMin)/2;
let dilationX = (button ? centerX : this.mouseX);
this.xMax = (this.xMax - dilationX) * multiplier + dilationX;
this.xMin = dilationX - (dilationX - this.xMin) * multiplier;
```

### Animation
The calculator allows users to observe how the graph of an equation changes when a variable `c` moves between a user-defined minimum and maximum.
![screenshot](http://gregmichnikov.com/images/gm-84-plus.gif)

### Finding Zeros/Solutions
GM-84 Plus finds the left-most visible solution/zero of an equation by:
1. Observing when the sign of the y-value switches from positive to negative
2. Using Newton's method (repeatedly) to get a very accurate x-value, as shown in the code below
```javascript
nearbyX = xCoord + 0.01;
nearbyY = parseFloat(math.format(that.compiledExpr.eval({x: nearbyX, c: that.plane.c})));
derivative = (nearbyY - yCoord) / 0.01;
xCoord = xCoord - yCoord/derivative;
yCoord = parseFloat(math.format(that.compiledExpr.eval({x: xCoord, c: that.plane.c})));
```

## Next steps for further development of GM-84 Plus

- Adding more analytical features that replicate the calculation ability of a real graphing calculator (e.g. min/max)
- Adding more sample graphs for the user to experiment with in addition to the two that are preloaded
- Allowing more gridlines options in addition to the axes-only style currently used
- Supporting polar coordinates, in order to allow functions of the form r(theta)

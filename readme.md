# GM-84 Plus

[Live!][gm84plus]
[gm84plus]: https://www.gregmichnikov.com/gm-84-plus/

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
coming soon

### Scroll-Zoom
coming soon

### Animation
coming soon


## Next steps for further development of GM-84 Plus

#### Solutions, Min/Max
- Adding more features that replicate the calculation ability of the real deal!

#### More sample graphs
- Currently there are just the two that are typed in upon coming to the site

#### Gridlines
-  Allowing more options in addition to the axes-only style currently used

#### Polar
- Supporting polar coordinates, in order to allow equations of the form r(theta)

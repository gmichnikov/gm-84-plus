// Start/stop drawing
ctx.beginPath();
ctx.closePath();


// Schedule drawing intermittently
setInterval(draw, 10);

// Clear screen
ctx.clearRect(0, 0, canvas.width, canvas.height);


// Schedule Shapes to appear
ctx.rect(canvas.width/2, 0, 1, canvas.height);
ctx.arc(xPixel, yPixel, 1, 0, Math.PI*2);

// Choose color for undrawn solid shapes
ctx.fillStyle = "#FF0000";

// Make scheduled solid shapes appear
ctx.fill();

// Choose color for undrawn outline shapes
ctx.strokeStyle = "rgba(0, 0, 255, 1)";


// Draw outline shapes
ctx.stroke();


// Printing text
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

// listen for mouse moves and keypresses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// location of mouse on screen
e.clientX -> X coordinate of the mouse within the window
canvas.offsetLeft -> how far over the canvas starts
e.clientX - canvas.offsetLeft -> the x coordinate of where you are in the game

// Mouse move detection
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

// Keypress handling

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// Reload the page

document.location.reload();


// rectangles can be drawn directly to the page, without paths

ctx.fillRect(25,25,100,100);
ctx.clearRect(45,45,60,60);
ctx.strokeRect(50,50,50,50);


// Path creation:
beginPath() - starts the path
lineTo(x, y) - draws a line to this point



// Draw triangle
ctx.beginPath();
ctx.moveTo(200,200); // sets starting location
ctx.lineTo(400,200);
ctx.lineTo(400,100);
ctx.fill(); // at this point the 3 points are connected
or stroke
ctx.closePath(); // not needed?

ctx.beginPath();
ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
ctx.moveTo(110,75);
ctx.arc(75,75,35,0,Math.PI,false);  // Mouth (clockwise)
ctx.moveTo(65,65);
ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
ctx.moveTo(95,65);
ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
ctx.stroke();

closePath brings the last point back to the first

// example of oninput
<script>
function setLabel(txtBox){
  let words = document.getElementById('words').value;
  console.log(words);
  document.getElementById('lbl').setAttribute('value', words);
}
</script>
<label id="lbl">Hi</label>
<input id="words" oninput="setLabel()"/>

# notes

draw many lines to draw a curve
move to begins path
begin path, then lineto many times
consider a percentX variable to make something stretch across the screen
xmin, xmax, ymin ymax vars
map for loop to a percent, and then use the percent to get the x coordinates
xcoord = (xmax-xmin)*xpercent +xmin

math js parses a script into a math equation
use cdn js to fetch...
in mathjs, will need expr and scope
include math js script triangle
use jquery to listen for changes to math equations

use hash change/set hash to save equations in url
use request animation frame and a t variable to constantly replot while changing a function


# ideas

draw polar spiral

draw with lines or dots

add other lines besides axes - be able to turn grid on and off

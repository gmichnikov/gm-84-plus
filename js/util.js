export const rand256 = () => {
  return math.randomInt(0,256);
};

export const randomColor = (opacity = 1) => {
  return `rgba(${rand256()}, ${rand256()}, ${rand256()}, ${opacity}`;
};


export const calcXCoord = (xPixel, canvas, plane) => {

  return xPixel/canvas.width * (plane.xMax - plane.xMin) + plane.xMin;
}

export const calcYCoord = (yPixel, canvas, plane) => {
  let pixelFromBottom = canvas.height - yPixel;

  return pixelFromBottom/canvas.height * (plane.yMax - plane.yMin) + plane.yMin;
}


export const calcXPixel = (xCoord, canvas, plane) => {

  return ((xCoord - plane.xMin) / (plane.xMax - plane.xMin)) * canvas.width;
}

export const calcYPixel = (yCoord, canvas, plane) => {

  return ((plane.yMax - yCoord) / (plane.yMax - plane.yMin)) * canvas.height;
}

// 330 240

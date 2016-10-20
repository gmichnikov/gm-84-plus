export const rand256 = () => {
  return math.randomInt(0,256);
};

export const randomColor = (opacity = 1) => {
  return `rgba(${rand256()}, ${rand256()}, ${rand256()}, ${opacity}`;
};


export const calcXCoord = (xPixel, canvas, plane) => {
  return (xPixel - canvas.width / 2) / (canvas.width/ (plane.xMax - plane.xMin) );
}

export const calcYPixel = (yCoord, canvas, plane) => {
  return (-canvas.height / (plane.yMax - plane.yMin) ) * yCoord + (canvas.height / 2);
}

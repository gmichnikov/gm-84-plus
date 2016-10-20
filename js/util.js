export const rand256 = () => {
  return math.randomInt(0,256);
};

export const randomColor = (opacity = 1) => {
  return `rgba(${rand256()}, ${rand256()}, ${rand256()}, ${opacity}`;
};


export const calcXCoord = (xPixel, canvas) => {
  return (xPixel - canvas.width / 2) / (canvas.width/20);
}

export const calcYPixel = (yCoord, canvas) => {
  return (-canvas.height / 20) * yCoord + (canvas.height / 2);
}

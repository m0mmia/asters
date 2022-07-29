function ImageFitter(fitfill, containerWidth, containerHeight, width, height) {
  let newwidth = 0;
  let newheight = 0;
  let ret = { height: height, width: width, x: 0, y: 0, xScale: 1, yScale: 0 };
  if (fitfill == "fill") {
    let factor1 = containerWidth / containerHeight;
    let factor2 = width / height;
    if (factor1 > factor2) {
      newwidth = containerWidth;
      newheight = (containerWidth / width) * height;
    } else {
      newwidth = (containerHeight / height) * width;
      newheight = containerHeight;
    }
  } else if (fitfill == "fit") {
    let factor1 = containerWidth / containerHeight;
    let factor2 = width / height;
    if (factor1 < factor2) {
      newwidth = containerWidth;
      newheight = (containerWidth / width) * height;
    } else {
      newwidth = (containerHeight / height) * width;
      newheight = containerHeight;
    }
  }

  ret.width = newwidth;
  ret.height = newheight;
  ret.x = (containerWidth - newwidth) / 2;

  ret.y = (containerHeight - newheight) / 2;
  ret.xScale = newwidth / width;
  ret.yScale = newheight / height;
  return ret;
}

export default ImageFitter;

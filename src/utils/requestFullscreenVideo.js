export function requestFullscreenVideo(element) {
  console.log(`element:`, element);
  if (element) {
    if (typeof element.webkitEnterFullscreen !== "undefined") {
      // Android browser
      element.webkitEnterFullscreen();
    } else if (typeof element.webkitRequestFullscreen !== "undefined") {
      // Chrome
      element.webkitRequestFullscreen();
    } else if (typeof element.mozRequestFullScreen !== "undefined") {
      // FF
      element.mozRequestFullScreen();
    }
  }
}

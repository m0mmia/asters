export function GetScreenPercent(event, target) {
  let ret = {};
  ret.x = event.clientX / window.innerWidth - 0.5;
  ret.y = event.clientY / window.innerHeight - 0.5;
  return ret;
}

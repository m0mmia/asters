import isMobile from "ismobilejs";

export function getIsMobile() {
  return isMobile(window.navigator).any;
}

export function getIsMobileWidth() {
  if(typeof window === "undefined") {
    return false
  }
  return window.innerWidth < 768
}
import { media } from "./media";
import { css } from "styled-components";

function cssPropFromKey(key) {
  return key
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");
}

function isValidKey(key) {
  return [
    "fontSize",
    "width",
    "height",
    "left",
    "right",
    "top",
    "bottom",
    "paddingTop",
    "paddingLeft",
    "paddingRight",
    "paddingBottom",
    "marginTop",
    "marginLeft",
    "marginRight",
    "marginBottom",
  ].includes(key);
}

function proportionalRules(key, units, proportionalSettings) {
  const [a, b] = units;
  const property = cssPropFromKey(key);
  const {breakpoints, designSizes} = proportionalSettings;
  return css`
    ${property}: ${(a / designSizes[0]) * 100}vw;

    ${media(breakpoints[0])} {
      ${property}: ${(b / designSizes[1]) * 100}vw;
    }

    ${media(breakpoints[1])} {
      ${property}: ${b}px;
    }
  `;
}

export function proportional(props) {
  const { theme, ...rest } = props;
  let {proportionalSettings} = theme;
  
  if(!proportionalSettings) {
    proportionalSettings = {designSizes: ['750', '1440'], breakpoints: ['l', 'xl']};
  }

  const rules = Object.entries(rest)
    .filter(([key, value]) => {
      return isValidKey(key) && Array.isArray(value);
    })
    .map(([key, value]) => proportionalRules(key, value, proportionalSettings));

  return css`
    ${rules}
  `;
}

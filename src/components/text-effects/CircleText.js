import React, { useRef, useEffect } from "react";

function SvgComponent({
  letterSpacing,
  fontFamily,
  fontSize,
  text,
  duration = "30s",
}) {
  return (
    <svg viewBox="0 0 500 500">
      <defs>
        <path
          d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
          id="textcircle"
        >
          <animateTransform
            attributeName="transform"
            begin="0s"
            dur={duration}
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            repeatCount="indefinite"
          />
        </path>
      </defs>
      <text dy="70" textLength="1220" fill="#fff">
        <textPath
          xlinkHref="#textcircle"
          letterSpacing={letterSpacing}
          fontFamily={fontFamily}
          fontSize={fontSize}
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
}

export default SvgComponent;

import * as React from "react";

function SvgComponent({
  fontFamily,
  color,
  rotation,
  fontSize,
  width,
  height,
  children,
}) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text
        textAnchor="middle"
        fontFamily={fontFamily}
        fill="none"
        fillOpacity="1"
        fontSize={fontSize}
        transform={`translate(${width - 15},${height / 2}) rotate(${rotation})`}
        stroke={color}
        strokeWidth="1px"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeOpacity="1"
      >
        {children}
      </text>
    </svg>
  );
}

export default SvgComponent;

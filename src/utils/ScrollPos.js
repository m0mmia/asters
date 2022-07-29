import React, {
  useEffect,
  useContext,
  useState,
  VisibilitySensor,
  useRef,
} from "react";

const visibilitySensorOptions = {
  partialVisibility: true,
  minTopValue: 0,
  scrollCheck: true,
};

export function ScrollPos(props) {
  const oldOnscreen = useRef();
  const ref = props.children.ref || useRef();

  useEffect(() => {
    if (!props.active) {
      return;
    }

    let animationFrameID;
    const animate = () => {
      let pos = props.children.ref.current.getBoundingClientRect();
      let rpos = {};

      rpos.width = pos.width;
      rpos.height = pos.height;
      rpos.top = pos.top;

      let centertoppos = rpos.top + rpos.height / 2;
      rpos.centeronscreen = centertoppos;

      let range = window.innerHeight;

      var onScreen = centertoppos / range + 0.5;

      if (props.callback) {
        if (onScreen != oldOnscreen.current) {
          oldOnscreen.current = onScreen;
          //console.log(onScreen, oldOnscreen);

          let top = 1 - rpos.top / range;
          let bottom = 1 - (rpos.top + rpos.height) / range;

          if (top < 0) {
            top = 0;
          }
          if (top > 1) {
            top = 1;
          }

          if (bottom < 0) {
            bottom = 0;
          }
          if (bottom > 1) {
            bottom = 1;
          }

          let total = top + bottom;

          props.callback(onScreen, total / 2);
        }
      }
      animationFrameID = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameID);
    };
  }, [props.active]);

  return props.children;
}

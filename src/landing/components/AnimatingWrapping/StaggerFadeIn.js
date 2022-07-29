import gsap, { Linear } from "gsap/gsap-core";
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { proportional } from "../../../utils";

export const Container = styled.div.attrs({ width: [73, 165] })`
  ${proportional};
  opacity: 0;
`;

export default ({ visible, children }) => {
  const ref = useRef(null);

  const enterAnimation = () => {
    if (!ref.current) {
      return;
    }
    gsap.set(ref.current, { opacity: 1 });

    gsap.to(ref.current.children, {
      stagger: 0.3,
      duration: 0.1,
      opacity: 1,
      ease: Linear.easeInOut,
    });
  };

  const init = () => {
    gsap.set(ref.current.children, {
      opacity: 0,
    });
  };

  const displayCallback = useCallback(
    (newVal) => {
      // since this doesn't fade out, this is passed a false only once on init, thefore becoming a perfect init condition
      if (newVal) {
        if (!ref.current) {
          return;
        }
        enterAnimation();
      } else {
        init();
      }
    },
    [ref, enterAnimation, init]
  );

  useEffect(() => {
    displayCallback(visible);
  }, [visible, displayCallback]);

  return <Container ref={ref}>.{children}</Container>;
};

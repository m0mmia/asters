import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Title6 } from "../Text";
import { media, proportional } from "../../../../utils";
import gsap, { Power4 } from "gsap";
import { AnimatedArrow } from "../DecoElements";

const ScrollIndicatorWrap = styled.div.attrs({})`
  ${proportional};
  transform: rotate(-90deg);
  display: none;
  transform-origin: right bottom;
  opacity: 0;
`;

const ScrollIndicatorTitle = styled(Title6).attrs({ marginLeft: [11, 17] })`
  ${proportional};
  display: inline-block;
  & span:first-child {
    display: none;
  }
  ${media("l")} {
    & span:first-child {
      display: inline-block;
    }
    & span:last-child {
      display: none;
    }
  }
`;

const ScrollIndicatorContainer = styled.div.attrs({})`
  ${proportional};
  display: flex;
  align-items: center;
`;

const Arrow = styled.div`
  display: inline-block;
  transform: rotate(180deg);
`;

// todo get currentTheme from currentTheme context provider?

export const AnimationScrollIndicator = React.forwardRef(({}, indicatorRef) => {
  const tlRef = useRef(null);
  const arrowRef = useRef(null);
  const [active, setActive] = useState(true);

  const createTlArrowMovement = () => {
    if (!arrowRef.current) {
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => {
        tlRef.current = createTlArrowMovement();
      },
    });

    tl.to(arrowRef.current, {
      duration: 1.7,
      x: 8,
      ease: Power4.easeOut,
    });

    tl.to(arrowRef.current, {
      duration: 1.3,
      x: -8,
      ease: Power4.easeIn,
    });

    return tl;
  };

  const StartAnimationLoop = () => {
    tlRef.current = createTlArrowMovement();
  };

  useEffect(() => {
    if (active) {
      StartAnimationLoop();
    }
    if (!active) {
    }
  }, [active]);

  return (
    <>
      <ScrollIndicatorWrap ref={indicatorRef}>
        <ScrollIndicatorContainer>
          <Arrow ref={arrowRef}>
            <AnimatedArrow active={active} />
          </Arrow>
          <ScrollIndicatorTitle>
            <span>SCROLL AND DISCOVER</span>
            <span>SWIPE AND DISCOVER</span>
          </ScrollIndicatorTitle>
        </ScrollIndicatorContainer>
      </ScrollIndicatorWrap>
    </>
  );
});

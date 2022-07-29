import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { ShopButton } from "./ShopButton";
import { proportional, media } from "../../../utils";
import { useScrollPos } from "../../../hooks";
import { gsap, Power2, Linear } from "gsap";
import VisibilitySensor from "react-visibility-sensor";

const visibilitySensorOptions = {
  partialVisibility: true,
  // scrollCheck: true,
  // intervalCheck: false,
  minTopValue: 200,
};

// TODO: change to proportional styling here
export const Container = styled.div`
  ${proportional};
  opacity: 0;
  width: 100%;
  height: 100%;
`;

// export const TextWrapper = Container

// export function AnimatedTextWrapper

export default React.memo((props) => {
  const tlRef = useRef();
  const tweenRef = useRef();
  const progressRef = useRef(0);
  const [entranceDone, setEntranceDone] = useState(false);
  const { transitions, entrance, entranceRepeat } = props;
  const {
    xStart,
    xEnd,
    yStart,
    yEnd,
    childTransitions,
    variant = "horizontal",
  } = transitions;

  const xStart1 = childTransitions?.Xstart1;
  const xStart2 = childTransitions?.Xstart2;
  const xEnd1 = childTransitions?.Xend1;
  const xEnd2 = childTransitions?.Xend2;
  const yStart1 = childTransitions?.Ystart1;
  const yStart2 = childTransitions?.Ystart2;
  const yEnd1 = childTransitions?.Yend1;
  const yEnd2 = childTransitions?.Yend2;

  const [ref, a, b] = useScrollPos(true, draw);
  function draw(_a, b) {
    const vars = { value: progressRef.current };

    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }

    tweenRef.current = gsap.to(vars, {
      duration: 1,
      value: b,
      ease: "power2.out",
      onUpdate: () => {
        tlRef.current.progress(vars.value);
        progressRef.current = vars.value;
      },
    });
  }

  const getVerticalAnimation = () => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      ref.current,
      {
        duration: 0.2,
        y: yStart,
      },
      {
        y: yEnd,
      },
      0
    );
    return tl;
  };

  const getHorizontalAnimation = () => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      ref.current,
      {
        duration: 0.2,
        x: xStart,
      },
      {
        x: xEnd,
      },
      0
    );
    return tl;
  };

  const getHorizontalChildrenAnimation = () => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      a,
      {
        duration: 1,
        x: xStart1,
      },
      {
        x: xEnd1,
      },
      0
    );
    tl.fromTo(
      b,
      {
        duration: 1,
        x: xStart2,
      },
      {
        x: xEnd2,
      },
      0
    );
    tl.paused();
    return tl;
  };

  const getVerticalChildrenAnimation = () => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      a,
      {
        duration: 1,
        y: yStart1,
      },
      {
        y: yEnd1,
      },
      0
    );
    tl.fromTo(
      b,
      {
        duration: 1,
        y: yStart2,
      },
      {
        y: yEnd2,
      },
      0
    );
    return tl;
  };

  const getAnimationAll = useCallback(() => {
    switch (variant) {
      case "horizontal":
        return getHorizontalAnimation();
        break;
      case "vertical":
        return getVerticalAnimation();
        break;
      case "vertical-children":
        return getVerticalChildrenAnimation();
        break;
      case "horizontal-children":
        return getHorizontalChildrenAnimation();
        break;
      default:
    }
  }, [variant]);

  const getAnimationParent = useCallback(() => {
    // const tl = gsap.timeline({});

    switch (variant) {
      case "horizontal":
        return getHorizontalAnimation();
        break;
      case "vertical":
        return getVerticalAnimation();
        break;
      case "vertical-children":
        return getVerticalAnimation();
        break;
      case "horizontal-children":
        return getHorizontalAnimation();
        break;
      default:
    }
  }, [variant]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    let tl;
    // const tl = gsap.timeline({ paused: true });
    const [a, b] = ref.current.children;

    if (
      a &&
      b &&
      ((xStart1 && xStart2 && xEnd1, xEnd2) ||
        (yStart1 && yStart2 && yEnd1 && yEnd2))
    ) {
      tl = getAnimationAll();
    } else {
      tl = getAnimationParent();
    }

    tlRef.current = tl;
  }, []);

  const doPopup = () => {
    gsap.set(ref.current, { y: ref.current.clientHeight * 2 * 0.8 });
    gsap.to(ref.current, {
      delay: 0.2,
      duration: 0.4,
      opacity: 1,
      ease: Linear.easeInOut,
    });
    gsap.to(ref.current, {
      delay: 0.2,
      duration: 0.4,
      y: 0,
      ease: Linear.easeNone,
    });
  };

  const doDefault = () => {
    gsap.to(ref.current, {
      delay: 0.2,
      duration: 0.4,
      opacity: 1,
      ease: Linear.easeInOut,
    });
  };

  const doDefaultReverse = () => {
    gsap.to(ref.current, {
      delay: 0.2,
      duration: 0.4,
      opacity: 0,
      ease: Linear.easeInOut,
    });
  };

  const display = (newVal) => {
    if (newVal) {
      if (!ref.current) {
        return;
      }
      if (entrance) {
        if (entranceDone && !entranceRepeat) {
          doDefault();
        }
        if (entrance === "popUp" && !entranceDone) {
          setEntranceDone(true);
          doPopup();
        }
      } else {
        doDefault();
      }
    } else {
      // doDefaultReverse();
    }
  };

  return (
    <VisibilitySensor
      onChange={(newVal) => {
        display(newVal);
      }}
      {...visibilitySensorOptions}
    >
      <Container ref={ref} {...props}>
        {props.children}
      </Container>
    </VisibilitySensor>
  );
});

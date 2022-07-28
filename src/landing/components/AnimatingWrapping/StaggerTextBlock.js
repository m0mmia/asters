import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { proportional } from "../../../../utils";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

const TextContainer = styled.div.attrs({})`
  ${proportional};
`;

export default ({ isVisible, children, title }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const splitRef = useRef(null);
  const bodyRef = useRef(null);
  const buttonRef = useRef(null);
  const initContainerRef = containerRef?.current;

  const animateFollowup = (step) => {
    if (step === "body") {
      gsap.to(bodyRef.current, {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          animateFollowup("button");
        },
      });
    }
    if (step === "button") {
      gsap.to(buttonRef.current, {
        opacity: 1,
        duration: 0.4,
      });
    }
  };

  const animateIn = () => {
    gsap.to(splitRef.current.lines, {
      opacity: 1,
      stagger: 0.15,
      duration: 0.4,
      onComplete: () => {
        animateFollowup(bodyRef.current ? "body" : "button");
      },
    });
  };

  const animateOut = () => {
    gsap.to([splitRef.current.lines], {
      duration: 0.2,
      opacity: 0,
    });
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
      });
    }
    if (bodyRef.current) {
      gsap.set(bodyRef.current, {
        opacity: 0,
      });
    }
  };

  const onAnimate = useCallback(
    (animation) => {
      if (!splitRef.current) {
        return;
      }
      if (animation === "in") {
        animateIn();
      }
      if (animation === "out") {
        animateOut();
      }
    },
    [animateIn, animateOut, splitRef]
  );

  const hide = (ref) => {
    gsap.set(ref, {
      opacity: 0,
    });
  };

  const onInitialize = useCallback(() => {
    const [a] = initContainerRef.children;

    if (initContainerRef.children.length > 2) {
      const [, b, c] = initContainerRef.children;
      hide(b);
      hide(c);
      bodyRef.current = b;
      buttonRef.current = c;
    } else if (initContainerRef.children.length > 1) {
      const [, b] = initContainerRef.children;
      hide(b);
      buttonRef.current = b;
    }

    splitRef.current = new SplitText(a, {
      type: "lines",
      reduceWhiteSpace: false,
    });

    hide(splitRef.current.lines);
  }, [initContainerRef]);

  useEffect(() => {
    if (!initContainerRef) {
      return;
    }
    onInitialize();
  }, [initContainerRef, onInitialize]);

  useEffect(() => {
    if (isVisible) {
      onAnimate("in");
    }

    return () => {
      if (splitRef.current) {
        gsap.killTweensOf([splitRef.current.lines]);
      }
    };
  }, [isVisible, onAnimate]);

  return <TextContainer ref={containerRef}>{children}</TextContainer>;
};

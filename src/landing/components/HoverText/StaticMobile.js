import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import gsap, { Linear } from "gsap";
import { GenderIcon } from "./GenderIcon";
import CustomEase from "gsap/CustomEase";
import { media, proportional } from "../../../../utils";
gsap.registerPlugin(CustomEase);

const HoverTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media("l")} {
    display: none;
  }
`;
const IconContainer = styled.div.attrs({ width: [144] })`
  user-select: none;
  opacity: 0;
  ${proportional};

  position: relative;
  pointer-events: none;
`;

const IconContainerAlt = styled.div.attrs({ width: [100] })`
  user-select: none;
  opacity: 0;
  ${proportional};

  position: relative;
  pointer-events: none;
`;

export const StaticMobile = ({
  isVisible = true,
  circle,
  letterSpacing,
  small = false,
}) => {
  const iconRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    // gsap.set([iconRef.current], {
    //   transformOrigin: "center",
    //   scale: 0.2,
    //   rotation: -90,
    //   opacity: 0,
    // });
    if (!iconRef.current) {
      return;
    }
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(iconRef.current, {
      rotation: 360,
      duration: 8,
      ease: CustomEase.create("custom", ".48,.04,.52,.96"),
    });

    tlRef.current = tl;
  }, []);

  useEffect(() => {
    if (!iconRef.current) {
      return;
    }
    // gsap.killTweensOf(iconRef.current);
    if (isVisible) {
      gsap.to(iconRef.current, 0.4, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        ease: CustomEase.create("custom", ".48,.04,.52,.96"),
      });
    } else {
      gsap.to(iconRef.current, 0.2, {
        scale: 0.2,
        opacity: 0,
        rotation: -90,
        ease: CustomEase.create("custom", ".48,.04,.52,.96"),
      });
    }
  }, [isVisible]);

  return (
    <HoverTextWrapper>
      {small && (
        <IconContainerAlt ref={iconRef}>
          <GenderIcon
            name={circle.toUpperCase()}
            letterSpacing={letterSpacing}
          />
        </IconContainerAlt>
      )}
      {!small && (
        <IconContainer ref={iconRef}>
          <GenderIcon
            name={circle.toUpperCase()}
            letterSpacing={letterSpacing}
          />
        </IconContainer>
      )}
    </HoverTextWrapper>
  );
};

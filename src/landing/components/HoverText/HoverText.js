import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { GenderIcon } from "./GenderIcon";
import CustomEase from "gsap/CustomEase";
import { media } from "../../../../utils";
gsap.registerPlugin(CustomEase);

const HoverTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  ${media("l")} {
    display: block;
  }
`;
const IconContainer = styled.div`
  user-select: none;
  opacity: 0;
  width: ${(144 / 750) * 100}vw;
  height: ${(144 / 750) * 100}vw;

  ${media("l")} {
    width: ${(180 / 1440) * 100}vw;
    height: ${(180 / 1440) * 100}vw;
  }

  ${media("xl")} {
    width: 180px;
    height: 180px;
  }

  position: relative;
  pointer-events: none;
`;

export const HoverText = ({ circle, letterSpacing }) => {
  const [hover, setHover] = useState(false);
  const hoverRef = useRef(false);
  const iconRef = useRef(null);
  const positionRef = useRef(null);
  const mousePositionRef = useRef(null);

  const onMouseOver = () => {
    setHover(true);
    hoverRef.current = true;
    requestAnimationFrame(mouseMove);
  };

  const onMouseLeave = () => {
    setHover(false);
    hoverRef.current = false;
  };

  const onMouseMove = (e) => {
    mousePositionRef.current = e.nativeEvent;
  };

  const mouseMove = () => {
    if (!hoverRef.current) return;
    requestAnimationFrame(mouseMove);

    if (!mousePositionRef.current) return;

    if (!positionRef.current) {
      positionRef.current = {
        x: mousePositionRef.current.offsetX,
        y: mousePositionRef.current.offsetY,
      };
    }

    const x = positionRef.current.x;
    const y = positionRef.current.y;
    const targetX = mousePositionRef.current.offsetX;
    const targetY = mousePositionRef.current.offsetY;
    const smooth = 0.5;

    positionRef.current = {
      x: x + (targetX - x) * smooth,
      y: y + (targetY - y) * smooth,
    };

    gsap.set(iconRef.current, {
      x:
        positionRef.current.x -
        iconRef.current.getBoundingClientRect().width / 2,
      y:
        positionRef.current.y -
        iconRef.current.getBoundingClientRect().height / 2,
    });
  };

  useEffect(() => {
    gsap.set([iconRef.current], {
      transformOrigin: "center",
      scale: 0.2,
      rotation: -90,
      opacity: 0,
    });
  }, []);

  useEffect(() => {
    if (!iconRef.current) {
      return;
    }
    gsap.killTweensOf(iconRef.current);
    if (hover) {
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
  }, [hover]);

  return (
    <HoverTextWrapper
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove.bind(this)}
    >
      <IconContainer ref={iconRef}>
        <GenderIcon name={circle.toUpperCase()} letterSpacing={letterSpacing} />
      </IconContainer>
    </HoverTextWrapper>
  );
};

import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { P } from "../Text/Paragraph";
import { proportional } from "../../../utils";
import ArrowSvg from "../DecoElements/AnimatedArrow/ArrowSvg";
import gsap from "gsap";

const Container = styled.a.attrs({ width: [89, 148], height: [32, 52] })`
  ${proportional};
  border: 1px solid rgba(255, 255, 255, 1);
  display: flex;
  margin-left: 200px;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: ${(props) => props.color};
`;

const Arrow = styled.div.attrs({ width: [7, 12] })`
  ${proportional}
  display: flex;
`;

const Text = styled(P).attrs({
  fontSize: [9, 15],
  marginRight: [8, 16],
})`
  ${proportional};
  text-transform: uppercase;
  user-select: none;
`;

export default ({ href, isVisible = true, color = "white", children }) => {
  const containerRef = useRef();
  const arrowLeftRef = useRef();
  const arrowRightRef = useRef();
  const textRef = useRef();
  const visibleTlRef = useRef(gsap.timeline({ paused: true }));
  const hoverTlRef = useRef(gsap.timeline({ paused: true }));
  let borderColor, borderColorInvisible;

  switch (color) {
    case "black":
      borderColor = "rgba(0, 0, 0, 1)";
      borderColorInvisible = "rgba(0, 0, 0, 0)";
      break;
    case "white":
    default:
      borderColor = "rgba(255, 255, 255, 1)";
      borderColorInvisible = "rgba(255, 255, 255, 0)";
      break;
  }

  const onMouseEnter = () => {
    hoverTlRef.current.timeScale(0.8).play();
  };

  const onMouseLeave = () => {
    hoverTlRef.current.timeScale(0.8).reverse();
  };

  useEffect(() => {
    gsap.set(arrowLeftRef.current, {
      x: -30,
    });

    if (!isVisible) {
      gsap.set(containerRef.current, {
        borderColor: borderColorInvisible,
      });

      gsap.set(arrowRightRef.current, {
        opacity: 0,
        x: -10,
      });

      gsap.set(textRef.current, {
        opacity: 0,
      });
    }

    // The visibiltiy Timeline
    visibleTlRef.current.to(
      arrowRightRef.current,
      0.2,
      {
        opacity: 1,
      },
      0
    );

    visibleTlRef.current.to(
      arrowRightRef.current,
      0.5,
      {
        x: 0,
      },
      0
    );

    visibleTlRef.current.to(
      containerRef.current,
      0.5,
      {
        borderColor: borderColor,
      },
      0
    );

    visibleTlRef.current.to(
      textRef.current,
      0.5,
      {
        opacity: 1,
      },
      0
    );

    // The hover timeline
    hoverTlRef.current.to(
      arrowRightRef.current,
      0.5,
      {
        x: 50,
        ease: "power4.inOut",
      },
      0
    );

    hoverTlRef.current.to(
      arrowLeftRef.current,
      0.5,
      {
        x: 0,
        ease: "power4.inOut",
      },
      0
    );

    hoverTlRef.current.to(
      textRef.current,
      0.5,
      {
        x: 16,
        ease: "power4.inOut",
      },
      0
    );
  }, []);

  useEffect(() => {
    if (isVisible) {
      visibleTlRef.current.timeScale(1).play();
    } else {
      visibleTlRef.current.timeScale(2).reverse();
    }
  }, [isVisible]);

  return (
    <Container
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      color={color}
    >
      <Arrow ref={arrowLeftRef}>
        <ArrowSvg />
      </Arrow>
      <Text ref={textRef} color={color} variant="p5">
        {children}
      </Text>
      <Arrow ref={arrowRightRef}>
        <ArrowSvg />
      </Arrow>
    </Container>
  );
};

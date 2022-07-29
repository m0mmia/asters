import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import FixedTextContainer from "./FixedTextContainer";
import { Title4, Text2 } from "../Text";
import { proportional } from "../../../utils";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useTranslation } from "../../../hooks";

const Title = styled(Title4).attrs({ marginBottom: [30, 33] })`
  ${proportional};
  text-transform: uppercase;
  color: #A4FFAA !important;
  font-size: 30px;
  left: -30px;
`;

const Text = styled(Text2).attrs({
  width: [180, 354],
  marginBottom: [30, 36],
})`
  ${proportional};
  opacity: 1;
  color: #A4FFAA !important;
  position: relative;
  left: 340px;
  top: 70px;
`;

const TextContainer = styled.div`
  position: relative;
  top: -450px;
  left: 300px;
  color: #A4FFAA !important;
  width: 840px;

`;

export default ({ isVisible }) => {
  const containerRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();
  const text2Ref = useRef();
  const splitRef = useRef();
  const t = useTranslation();
  const [buttonVisible, setIsButtonVisible] = useState(false);

  const animateIn = () => {
    gsap.set(containerRef.current, {
      display: "block",
    });

    gsap.to([splitRef.current.lines, textRef.current], 0.4, {
      delay: 0.2,
      opacity: 1,
      stagger: 0.15,
      onComplete: () => {
        setIsButtonVisible(true);
      },
    });
    gsap.to([splitRef.current.lines, text2Ref.current], 0.4, {
      delay: 0.2,
      opacity: 1,
      stagger: 0.15,
      onComplete: () => {
        setIsButtonVisible(true);
      },
    });
  };

  const animateOut = () => {
    setIsButtonVisible(false);
    gsap.to([splitRef.current.lines, textRef.current], 0.2, {
      opacity: 0,
      onComplete: () => {
        gsap.set([containerRef.current], {
          display: "none",
          opacity: 1,
        });
      },
    });
    gsap.to([splitRef.current.lines, text2Ref.current], 0.2, {
      opacity: 0,
      onComplete: () => {
        gsap.set([containerRef.current], {
          display: "none",
          opacity: 1,
        });
      },
    });
  };

  useEffect(() => {
    splitRef.current = new SplitText(titleRef.current, {
      type: "lines",
      reduceWhiteSpace: false,
    });

    gsap.set(splitRef.current.lines, {
      opacity: 0,
    });

    gsap.set(containerRef.current, {
      display: "none",
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    if (isVisible) {
      animateIn();
    } else {
      animateOut();
    }

    return () => {
      gsap.killTweensOf([splitRef.current.lines, textRef.current, text2Ref.current]);
    };
  }, [isVisible]);

  return (
    <TextContainer ref={containerRef}>
      <Title ref={titleRef}>3 / The big announce</Title>
      <Text ref={textRef}>We announce the minting. Each Aster prepares for the monumental leap to the blockchain.  </Text>
    </TextContainer>
  );
};

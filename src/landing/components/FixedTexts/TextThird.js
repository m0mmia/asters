import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import FixedTextContainer from "./FixedTextContainer";
import { Title4, Text2 } from "../Text";
import { proportional } from "../../../../utils";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ShopNow from "../CallToAction/SimplifiedShopNow";
import { useTranslation } from "../../../../hooks";

const Title = styled(Title4).attrs({ marginBottom: [30, 33] })`
  ${proportional};
  text-transform: uppercase;
`;

const Text = styled(Text2).attrs({
  width: [180, 354],
  marginBottom: [30, 36],
})`
  ${proportional};
  opacity: 0;
`;

const ButtonContainer = styled.div`
  display: none;
`;

export default ({ isVisible }) => {
  const containerRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();
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
      gsap.killTweensOf([splitRef.current.lines, textRef.current]);
    };
  }, [isVisible]);

  return (
    <FixedTextContainer ref={containerRef}>
      <Title ref={titleRef}> Asters Story</Title>
      <Text ref={textRef}>
        This finding was the cornerstone to creating a shared space, an interplanetary HUB. The born place of a new civilization: The Asters, beings with endless capabilities and unlimited willingness to collaborate. An advanced civilization that became the commander of the universe and expanded the limits of cooperation.  </Text>
    </FixedTextContainer>
  );
};

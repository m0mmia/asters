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
    <FixedTextContainer ref={containerRef}>
      <Title ref={titleRef}> Asters Story</Title>
      <Text ref={textRef}>Once upon a time, there were four worlds, Terratia inhabited by humans with a remarkable capacity for Networking. Robotia, the birthplace of the Droids who stand out for their creativity. Hibridia, full of Hybrids with unparallel ability to create top-notch technological advances, and Innova, where Blues became the references of innovation.   </Text>
      <Text ref={text2Ref}> Those were challenging times. Why? Because each civilization struggles to become the commander of the galaxy without succeeding. Hence, the leadership of the universe became a dead end. This scenario remains the same until a group of notables acknowledge something. There was perfect harmony between the capacities of each population. The key to success lies in collaboration.  
        </Text>
    </FixedTextContainer>
  );
};

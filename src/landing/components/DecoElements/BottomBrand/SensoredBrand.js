import React, { useRef } from "react";
import styled from "styled-components";
import { gsap,  Linear } from "gsap";
import VisibilitySensor from "react-visibility-sensor";

const visibilitySensorOptions = {
  partialVisibility: true,
  minTopValue: 100,
};

export const Container = styled.div`
  opacity: 0;
`;


export default ({children}) => {
  const ref = useRef();

  const doDefault = () => {
    gsap.to(ref.current, {
        delay: 0.2,
        duration: 0.4,
        opacity: 1,
        ease: Linear.easeInOut,
      });
  }

  const display = (newVal) => {
    if (newVal) {
      if (!ref.current) {
        return;
      }

        doDefault()
    }
    else {
        gsap.set(ref.current, {opacity: 0})
    }
  };

  return (
    <VisibilitySensor
      onChange={(newVal) => {
        display(newVal);
      }}
      {...visibilitySensorOptions}
    >
      <Container ref={ref}>
          {children}
      </Container>
    </VisibilitySensor>
  );
}

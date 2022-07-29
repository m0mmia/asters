import React, { useState, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import VisibilitySensor from "react-visibility-sensor";
import { ScrollPos, media } from "../../../utils/ScrollPos";
import { gsap } from "gsap";
import { Title7 } from "../Text";


const Header = styled.div``;

const Title = styled(Title7)`
  text-align: center;
  white-space: nowrap;
  position: relative;
  text-transform: uppercase;
  left: -2000px;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;


export default ({ title = "Placeholder" }) => {
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const onChangeVisibility = (visible) => {
    setIsVisible(visible);
  };

  function animate(c1, c2) {
    gsap.set(headerRef.current.children, {
      x: c2 * 300,
    });
  }

  return (
    <Container>
      <VisibilitySensor
        onChange={onChangeVisibility}
        partialVisibility
        minTopValue={20}
      >
        <ScrollPos active={isVisible} callback={animate}>
          <Header ref={headerRef}>
            <Title>{(title + " ").repeat(50)}</Title>
          </Header>
        </ScrollPos>
      </VisibilitySensor>
    </Container>
  )
}

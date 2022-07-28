import gsap from "gsap/gsap-core";
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { proportional } from "../../../../utils";
import ShopNow from "../CallToAction/ShopNow";
import { Text6 } from "../Text";

const DetailsWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Arrow = styled.div`
  display: inline-block;
`;

const LeftDisplay = styled.div.attrs({ width: [157, 163] })`
  ${proportional};
  position: absolute;
  left: 0;
  bottom: 0;
`;
const LeftRelative = styled.div.attrs({ width: [157, 163] })`
  ${proportional};
  opacity: 0;
  pointer-events: none;
`;
const RightDisplay = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Text = styled(Text6)`
  color: #4a4b53;
  text-transform: uppercase;
`;
const Name = styled(Text)`
  color: #747474;
`;

export default ({ product, active }) => {
  const { name, price } = product;
  const tlRef = useRef(null);
  const leftInitial = useRef(null);
  const leftHover = useRef(null);

  const displayHover = () => {
    const tl = gsap.timeline({});

    tl.fromTo(
      leftInitial.current,
      { opacity: 1 },
      { duration: 0.2, opacity: 0 },
      0
    );
    tl.fromTo(
      leftHover.current,
      { opacity: 0 },
      { duration: 0.2, opacity: 1 },
      0
    );
    tl.pause();
    return tl;
  };

  const applyAnimation = useCallback((hovered) => {
    const tl = displayHover();
    if (hovered) {
      tl.play();
    } else {
      tl.reversed();
    }

    tlRef.current = tl;
  }, []);

  useEffect(() => {
    applyAnimation(active);
  }, [active, applyAnimation]);

  useEffect(() => {
    gsap.set(leftHover.current, { opacity: 0 });
  });

  return (
    <DetailsWrap>
      <LeftRelative>
        <Text>Karl Kani</Text>
        <Name>{name}</Name>
      </LeftRelative>

      <LeftDisplay ref={leftInitial}>
        <Text>Karl Kani</Text>
        <Name>{name}</Name>
      </LeftDisplay>

      <LeftDisplay ref={leftHover}>
        <ShopNow variant="p6" />
      </LeftDisplay>

      <RightDisplay>
        <Text>{price}</Text>
      </RightDisplay>
    </DetailsWrap>
  );
};

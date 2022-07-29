import React, { useState } from "react";
import styled from "styled-components";
import { proportional } from "../../../utils";
import { ProductDetails } from "./index";
import { AspectRatio } from "../../../components";

const SlideWrap = styled.div.attrs({
  width: [259, 413],
  height: [207, 329],
  paddingLeft: [25, 39],
  paddingBottom: [15, 30],
  paddingRight: [16, 46],
})`
  ${proportional};
  position: relative;
`;

const ImageWrapper = styled(AspectRatio)`
  overflow: hidden;
  position: relative;
  z-index: 0;
`;

const ImagePlacer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Image = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: bottom;
`;

export default React.memo(({ product }) => {
  const { image, href } = product;
  const [hovered, setHovered] = useState(false);

  const setStateHover = () => {
    setHovered(true);
  };

  const setStateNoHover = () => {
    setHovered(false);
  };
  const onNavigate = () => {
    Object.assign(document.createElement("a"), {
      href: href,
    }).click();
  };
  return (
    <SlideWrap
      onClick={onNavigate}
      onMouseEnter={setStateHover}
      onMouseLeave={setStateNoHover}
    >
      <ImagePlacer>
        <ImageWrapper ratio={80}>
          <Image image={image} />
        </ImageWrapper>
      </ImagePlacer>
      <ProductDetails active={hovered} product={product} />
    </SlideWrap>
  );
});

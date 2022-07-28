import React from "react";
import styled from "styled-components";
import { proportional } from "../../../../utils";
import { ProductDetails } from "./index";
import { AspectRatio, Image } from "../../../../components";

const SlideWrap = styled.div.attrs({
  width: [242.04, 304.6],
  height: [294, 371],
})`
  ${proportional};
  position: relative;
  background-color: white;
  cursor: pointer;
`;

const ProductDetailsWrapper = styled.div.attrs({
  paddingTop: [11.68, 17],
  paddingBottom: [12, 15.68],
  paddingLeft: [15.43, 19.42],
  paddingRight: [6.68, 18.4],
})`
  ${proportional};
  background: white;
  width: 100%;
  position: absolute;
  bottom: 0;
  align-content: center;
`;

const ImageWrapper = styled(AspectRatio)`
  overflow: hidden;
  position: relative;
  z-index: 0;
`;

const ImagePlacer = styled.div.attrs({
  width: [242.04, 305],
  height: [242.04, 305],
})`
  ${proportional};
  position: absolute;
  top: 0;
  left: 0;
`;

export default ({ product }) => {
  const { image, href } = product;

  const onNavigate = () => {
    Object.assign(document.createElement("a"), {
      href: href,
    }).click();
  };

  return (
    <SlideWrap onClick={onNavigate}>
      <ImagePlacer>
        <ImageWrapper ratio={100}>
          <Image image={image} />
        </ImageWrapper>
      </ImagePlacer>

      <ProductDetailsWrapper>
        <ProductDetails active={false} product={product} />
      </ProductDetailsWrapper>
    </SlideWrap>
  );
};

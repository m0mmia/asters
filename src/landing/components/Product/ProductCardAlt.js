import React from "react";
import styled from "styled-components";
import { proportional } from "../../../utils";
import { ProductDetails } from "./index";
import { AspectRatio, Image } from "../../../components";
import ProductDetailsAlt from "./ProductDetailsAlt";

const SlideWrap = styled.div.attrs({
  width: [242.04, 304.6],
  height: [294, 371],
  paddingTop: [242.04, 305],
})`
  ${proportional};
  position: relative;
`;

const ProductDetailsWrapper = styled.div.attrs({
  paddingTop: [11.68, 17],
  paddingBottom: [12, 15.68],
})`
  ${proportional};
  width: 100%;
  position: relative;
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
        <ProductDetailsAlt active={false} product={product} />
      </ProductDetailsWrapper>
    </SlideWrap>
  );
};

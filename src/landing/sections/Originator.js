import React, { useState } from "react";
import styled from "styled-components";
import { useProduct, useTranslation } from "../../../hooks";
import { getSiteCurrency } from "../../../i18n/siteContext";
import { assetUrl, getIsMobileWidth, proportional } from "../../../utils";
import { CallToAction } from "../components/CallToAction";
import {
  ResponsiveImageBlock,
  ImageContainer,
} from "../components/ResponsiveImageBlock";
import { Text1, Title5 } from "../components/Text";
import { singlesEu, singlesCh } from "../../../data/products/karlkani2";
import { ProductCard } from "../components/Product";
import {
  AnimatedWrapperNoFade,
  TextWrapper,
} from "../components/AnimatingWrapping";
import ShopNow from "../components/CallToAction/SimplifiedShopNow";
import StaggerTextBlock from "../components/AnimatingWrapping/StaggerTextBlock";
import { HoverText, StaticMobile } from "../components/HoverText";
import VisibleHelper from "../components/AnimatingWrapping/VisibleHelper";

const OriginatorContainer = styled.div.attrs({
  paddingTop: [70, 225],
  paddingBottom: [1130, 343],
})`
  ${proportional};
  position: relative;
`;

const TextWrapperContainer = styled.div.attrs({
  marginLeft: [39, 188],
  width: [235, 460],
})`
  ${proportional};
`;

const OriginatorTitle = styled(Title5).attrs({
  width: [180, 445],
  marginBottom: [25, 36],
})`
  text-transform: uppercase;
  ${proportional};
`;

const OriginatorText = styled(Text1).attrs({ marginBottom: [29, 36] })`
  ${proportional};
`;

const OriginatorImage = styled(ImageContainer).attrs({
  width: [320, 602],
  height: [616, 642],
  top: [691, 0],
  right: [0, 0],
})`
  ${proportional};
  position: absolute;
`;

const HoverTextContainer = styled(ImageContainer).attrs({
  width: [320, 602],
  height: [616, 642],
  top: [691, 0],
  right: [0, 0],
})`
  ${proportional};
  position: absolute;
  z-index: 2;
  color: white;
`;

const ProductCardContainer = styled.div.attrs({
  top: [1160, 453],
  left: [16, 730],
})`
  ${proportional};
  position: absolute;
  z-index: 10;
  background: black;
  background-image: url(${assetUrl(`/images/karlkani2/background.jpg`)});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const ProductCardContainerAlt = styled.div.attrs({
  top: [507, 659],
  left: [80, 187],
})`
  ${proportional};
  position: absolute;
  z-index: 10;
`;

const SectionContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background: black;
  background-image: url(${assetUrl(`/images/karlkani2/background.jpg`)});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default () => {
  const [textVisible, setTextVisible] = useState(false);

  const onTextDisplayUpdate = (newVal) => {
    setTextVisible(newVal);
  };

  const t = useTranslation();

  return (
    <SectionContainer>
    </SectionContainer>
  );
};

const OriginatorProductCards = () => {
  const propsFromProduct = useProduct();
  const items = getSiteCurrency() == "eu" ? singlesEu : singlesCh;
  const [productActive, setProductActive] = useState(false);
  const isMobile = getIsMobileWidth();

  return (
    <>
      <ProductCardContainer>
        <AnimatedWrapperNoFade
          transitions={{
            variant: "vertical",
            yStart: isMobile ? 40 : 180,
            yEnd: isMobile ? 0 : 0,
          }}
        >
          <ProductCard
            active={false}
            product={{ ...propsFromProduct(items[0]) }}
          />
        </AnimatedWrapperNoFade>
      </ProductCardContainer>
      <ProductCardContainerAlt>
        <AnimatedWrapperNoFade
          transitions={{
            variant: "vertical",
            yStart: isMobile ? 30 : 100,
            yEnd: isMobile ? 0 : 0,
          }}
        >
          <ProductCard
            active={false}
            product={{ ...propsFromProduct(items[1]) }}
          />
        </AnimatedWrapperNoFade>
      </ProductCardContainerAlt>
    </>
  );
};

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useProduct, useTranslation } from "../../../hooks";
import { getSiteCurrency } from "../../../i18n/siteContext";
import { getIsMobileWidth, proportional } from "../../../utils";
import { ScrollposRepeater } from "../components/ScrollposRepeater";
import { Text4, Title3Alt } from "../components/Text";
import {
  apparelEu,
  shoesEu,
  apparelCh,
  shoesCh,
} from "../../../data/products/jordanxi";

import { UgcGrid } from "../components/Store";

import TextBrand from "../components/TextBrand";
import { recoEu, recoCh } from "../../../data/products/karlkani2";
import CarouselWrapper from "../components/CarouselWrap/CarouselWrapper";
import { Slide } from "../components/Product";
import Brand from "../components/DecoElements/BottomBrand/Brand";
import ProductCardAlt from "../components/Product/ProductCardAlt";
import VisibleHelper from "../components/AnimatingWrapping/VisibleHelper";
import StaggerTextBlock from "../components/AnimatingWrapping/StaggerTextBlock";

const FooterContainer = styled.div.attrs({ paddingTop: [62, 75] })`
  ${proportional};
  position: relative;
`;

const FooterTextWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FooterDecorations = styled.div.attrs({
  height: [49, 69],
  marginBottom: [27, 27],
})`
  ${proportional};
  position: relative;
`;

const FooterText = styled(Text4)`
  display: inline-block;
`;

const FooterTextRight = styled(FooterText).attrs({ marginLeft: [8, 8] })`
  ${proportional};
`;

const BrandWrap = styled.div.attrs({
  left: [91, 615],
  top: [0, 0],
  width: [39, 49],
  height: [49, 69],
})`
  ${proportional};
  position: absolute;
`;

const ScollerBar = styled.div.attrs({
  marginTop: [56.69, 54.65],
  marginBottom: [56.69, 54.65],
  paddingBottom: [27.44, 27.44],
  paddingTop: [27.44, 27.44],
})`
  ${proportional};
  background: black;
  overflow: hidden;
  color: white;
`;

const SectionContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  /* overflow: hidden; */
`;

const Container = styled.div.attrs({ width: [, 1164] })`
  ${proportional}
  margin: 0 auto;
  overflow: hidden;
`;

const FooterBottomTitle = styled(Title3Alt).attrs({
  width: [172, 290],
  paddingBottom: [41, 61],
})`
  ${proportional}
  text-transform: uppercase;
  text-align: center;
  margin: 0 auto;
`;

const TextBrandContainer = styled.div.attrs({
  width: [82.95, 118.5],
  height: [41.19, 84],
  left: [160, 715.11],
})`
  ${proportional};
  position: absolute;
`;

const CarouselWrapperPreview = styled.div.attrs({ paddingBottom: [62, 88] })`
  ${proportional};
`;

const CarouselSlide = styled.div.attrs({ marginRight: [12.35, 19.22] })`
  ${proportional};
`;

export default () => {
  const t = useTranslation();

  return (
    <FooterContainer>
      <SectionContainer>
        <FooterDecorations>
          <BrandWrap>
            <Brand color={"#000"} />
          </BrandWrap>
          <TextBrandContainer>
            <TextBrand />
          </TextBrandContainer>
        </FooterDecorations>
        <FooterTextWrapper>
          <FooterText>{t("karl-kani-2.brand_footer")}</FooterText>
        </FooterTextWrapper>
      </SectionContainer>
      <ScollerBar>
        <ScrollposRepeater title="#SNIPESKNOWS" />
      </ScollerBar>

      <FooterBottom />
    </FooterContainer>
  );
};

export const FooterBottom = () => {
  const t = useTranslation();
  const propsFromProduct = useProduct();
  const [isMobile, setIsMobile] = useState(getIsMobileWidth());
  const items = getSiteCurrency() == "eu" ? recoEu : recoCh;

  const onResize = () => {
    setIsMobile(getIsMobileWidth());
  };

  const addDomEvents = () => {
    window.addEventListener("resize", onResize);
  };

  const removeDomEvents = () => {
    window.removeEventListener("resize", onResize);
  };

  const [textVisible, setTextVisible] = useState(false);

  const onTextDisplayUpdate = (newVal) => {
    setTextVisible(newVal);
  };

  useEffect(() => {
    addDomEvents();
    return () => {
      removeDomEvents();
    };
  }, []);

  return (
    <>
      <Container>
        <UgcGrid isMobile={isMobile} />
        <VisibleHelper onChangedisplay={onTextDisplayUpdate}>
          <StaggerTextBlock isVisible={textVisible}>
            <FooterBottomTitle>{t("karl-kani-2.more_title")}</FooterBottomTitle>
          </StaggerTextBlock>
        </VisibleHelper>
        {/* todo: make fullWidth */}
      </Container>
      <SectionContainer>
        <CarouselWrapperPreview>
          <CarouselWrapper nextSlidesPerSlide={0} crop={false}>
            {items.map((item, i) => {
              return (
                <CarouselSlide key={i}>
                  <ProductCardAlt
                    active={false}
                    product={{ ...propsFromProduct(item) }}
                  />
                </CarouselSlide>
              );
            })}
          </CarouselWrapper>
        </CarouselWrapperPreview>
      </SectionContainer>
    </>
  );
};

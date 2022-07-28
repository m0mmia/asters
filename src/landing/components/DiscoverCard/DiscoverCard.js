import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useProduct, useTranslation } from "../../../../hooks";
import { getIsMobileWidth, proportional } from "../../../../utils";
import CarouselWrapper from "../CarouselWrap/CarouselWrapper";
import { itemsEu, itemsCh } from "../../../../data/products/karlkani2";
import { getSiteCurrency } from "../../../../i18n/siteContext";
import { Title3 } from "../Text";
import ShopNow from "../CallToAction/SimplifiedShopNow";
import { TextWrapper } from "../AnimatingWrapping";

import { ProductCard } from "../Product";
import VisibleHelper from "../AnimatingWrapping/VisibleHelper";
import StaggerTextBlock from "../AnimatingWrapping/StaggerTextBlock";

const DiscoverCard = styled.div.attrs({
  width: [, 1279],
  height: [724, 804],
  marginBottom: [123, 0],
})`
  margin: 0 auto;
  ${proportional};
  width: 100%;
  position: relative;
`;
const DiscoverBackground = styled.div.attrs({
  left: [-411, -102],
  top: [, -76],
  width: [1201, 1474.41],
  height: [724, 975.77],
})`
  ${proportional};
  position: absolute;
  background: url(${(props) => props.src});
  background-size: 100% 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const DiscoverCardCarousel = styled.div.attrs({
  marginLeft: [57, 0],
  paddingRight: [57, 0],
})`
  ${proportional};
  width: 100%;
`;
const DiscoverCardCarouselPosition = styled.div.attrs({
  left: [, 592],
  top: [528, 226],
  width: [, 611],
})`
  ${proportional};
  position: absolute;
  width: 100%;
`;

const DiscoverContent = styled.div.attrs({
  width: [180, 430],
  left: [39, 109.5],
  top: [266, 273],
})`
  ${proportional};
  position: absolute;
  color: white;
`;

const DiscoverText = styled(Title3).attrs({ marginBottom: [20, 50] })`
  ${proportional};
`;

const CarouselSlide = styled.div.attrs({ marginRight: [12.5, 15] })`
  ${proportional};
`;

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* background: pink; */
  overflow: hidden;
`;

export default ({ image, imageMobile }) => {
  const [isMobile, setIsMobile] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const propsFromProduct = useProduct();
  const items = getSiteCurrency() == "eu" ? itemsEu : itemsCh;
  const [textVisible, setTextVisible] = useState(false);
  const t = useTranslation();
  const onTextDisplayUpdate = (newVal) => {
    setTextVisible(newVal);
  };

  const onResize = () => {
    setIsMobile(getIsMobileWidth());
  };

  const addDomEvents = () => {
    window.addEventListener("resize", onResize);
  };

  const removeDomEvents = () => {
    window.removeEventListener("resize", onResize);
  };

  const updateActiveImage = useCallback(() => {
    if (isMobile) {
      setActiveImage(imageMobile);
    } else {
      setActiveImage(image);
    }
  }, [isMobile]);

  useEffect(() => {
    updateActiveImage();
  }, [isMobile, updateActiveImage]);

  useEffect(() => {
    addDomEvents();
    onResize();
    return () => {
      removeDomEvents();
    };
  }, []);

  return (
    <DiscoverCard>
      <BackgroundContainer>
        {activeImage && <DiscoverBackground src={activeImage} />}
      </BackgroundContainer>
      <DiscoverContent>
        <VisibleHelper onChangedisplay={onTextDisplayUpdate}>
          <StaggerTextBlock isVisible={textVisible}>
            <DiscoverText> {t("karl-kani-2.discover_title")}</DiscoverText>
            <ShopNow href="/c/brands/karl_kani">
              {t("karl-kani-2.discover_button")}
            </ShopNow>
          </StaggerTextBlock>
        </VisibleHelper>
        <TextWrapper transitions={{}}></TextWrapper>
      </DiscoverContent>
      <DiscoverCardCarouselPosition>
        <DiscoverCardCarousel>
          <CarouselWrapper
            withIndicator
            nextSlidesPerSlide={0}
            indicatorColor={isMobile ? "#000" : "#fff"}
            crop={!isMobile}
          >
            {items.map((item, i) => {
              return (
                <CarouselSlide key={i}>
                  <ProductCard
                    active={false}
                    product={{ ...propsFromProduct(item) }}
                  />
                </CarouselSlide>
              );
            })}
          </CarouselWrapper>
        </DiscoverCardCarousel>
      </DiscoverCardCarouselPosition>
    </DiscoverCard>
  );
};

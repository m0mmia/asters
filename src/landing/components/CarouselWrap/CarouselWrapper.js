import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "styled-components";
import { Carousel } from "../../../../components";

import styled from "styled-components";
import { media, assetUrl, getIsMobileWidth } from "../../../../utils";
import Indicator from "./Indicator";
import { AltCarousel } from "../../../../components/carousel/AltCarousel";

const Hitbox = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 25%;
  height: 100%;

  cursor: url(${assetUrl("/images/clp/cursor-arrow-right.png")}), auto;
  cursor: -webkit-image-set(
      url(${assetUrl("/images/clp/cursor-arrow-right.png")}) 1x,
      url(${assetUrl("/images/clp/cursor-arrow-right@2x.png")}) 2x
    ),
    auto;

  z-index: 10000;

  ${media("l")} {
    display: block;
  }
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const SlideContainer = styled.div`
  position: relative;
  z-index: 2;
  margin: ${(50 / 750) * 100}vw 0;

  ${media("l")} {
    margin: ${(60 / 1440) * 100}vw 0 ${(80 / 1440) * 100}vw;
  }

  ${media("xl")} {
    margin: 60px 0 80px;
  }
`;

const HiddenAbsoluteContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -5;
  opacity: 0;
  pointer-events: none;
`;

export default ({
  children,
  crop = true,
  withIndicator = false,
  indicatorColor = "#000",
  nextSlidesPerSlide = 1,
}) => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(null);
  const [referenceWidth, setReferenceWidth] = useState(null);
  const referenceElementRef = useRef(null);
  const referenceElement = children?.[0];

  const onResize = () => {
    onGetReferenceWidth();
    setIsMobile(getIsMobileWidth());
  };

  const onGetReferenceWidth = useCallback(() => {
    const newWidth = referenceElementRef.current.clientWidth;
    setReferenceWidth(newWidth);
  }, []);

  useEffect(() => {
    onGetReferenceWidth();
  }, [onGetReferenceWidth]);

  function onUpdateIndex(index) {
    setIndex(index);
  }

  function onClickNext() {
    setIndex((index) => index + 1);
  }

  function onSelectIndex(newIndex) {
    setIndex(newIndex);
  }

  const amountOfSlides = React.Children.toArray(children).length;

  const addDomEvents = () => {
    window.addEventListener("resize", onResize);
  };

  const removeDomEvents = () => {
    window.removeEventListener("resize", onResize);
  };

  useEffect(() => {
    addDomEvents();
    onResize();
    return () => {
      removeDomEvents();
    };
  }, []);

  return (
    <>
      <Wrapper>
        {referenceElement && (
          <HiddenAbsoluteContainer ref={referenceElementRef}>
            {referenceElement}
          </HiddenAbsoluteContainer>
        )}
        {referenceWidth && (
          <AltCarousel
            isMobile={isMobile}
            width={referenceWidth}
            index={index}
            onUpdateIndex={onUpdateIndex}
            crop={crop}
            nextSlidesPerSlide={nextSlidesPerSlide}
          >
            {children}
          </AltCarousel>
        )}
      </Wrapper>
      {withIndicator && amountOfSlides && (
        <Indicator
          onSelectIndex={onSelectIndex}
          amountOfSlides={amountOfSlides - 1}
          color={indicatorColor}
          activeIndex={index}
        />
      )}
    </>
  );
};

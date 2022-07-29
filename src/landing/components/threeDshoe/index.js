import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import Shoe, { POSES } from "./shoe";
import { useTranslation } from "../../../hooks";
import { assetUrl, media, proportional, getIsMobileWidth } from "../../../utils";
import { TitleScaling } from "../Text/Title";
import { AnimationScrollIndicator } from "../ScrollIndicator/AnimationScrollIndicator";
import gsap from "gsap";
import { BottomBrand } from "../DecoElements";

const Wrapper = styled.div``;

const Container = styled.div`
  position: relative;
  height: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
`;

const Discover2Title = styled(TitleScaling)`
  text-transform: uppercase;
  text-align: right;
  padding-right: 2vw;
  display: ${(props) => (props.isMobile ? "none" : "auto")};
`;

const DiscoverTitleMobile = styled(TitleScaling)`
  text-transform: uppercase;
  text-align: left;
  padding-right: 2vw;
  display: ${(props) => (!props.isMobile ? "none" : "auto")};
  width: 80vw;

  padding-left: 10vw;
  padding-bottom: 20vh;
`;

const IndicatorPreview = styled.div.attrs({
  paddingTop: [80, 80],
  paddingBottom: [150, 180],
  bottom: [120, window.innerHeight / 2],
  right: [24, 41],
})`
  cursor: pointer;
  ${proportional};
  position: absolute;
`;

const BlackBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  right: -100vw;
  background: black;
  background-image: url(${assetUrl(`/images/karlkani2/background.jpg`)});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const TitleContainer = styled.div`
  position: absolute;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0 !important;
  display: none;
  pointer-events: none;
  background: black;
  background-image: url(${assetUrl(`/images/karlkani2/background.jpg`)});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const TitleMover = styled.div`
  position: absolute;
  width: 100%;
  top: 55vh;
`;

const DiscoverTitle = styled(TitleScaling)`
  text-transform: uppercase;
  text-align: left;
  z-index: 9999;
  margin-bottom: 1vh;
  padding-left: 1vw;
  display: ${(props) => (props.isMobile ? "none" : "auto")};
`;

const BottomBrandContainer = styled.div.attrs({
  bottom: [34],
  left: [34],
})`
  ${proportional}
  position: absolute;
  z-index: 4;
  ${media("l")} {
    display: none;
  }
`;

export const ThreeDshoe = React.memo(() => {
  console.log("SHOE RENDER");
  const animationRef = useRef();
  const indicatorRef = useRef();
  const titleMoverRef = useRef();
  const t = useTranslation();
  const sections = [
    { ref: useRef(), pose: POSES.FRONT },
    { ref: useRef(), pose: POSES.BACK },
    { ref: useRef(), pose: POSES.SIDE_DIAGONAL },
    { ref: useRef(), pose: POSES.SIDE },
  ];

  const isMobile = getIsMobileWidth();
  const canvasRef = useRef();

  useEffect(() => {
    gsap.set(titleMoverRef.current, { y: window.innerHeight / 2 });

    return () => {};
  }, []);

  return (
    <>
      <BlackBackground ref={animationRef} />
      <Container>
        <Shoe
          pose={POSES.INITIAL}
          ref={canvasRef}
          setAnimationRef={animationRef}
          titleMoverRef={titleMoverRef}
          indicatorRef={indicatorRef}
        />
      </Container>
      <TitleContainer ref={titleMoverRef}>
      </TitleContainer>
    </>
  );
});

export default ThreeDshoe;

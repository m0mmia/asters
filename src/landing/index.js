import React, { useEffect } from "react";
import styled from "styled-components";
import Page from "./Page";
import SiteContextProvider from "./components/SiteContext";
import ThreeDshoe from "./components/threeDshoe/index";
import { LoaderAnimation } from "./components/LoaderAnimation";
import Preloader, { PreloadContextProvider } from "../components/preloader";
import BottomBrand from "./components/DecoElements/BottomBrand";
import { assetUrl, media, proportional } from "../utils";
import GradientOverlay from "../components/gradientOverlay/GradientOverlay";

const Container = styled.div`
  position: relative;
  background: #000;
  background-repeat: repeat;
  background-size: 1100px 825px;
  min-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
`;

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  background-image: url(${assetUrl(`/images/background.jpg`)});
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const BottomBrandContainer = styled.div.attrs({
  bottom: [-200, 66],
  left: [-200, 80],
})`
  ${proportional}
  position: fixed;
  z-index: 4;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderAnimation />
    </LoaderContainer>
  );
};

const Asters = React.memo(() => {
  console.log("LAYOUT RERENDER");

  const images = [
    assetUrl("/images/grid_1.jpg"),
    assetUrl("/images/grid_2.jpg"),
    assetUrl("/images/grid_3.jpg"),
    assetUrl("/images/grid_4.jpg"),
    assetUrl("/images/grid_5.jpg"),
    assetUrl("/images/grid_6.jpg"),
  ];

  useEffect(() => {
    var divsToHide = document.getElementsByClassName("s-footer");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.height = "0";
      divsToHide[i].style.overflow = "hidden";
    }

    if (document.getElementById("main")) {
      document.getElementById("main").style.paddingBottom = 0;
    }
  }, []);

  return (
      <Container>
        <GradientOverlay />
        <SiteContextProvider>
          <PreloadContextProvider waitFor3D={true} waitForAnimation={true}>
            <ThreeDshoe />
            <Preloader images={images} animation={<Loader />}>
              <Page />
            </Preloader>
          </PreloadContextProvider>
        </SiteContextProvider>
      </Container>
  );
});

export default Asters;

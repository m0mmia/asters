import React from "react";
import styled from "styled-components";
import { assetUrl, media, proportional } from "../../utils";
import BlackParallaxUnit from "./BlackParallaxUnit";
import Colourways from "./Colourways";
import DiscoverApparel from "./DiscoverApparel";


const SectionContainer = styled.div`
  position: relative;
`;

const TopSectionContainer = styled.div.attrs({
  height: [1300, 2300],
})`
  ${proportional};
  background: black;
  background-image: url(${assetUrl(`/images/background.jpg`)});
  min-height: 500px; 
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const BottomSectionContainer = styled.div`
  position: relative;
`;

export const Sections = () => {
  console.log("SECTION RENDER");

  return (
    <>
      <TopSectionContainer>
        <BlackParallaxUnit />
      </TopSectionContainer>
      <BottomSectionContainer>
        <Colourways />
        <DiscoverApparel />
      </BottomSectionContainer>
    </>
  );
};

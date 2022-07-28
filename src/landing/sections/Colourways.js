import React, { useState, useContext } from "react";
import styled from "styled-components";
import { assetUrl, media, proportional } from "../../../utils";
import { Title2, Title8 } from "../components/Text";
import CarouselWrapper from "../components/CarouselWrap/CarouselWrapper";
import { coloursEu, coloursCh } from "../../../data/products/karlkani2";
import { getSiteCurrency } from "../../../i18n/siteContext";
import { useProduct, useTranslation } from "../../../hooks";
import { Slide } from "../components/Product";
import ShopNow from "../components/CallToAction/SimplifiedShopNow";

import { SensoredBrand, Brand } from "../components/DecoElements";
import { TextWrapper } from "../components/AnimatingWrapping";
import { StaticMobile, HoverText } from "../components/HoverText";
import VisibleHelper from "../components/AnimatingWrapping/VisibleHelper";
import StaggerTextBlock from "../components/AnimatingWrapping/StaggerTextBlock";
import { ShoePositionContext } from "../components/SiteContext";

// import Brand from '../components/DecoElements/BottomBrand/Brand';

const AstersLogo = styled.img.attrs({
  top: [-200, -200],
  width: [800, 800],
})`
  ${proportional}
  position: absolute;
  left: -100px;
  user-select: none;
`;

const AstersText = styled.img.attrs({
  top: [150, 50],
  width: [800, 800],
})`
  ${proportional}
  position: absolute;
  left: -100px;
  user-select: none;
`;

const ColourwaysContainer = styled.div.attrs({
  paddingTop: [343, 445],
  paddingBottom: [75, 70],
})`
  ${proportional};
  position: relative;
`;

const TitleDecoration = styled(Title8).attrs({ top: [, -20] })`
  ${proportional};
  position: absolute;
  right: 0;
  transform: translateY(-100%);
  display: none;
  user-select: none;
  ${media("l")} {
    display: block;
  }
`;
const TextWrapperContainer = styled.div.attrs({
  marginLeft: [32, 223],
  marginBottom: [40, 100],
})`
  ${proportional};
  position: relative;
`;

const ColourWaysTitle = styled(Title2)`
  text-transform: uppercase;
  user-select: none;
`;

const RightTextWrap = styled.div.attrs({ marginLeft: [32, 120] })`
  ${proportional};
  position: relative;
  display: inline-block;
`;

const RightText = styled(ColourWaysTitle).attrs()`
  ${proportional};
`;

const CarouselSlide = styled.div.attrs({ marginRight: [12.35, 19.22] })`
  ${proportional};
`;

const ColourwaysCarouselContainer = styled.div.attrs({ marginLeft: [32, 80] })`
  ${proportional};
`;

const BrandWrap = styled.div.attrs({
  left: [208, 775.57],
  top: [-126, -279],
  width: [24, 34],
  height: [30, 43],
})`
  ${proportional};
  position: absolute;
  user-select: none;
`;

const SectionContainer = styled.div`
  max-width: 1440px;
  min-height: 1000px;
  margin: 0 auto;
`;

const HoverTextContainer = styled.div.attrs({
  width: [200, 1440],
  height: [280, 620],
  top: [-343, -363],
  right: [0, 0],
})`
  ${proportional};
  z-index: 11;
  position: absolute;
  color: black;
  touch-action: none;
  display: ${(props) => (props.shoePosition >= 3 ? "block" : "none")};
`;

export default () => {
  const [textVisible, setTextVisible] = useState(false);
  const [shoePosition] = useContext(ShoePositionContext);

  const onTextDisplayUpdate = (newVal) => {
    setTextVisible(newVal);
  };

  const t = useTranslation();

  return (
    <SectionContainer>
      <ColourwaysContainer>
      <AstersLogo src={assetUrl("/images/karlkani2/logo.png")} />
      <AstersText src={assetUrl("/images/karlkani2/asters.png")} />
      </ColourwaysContainer>
      <ShopNow href="/c/brands/karl_kani">
        {t("karl-kani-2.black_text2_button")}
      </ShopNow>
    </SectionContainer>
  );
};

import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import GridImages from "../components/GridImages";
import { TextFirst, TextSecond, TextThird } from "../components/FixedTexts";
import { getIsMobileWidth } from "../../../utils";
import {
  SiteStateContext,
  SITE_STATE_1,
  SITE_STATE_2,
  SITE_STATE_3,
  SITE_STATE_4,
} from "../components/SiteContext";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  height: 100%;
`;

export default () => {
  const [siteState] = useContext(SiteStateContext);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);

  useEffect(() => {
    switch (siteState) {
      case SITE_STATE_2:
        setIsVisible1(true);
        setIsVisible2(false);
        setIsVisible3(false);
        break;
      case SITE_STATE_3:
        setIsVisible1(false);
        setIsVisible2(true);
        setIsVisible3(false);
        break;
      case SITE_STATE_4:
        setIsVisible1(false);
        setIsVisible2(false);
        setIsVisible3(true);
        break;
      case SITE_STATE_1:
      default:
        setIsVisible1(false);
        setIsVisible2(false);
        setIsVisible3(false);
        break;
    }
  }, [siteState]);

  return (
    <Container>
      <TextFirst isVisible={isVisible1} />
      <TextSecond isVisible={isVisible2} />
      <TextThird isVisible={isVisible3} />

      <GridImages />
    </Container>
  );
};

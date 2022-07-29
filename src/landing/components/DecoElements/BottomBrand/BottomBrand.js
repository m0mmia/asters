import React, { useEffect, useRef, useContext, useState } from "react";
import Brand from "./Brand";
import styled from "styled-components";
import { Text4 } from "../../Text";
import gsap, { ColorProps } from "gsap";
import { proportional } from "../../../../utils";
import { useTranslation } from "../../../../hooks";
import {
  SiteStateContext,
  SITE_STATE_2,
  SITE_STATE_3,
} from "../../SiteContext";

const BrandWrap = styled.div.attrs({ width: [178, 259] })`
  ${proportional};
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.color};
`;

const BrandText = styled(Text4).attrs({
  width: [132, 191],
  marginTop: [2, 13],
})`
  ${proportional};
`;

const BrandContainer = styled.div.attrs({ width: [27.9, 41.88] })`
  ${proportional};
`;

export default () => {
  const [siteState] = useContext(SiteStateContext);
  const [brandColor, setBrandColor] = useState("#000");
  const colorRef = useRef({ color: brandColor });
  const t = useTranslation();
  useEffect(() => {
    let color;
    if (siteState >= SITE_STATE_2 && siteState <= SITE_STATE_3) {
      setBrandColor("#fff");
      color = "#fff";
    } else {
      setBrandColor("#000");
      color = "#000";
    }

    // TODO: Somehow this tween causes the whole site to rerender
    //That's some legit voodoo magic.

    // gsap.to(colorRef.current, 1, {
    //   color: color,
    //   ease: "power4.inOut",
    //   onUpdate: () => {
    //     setBrandColor(colorRef.current.color);
    //   },
    // });

    // return () => {
    //   gsap.killTweensOf(colorRef.current);
    // };
  }, [siteState]);

  return (
    <BrandWrap color={brandColor}>
      {siteState < SITE_STATE_3 && (
        <>
          <BrandContainer>
            <Brand color={brandColor} />
          </BrandContainer>
          <BrandText color={brandColor}>
            {t("karl-kani-2.brand_footer")}
          </BrandText>
        </>
      )}
    </BrandWrap>
  );
};

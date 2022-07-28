import React, { useState } from "react";
import styled from "styled-components";
import { proportional } from "../../../../../utils";
import { StaggerFadeIn } from "../../AnimatingWrapping";
import TextBrand from "../../TextBrand";
import VisibilitySensor from "react-visibility-sensor";

const TextBrandContainer = styled.div.attrs((props) => {
  return {
    width: [58.33, 132.56],
    height: [28.96, 65.82],
    top: [props.index * 8, props.index * 16],
    left: [props.index * 8, props.index * 16],
  };
})`
  ${proportional};
  color: ${(props) => props.color};
  z-index: ${(props) => props.order};
  position: absolute;
`;

const visibilitySensorOptions = {
  partialVisibility: true,
  minTopValue: 300,
};

export const StaggeredBrand = () => {
  const [visible, setVisible] = useState(null);
  return (
    <VisibilitySensor
      onChange={(newVal) => {
        if (newVal) {
          setVisible(newVal);
        }
      }}
      {...visibilitySensorOptions}
    >
      <StaggerFadeIn visible={visible}>
        <TextBrandContainer color="#8ECBD6" index={0} order={3}>
          <TextBrand />
        </TextBrandContainer>
        <TextBrandContainer color="#BF1636" index={1} order={2}>
          <TextBrand />
        </TextBrandContainer>
        <TextBrandContainer color="#fff" index={2} order={1}>
          <TextBrand />
        </TextBrandContainer>
      </StaggerFadeIn>
    </VisibilitySensor>
  );
};

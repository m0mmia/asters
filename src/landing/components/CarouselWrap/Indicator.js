import styled from "styled-components";
import React from "react";
import { media, proportional } from "../../../../utils";

const IndicatorWrap = styled.div.attrs({
  width: [245, 609],
  marginTop: [31, 44],
})`
  margin: 0 auto;
  z-index: 10;
  ${proportional};
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ${media("l")} {
    position: relative;
    transform: translateX(0);
    left: 0;
  }
`;
const Indicator = styled.div.attrs({
  height: [2, 4],
  marginRight: [7.28, 18.04],
})`
  ${proportional};
  flex: 1;
  opacity: ${(props) => (props.active ? 1 : 0.2)};
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.color};
  display: inline-block;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

export default ({ activeIndex, color, amountOfSlides = 4, onSelectIndex }) => {
  const slidesArray = Array(amountOfSlides).fill(undefined);
  return (
    <IndicatorWrap>
      {slidesArray.map((contents, index) => {
        return (
          <Indicator
            key={index}
            onClick={() => onSelectIndex(index)}
            color={color}
            active={activeIndex === index}
          />
        );
      })}
    </IndicatorWrap>
  );
};

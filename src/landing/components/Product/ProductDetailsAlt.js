import React from "react";
import styled from "styled-components";
import { proportional } from "../../../../utils";
import ShopNow from "../CallToAction/ShopNow";
import { Text6 } from "../Text";

const DetailsWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Arrow = styled.div`
  display: inline-block;
`;

const LeftDisplay = styled.div.attrs({ width: [157, 163] })`
  ${proportional};
  position: absolute;
  left: 0;
  top: 0;
`;
const LeftRelative = styled.div.attrs({ width: [157, 163] })`
  ${proportional};
  pointer-events: none;
`;
const RightDisplay = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const Text = styled(Text6)`
  color: #4a4b53;
  text-transform: uppercase;
`;
const Name = styled(Text)`
  color: #747474;
`;

export default ({ product, active }) => {
  const { name, price } = product;
  return (
    <DetailsWrap>
      <LeftRelative>
        <Text>Karl Kani</Text>
        <Name>{name}</Name>
      </LeftRelative>

      {/* {!active && (
        <LeftDisplay>
          <Text>Karl Kani</Text>
          <Name>{name}</Name>
        </LeftDisplay>
      )} */}
      {active && (
        <LeftDisplay>
          <ShopNow variant="p6" />
        </LeftDisplay>
      )}

      <RightDisplay>
        <Text>{price}</Text>
      </RightDisplay>
    </DetailsWrap>
  );
};

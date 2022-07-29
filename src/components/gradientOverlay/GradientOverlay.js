import React from "react";
import styled from "styled-components";
import { proportional } from "../../utils";

const GradientOverlay = styled.div.attrs({ height: [243, 242] })`
  ${proportional};
  top: 0;
  left: 0;
  width: 100vw;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) -325%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;
  position: absolute;
  z-index: 20;
`;

export default () => {
  return <GradientOverlay />;
};

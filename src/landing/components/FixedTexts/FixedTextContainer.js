import React from "react";
import styled from "styled-components";
import { proportional, media } from "../../../../utils";

const Container = styled.div.attrs({
  width: [180, 500],
})`
  ${proportional};
  color: white;
  position: fixed;
  opacity: 0;
  left: ${(38 / 375) * 100}vw;
  bottom: ${(40 / 375) * 100}vw;
  z-index: 4;

  ${media("l")} {
    left: ${(82 / 1440) * 100}vw;
    top: ${(304 / 1440) * 100}vw;
    bottom: auto;
  }

  ${media("xl")} {
    left: 50%;
    top: 164px;
    transform: translateX(-638px);
  }
`;

export default React.forwardRef(({ children }, ref) => {
  return <Container ref={ref}>{children}</Container>;
});

import React from "react";
import styled from "styled-components";
import { media } from "../../utils";
import { AspectRatio } from "../aspectratio";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${(30 / 750) * 100}vw;

  ${media("l")} {
    padding: 0 ${(21 / 1440) * 100}vw;
  }

  ${media("xl")} {
    padding: 0 21px;
  }
`;

const Container = styled.a`
  display: block;
  outline: none;
  width: 100%;
  text-decoration: none;

  &:first-child ${Wrapper} {
    padding-left: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: ${(36 / 750) * 100}vw;
  margin-bottom: ${(60 / 750) * 100}vw;

  ${media("l")} {
    margin-top: ${(34 / 1440) * 100}vw;
    margin-bottom: ${(38 / 1440) * 100}vw;
  }

  ${media("xl")} {
    margin-top: 34px;
    margin-bottom: 38px;
  }
`;

const Image = styled(AspectRatio).attrs({
  ratio: 100,
})`
  width: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

export function ProductItem({ src, href, children }) {
  return (
    <Container href={href}>
      <Wrapper>
        <Image src={src} />
        <Footer>{children}</Footer>
      </Wrapper>
    </Container>
  );
}

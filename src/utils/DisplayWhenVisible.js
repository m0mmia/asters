import React, { useState } from "react";
import styled from "styled-components";


const Container = styled.div``;

const VisiblePart = styled.div`
  width: 100vw;
  height: 1px;
  margin-top: -800px;
  padding-top: 800px;
`;


export function DisplayWhenVisible({ children }) {

  return (
    <Container>
      <VisiblePart />
      {children}
    </Container>
  );
}

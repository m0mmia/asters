import styled from "styled-components";

export const AspectRatio = styled.div`
  &:before {
    content: "";
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: ${(props) => (props.ratio ? props.ratio : 100)}%;
  }

  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

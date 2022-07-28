import styled from "styled-components";
import { proportional } from "../../../../utils";
import { H } from "./Heading";

const Title1 = styled(H).attrs({ variant: "h1", marginBottom: [10] })`
  text-transform: uppercase;
  ${proportional};
`;
const Title2 = styled(H).attrs({ variant: "h2" })``;
const Title3 = styled(H).attrs({ variant: "h3" })``;
const Title3Alt = styled(H).attrs({ variant: "h3alt" })``;
const Title4 = styled(H).attrs({ variant: "h4" })``;
const Title5 = styled(H).attrs({ variant: "h5" })``;
const Title6 = styled(H).attrs({ variant: "h6" })``;
const Title7 = styled(H).attrs({ variant: "rMedium" })``;
const Title8 = styled(H).attrs({ variant: "blackSmall" })``;

const TitleScaling = styled(H).attrs({
  variant: "h1scaling",
  marginBottom: [10],
})`
  text-transform: uppercase;
  ${proportional};
`;

export {
  Title1,
  Title2,
  Title3,
  Title3Alt,
  Title4,
  Title5,
  Title6,
  Title7,
  Title8,
  TitleScaling,
};

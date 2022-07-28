import styled from "styled-components";
import { color, typography, variant } from "styled-system";

// TODO: update mobile styles
export const Paragraph = styled.p`
  ${typography}

  margin: 0;

  ${variant({
    variants: {
      p1: {
        fontSize: [`${(12 / 375) * 100}vw`, `${(16 / 1440) * 100}vw`, "16px"],
        lineHeight: [`${(18 / 375) * 100}vw`, `${(28 / 1440) * 100}vw`, "28px"],
        fontFamily: "Roboto",
        fontWeight: 400,
        color: "black",
      },
      p2: {
        fontSize: [`${(12 / 375) * 100}vw`, `${(15 / 1440) * 100}vw`, "15px"],
        lineHeight: [`${(18 / 375) * 100}vw`, `${(18 / 1440) * 100}vw`, "18px"],
        fontFamily: "Roboto",
        fontWeight: 400,
        color: "white",
      },
      p3: {
        fontSize: [`${(12 / 375) * 100}vw`, `${(12 / 1440) * 100}vw`, "13px"],
        lineHeight: [`${(17 / 375) * 100}vw`, `${(17 / 1440) * 100}vw`, "17px"],
        fontFamily: "Roboto",
        fontWeight: 400,
        color: "black",
      },
      p4: {
        fontSize: [`${(11 / 375) * 100}vw`, `${(11 / 1440) * 100}vw`, "11px"],
        lineHeight: [`${(13 / 375) * 100}vw`, `${(13 / 1440) * 100}vw`, "13px"],
        fontFamily: "Roboto",
        fontWeight: 400,
        color: "black",
      },
      // static in size mobile / desktop
      p5: {
        fontSize: [`${(15 / 375) * 100}vw`, `${(15 / 1440) * 100}vw`, "15px"],
        lineHeight: [`${(14 / 375) * 100}vw`, `${(14 / 1440) * 100}vw`, "14px"],
        fontFamily: "Roboto",
        fontWeight: 400,
        color: "black",
      },
      p6: {
        fontSize: [`${(12 / 375) * 100}vw`, `${(12 / 1440) * 100}vw`, "12px"],
        lineHeight: [`${(17 / 375) * 100}vw`, `${(17 / 1440) * 100}vw`, "17px"],
        fontFamily: "Roboto",
        fontWeight: 700,
        color: "black",
      },
    },
  })}

  ${color}
`;

export const P = Paragraph;

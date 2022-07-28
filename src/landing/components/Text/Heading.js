import styled from "styled-components";
import { variant, color, typography } from "styled-system";

// TODO: update mobile styles
export const Component = styled.h2`
  ${typography}
  ${color}

  margin: 0;

  ${variant({
    variants: {
      h1: {
        fontSize: [
          `${(40.32 / 320) * 100}vw`,
          `${(150 / 1440) * 100}vw`,
          "150px",
        ],
        lineHeight: [
          `${(30 / 320) * 100}vw`,
          `${(110 / 1440) * 100}vw`,
          "110px",
        ],
        letterSpacing: [
          `${(-1.86 / 320) * 100}vw`,
          `${(-6.9 / 1440) * 100}vw`,
          "-6.9px",
        ],
        fontFamily: "Roboto",
        fontWeight: 900,
        color: "black",
      },
      h2: {
        fontSize: [
          `${(36.29 / 320) * 100}vw`,
          `${(134.4 / 1440) * 100}vw`,
          "134.4px",
        ],
        lineHeight: [
          `${(28 / 320) * 100}vw`,
          `${(106 / 1440) * 100}vw`,
          "106px",
        ],
        letterSpacing: [
          `${(-1.19 / 320) * 100}vw`,
          `${(-4.42 / 1440) * 100}vw`,
          "-4.42px",
        ],
        fontFamily: "Roboto",
        fontWeight: 900,
        color: "black",
      },
      h3: {
        fontSize: [`${(32 / 320) * 100}vw`, `${(84 / 1440) * 100}vw`, "84px"],
        lineHeight: [`${(26 / 320) * 100}vw`, `${(68 / 1440) * 100}vw`, "68px"],
        letterSpacing: [
          `${(-1.14 / 320) * 100}vw`,
          `${(-3 / 1440) * 100}vw`,
          "-3px",
        ],
        fontFamily: "Roboto",
        fontWeight: 900,
        color: "white",
        textTransform: "uppercase",
      },
      h3alt: {
        fontSize: [`${(50.4 / 320) * 100}vw`, `${(84 / 1440) * 100}vw`, "84px"],
        lineHeight: [`${(40 / 320) * 100}vw`, `${(68 / 1440) * 100}vw`, "68px"],
        letterSpacing: [, `${(-3 / 1440) * 100}vw`, "-3px"],
        fontFamily: "Roboto",
        fontWeight: 900,
        color: "black",
      },
      h4: {
        fontSize: [`${(32 / 320) * 100}vw`, `${(52 / 1440) * 100}vw`, "52px"],
        lineHeight: [`${(26 / 320) * 100}vw`, `${(44 / 1440) * 100}vw`, "44px"],
        letterSpacing: [
          `${(-1.14 / 320) * 100}vw`,
          `${(-1.86 / 1440) * 100}vw`,

          "-1.86px",
        ],
        fontFamily: "Roboto",
        fontWeight: 900,
        color: "white",
      },
      h5: {
        fontSize: [`${(32 / 320) * 100}vw`, `${(50 / 1440) * 100}vw`, "50px"],
        lineHeight: [`${(26 / 320) * 100}vw`, `${(42 / 1440) * 100}vw`, "42px"],
        letterSpacing: [
          `${(-1.14 / 320) * 100}vw`,
          `${(-1.86 / 1440) * 100}vw`,
          "-1.86px",
        ],
        fontFamily: "Roboto",
        fontWeight: 900,
        color: "black",
      },
      h6: {
        fontSize: [
          `${(14.05 / 320) * 100}vw`,
          `${(20.7 / 1440) * 100}vw`,
          "20.7px",
        ],
        lineHeight: [`${(16 / 320) * 100}vw`, `${(24 / 1440) * 100}vw`, "24px"],
        fontFamily: "Roboto",
        fontWeight: 400,
        color: "black",
      },
      rMedium: {
        fontSize: [`${(14.4 / 320) * 100}vw`, `${(24 / 1440) * 100}vw`, "24px"],
        lineHeight: [`${(25 / 320) * 100}vw`, `${(42 / 1440) * 100}vw`, "42px"],
        fontFamily: "Roboto",
        fontWeight: 500,
        color: "white",
      },
      blackSmall: {
        fontSize: [`${(20 / 320) * 100}vw`, `${(20 / 1440) * 100}vw`, "20px"],
        lineHeight: [`${(44 / 320) * 100}vw`, `${(44 / 1440) * 100}vw`, "44px"],
        letterSpacing: [
          `${(-0.66 / 320) * 100}vw`,
          `${(-0.66 / 1440) * 100}vw`,
          "-0.66px",
        ],
        fontFamily: "Roboto",
        fontWeight: 900,
        color: "black",
      },
      h1scaling: {
        fontSize: [
          `${(45 / 320) * 100}vw`,
          `${(140 / 1440) * 100}vw`,
          `${(140 / 1440) * 100}vw`,
        ],
        lineHeight: [
          `${(35 / 320) * 100}vw`,
          `${(100 / 1440) * 100}vw`,
          `${(100 / 1440) * 100}vw`,
        ],
        letterSpacing: [
          `${(-1.86 / 320) * 100}vw`,
          `${(-6.9 / 1440) * 100}vw`,
          `${(-6.9 / 1440) * 100}vw`,
        ],
        fontFamily: "Roboto",
        fontWeight: 900,
        color: "black",
      },
    },
  })}
`;

const Heading = Component;

export const H = Heading;

import React, { useRef, useEffect } from "react";
import { assetUrl, getIsMobileWidth, proportional } from "../../utils";
import {
  ResponsiveImageBlock,
  ImageContainer,
} from "../components/ResponsiveImageBlock";
import { AnimatedWrapper } from "../components/AnimatingWrapping";
import styled from "styled-components";
import { StaggeredBrand } from "./DecoElements/StaggeredBrand";
import gsap from "gsap";
import { HoverText, StaticMobile } from "./HoverText";

const gridImages = [
  {
    id: "image1",
    right: [0, -97],
    top: [0, 0],
    height: [221, 396],
    width: [169, 594],
    mobileImage: "/images/karlkani2/grid_1.jpg",
    image: "/images/karlkani2/grid_1.jpg",
    order: 2,
    yEnd: [30, 100],
    yStart: [-30, 0],
  },
  {
    id: "image2",
    right: [0, 296.83],
    top: [403, 528.9],
    height: [179, 475],
    width: [181, 422],
    mobileImage: "/images/karlkani2/grid_2.jpg",
    image: "/images/karlkani2/grid_2.jpg",
    order: 2,
    yEnd: [-60, -200],
    yStart: [60, 200],
  },
  {
    id: "image3",
    right: [-55, 78],
    top: [553, 724],
    height: [131, 301],
    width: [131, 301],
    mobileImage: "/images/karlkani2/grid_3.jpg",
    image: "/images/karlkani2/grid_3.jpg",
    order: 1,
    yStart: [30, 0],
    yEnd: [0, 100],
  },
  {
    id: "image4",
    right: [0, 0],
    top: [691, 1209],
    height: [211, 742],
    width: [140.74, 494.94],
    mobileImage: "/images/karlkani2/grid_4.jpg",
    image: "/images/karlkani2/grid_4.jpg",
    order: 2,
    yEnd: [-30, -180],
    yStart: [30, 180],
  },
  {
    id: "image5",
    right: [0, 269.1],
    top: [911, 1643],
    height: [222, 567],
    width: [161, 410],
    mobileImage: "/images/karlkani2/grid_5.jpg",
    image: "/images/karlkani2/grid_5.jpg",
    order: 1,
    yEnd: [0, 90],
    yStart: [0, 0],
  },
  {
    id: "image6",
    right: [0, 81],
    top: [1100, 1907],
    height: [147, 399],
    width: [113, 305],
    mobileImage: "/images/karlkani2/grid_6.jpg",
    image: "/images/karlkani2/grid_6.jpg",
    order: 2,
    yEnd: [-60, 130],
    yStart: [60, 0],
  },
];

const Container = styled.div``;

const GridImage = styled(ImageContainer)`
  position: absolute;
`;

const BrandContainer = styled.div.attrs({
  right: [17.81, 86.5],
  top: [320, 720],
})`
  ${proportional};
  position: absolute;
  z-index: 4;
`;

const BrandContainerInner = styled.div.attrs()`
  width: 100%;
  height: 100%;
  position: relative;
`;

const GridImageContainer = styled(GridImage).attrs((props) => ({
  width: props.width,
  height: props.height,
  top: props.top,
  right: props.right,
}))`
  ${proportional};
  z-index: ${(props) => props.order};
  opacity: 0;
`;

const HoverTextContainer = styled(ImageContainer).attrs({
  right: [0, 0],
  top: [691, 1209],
  height: [211, 742],
  width: [140.74, 494.94],
})`
  ${proportional};
  position: absolute;
  z-index: 20;
  color: white;
`;

export default React.memo(() => {
  const containerRef = useRef();
  const isMobile = getIsMobileWidth();

  useEffect(() => {
    gsap.fromTo(
      containerRef.current.children,
      1,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 0.6,
        y: 0,
        ease: "power4.out",
        stagger: 0.5,
      }
    );
  }, []);

  return (
    <Container ref={containerRef}>
      <HoverTextContainer>
        <AnimatedWrapper
          transitions={{
            variant: "vertical",
            yStart: isMobile ? 30 : 180,
            yEnd: isMobile ? -30 : -180,
          }}
        >
          <HoverText circle="KARL KANI CAMO OVERSHIRT" letterSpacing="18px" />
          <StaticMobile
            circle="KARL KANI CAMO OVERSHIRT"
            letterSpacing="18px"
          />
        </AnimatedWrapper>
      </HoverTextContainer>

      {gridImages.map((gridImage) => {
        const {
          right,
          top,
          height,
          width,
          mobileImage,
          image,
          order,
          id,
        } = gridImage;
        return (
          <GridImageContainer
            key={id}
            order={order}
            right={right}
            top={top}
            height={height}
            width={width}
          >
            <AnimatedWrapper
              transitions={{
                variant: "vertical",
                yStart: isMobile ? gridImage.yStart[0] : gridImage.yStart[1],
                yEnd: isMobile ? gridImage.yEnd[0] : gridImage.yEnd[1],
              }}
            >
              <ResponsiveImageBlock
                imageMobile={`${assetUrl(mobileImage)}`}
                image={`${assetUrl(image)}`}
              />
            </AnimatedWrapper>
          </GridImageContainer>
        );
      })}
    </Container>
  );
});

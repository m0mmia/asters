import React, { useState, useEffect } from "react";
import { useTranslation, useProduct } from "../../../hooks";
import { getSiteCurrency } from "../../../../i18n/siteContext";
import {
  apparelEu,
  shoesEu,
  apparelCh,
  shoesCh,
} from "../../../../data/products/jordanxi";
import {
  ProductCategory,
  CategorySection,
  UgcGrid,
  ProductItem,
  P,
} from "../components";
import styled from "styled-components";
import { getIsMobileWidth, media, proportional } from "../../../utils";

const SectionWithBackground = styled.section.attrs({
  top: [-1100, -400],
  marginBottom: [-1100, -400],
  marginTop: [1300,1300]
})`
  ${proportional}
  background-color: white;
  position: relative;
`;

const Container = styled.div.attrs({ width: [, 1164] })`
  ${proportional}
  margin: 0 auto;
  overflow: hidden;
`;

const Title = styled(P)`
  display: flex;
  flex: 1;
  color: black;
  text-transform: uppercase;
`;

const Price = styled(P)`
  display: flex;
  justify-content: flex-end;
  color: black;

  ${media("l")} {
    width: ${(108 / 1440) * 100}vw;
  }

  ${media("xl")} {
    width: 108px;
  }
`;

const BrandContainer = styled.div.attrs({
  width: [96, 126],
  height: [146, 198],
  marginBottom: [41, 107],
})`
  ${proportional}
`;

function Product({ href, image, name, price }) {
  return (
    <ProductItem href={href} src={image}>
      <Title variant="p3">{name}</Title>
      <Price variant="p3Thin">{price}</Price>
    </ProductItem>
  );
}

export const Footer = () => {
  const t = useTranslation();
  const propsFromProduct = useProduct();
  const shoes = getSiteCurrency() == "eu" ? shoesEu : shoesCh;
  const apparel = getSiteCurrency() == "eu" ? apparelEu : apparelCh;
  const [isMobile, setIsMobile] = useState(getIsMobileWidth());

  const onResize = () => {
      setIsMobile(getIsMobileWidth())
  }
  
  const addDomEvents = () => {
      window.addEventListener("resize", onResize);
    };
  
  const removeDomEvents = () => {
      window.removeEventListener("resize", onResize);
  };
  


  useEffect(() => {
      addDomEvents();
      return () => {
          removeDomEvents();
      };
  }, []);
  
  return (
    <SectionWithBackground>
      <Container>
        <CategorySection>
          <ProductCategory>
            {shoes.map((data) => {
              return <Product {...propsFromProduct(data)} />;
            })}
          </ProductCategory>
        </CategorySection>

       <UgcGrid isMobile={isMobile} />
      </Container>
    </SectionWithBackground>
  );
};

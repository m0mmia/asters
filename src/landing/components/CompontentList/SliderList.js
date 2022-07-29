import React, { useState } from "react";
import styled from "styled-components";
import { useProduct } from "../../../hooks";
import { getIsMobileWidth, proportional } from "../../../utils";
import { itemsEu, itemsCh } from "../../../../data/products/karlkani";
import { getSiteCurrency } from "../../../../i18n/siteContext";
import { Slide, ProductCard } from "../Product";

import CarouselWrapper from "../CarouselWrap/CarouselWrapper";

const CarouselSlide = styled.div.attrs({marginRight: [12.35,19.22]})`
    ${proportional};
`

const CarouselWrapperPreviewNoCrop = styled.div.attrs({marginLeft: [45, 80.54]})`
    ${proportional};
    margin-bottom: 50px;
`

const CarouselWrapperPreview = styled.div.attrs({})`
    ${proportional};
    margin-bottom: 50px;

`

const CarouselWrapperProductsPreview = styled.div.attrs({})`
    ${proportional};
    margin-bottom: 50px;

`

const CarouselWrapperProductsPreviewCropped = styled.div.attrs({marginLeft: [57, 0], width: [,611]})`
    ${proportional};
    margin-bottom: 50px;

`

export default () => { 
    const propsFromProduct = useProduct();
    const items = getSiteCurrency() == "eu" ? itemsEu : itemsCh;
    const [productActive, setProductActive] = useState(false);

    return (
        <div>
            <hr/>
                <h2>sliders:</h2>
                <p> - the carouselWrapper is a configurable component, and will reduce the amount of work required to setup a slider</p>
                <p> - the component uses Carousel.js for the slide and crop logic</p>
                <p> - the slider inherits it's width from it's container</p>

                <CarouselWrapperPreview>
                    <CarouselWrapper crop={false}>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[0])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[3])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[3])}}/>
                        </CarouselSlide>
                    </CarouselWrapper>
                </CarouselWrapperPreview>
                <p> - not full width with crop enabled gives us the following result (scroll to see)</p>

                <CarouselWrapperPreviewNoCrop>
                    <CarouselWrapper crop={true}>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[0])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[3])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[3])}}/>
                        </CarouselSlide>
                    </CarouselWrapper>
                </CarouselWrapperPreviewNoCrop>
                <p> - not full width with crop disabled gives us the following result (scroll to see)</p>
                <CarouselWrapperPreviewNoCrop>
                    <CarouselWrapper crop={false}>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[0])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[3])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <Slide active={productActive}  product={{...propsFromProduct(items[3])}}/>
                        </CarouselSlide>
                    </CarouselWrapper>
                </CarouselWrapperPreviewNoCrop>
                <p> - The slider also got a little smarter, instead of having slide styling in the carousel it bases it on it's children</p>
                <p> allowing us to populate the carousel with whatever we want :) as long as the slides remain equal in width</p>
                <p> - So to get the slider into this state, is just a matter of giving it other child elements</p>

                <CarouselWrapperProductsPreview>
                    <CarouselWrapper crop={false}>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[0])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[3])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[0])}}/>
                        </CarouselSlide>
                    </CarouselWrapper>
                </CarouselWrapperProductsPreview>
                <p> - and to get it to this state, simply change the crop prop to true, and change the container width</p>
                <p> - in this case we only want it to crop when not on mobile</p>
                <p> - note, I'm sorry I'm to lazy to fix a resize handler for this right now, so refresh to see the result in different view</p>

                <CarouselWrapperProductsPreviewCropped>
                    <CarouselWrapper crop={!getIsMobileWidth()}>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[0])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[3])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[1])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[2])}}/>
                        </CarouselSlide>
                        <CarouselSlide>
                            <ProductCard active={false}  product={{...propsFromProduct(items[0])}}/>
                        </CarouselSlide>
                    </CarouselWrapper>
                </CarouselWrapperProductsPreviewCropped>
            <hr/>

        </div>
    );
}

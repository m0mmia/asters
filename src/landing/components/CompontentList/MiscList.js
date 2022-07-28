import React, { useState } from "react";
import styled from "styled-components";
import { useProduct } from "../../../../hooks";
import { proportional } from "../../../../utils";
import {CallToAction, ShopNow} from "../CallToAction";
import { itemsEu, itemsCh } from "../../../../data/products/karlkani";
import { getSiteCurrency } from "../../../../i18n/siteContext";
import Brand from "../BottomBrand/Brand";
import { Slide, ProductCard, ProductDetails } from "../Product";

const ProductDetailsPreview = styled.div.attrs({width: [259, 413], paddingLeft: [25,39], paddingBottom: [15, 30], paddingRight: [16,46]})`
    ${proportional}
    padding-top: 40px;
`
const BrandContainer = styled.div.attrs({width: [27.90, 41.88]})`
    ${proportional};
`

export default () => { 
    const propsFromProduct = useProduct();
    const items = getSiteCurrency() == "eu" ? itemsEu : itemsCh;
    const [productActive, setProductActive] = useState(false);
    return (
        <div>
            <h2>Misc:</h2>
            <hr/>
                <h3>shopnow text:</h3>
                <ShopNow variant='p5'/>
                <ShopNow variant='p6'/>
            <hr/>
            <hr/>
                <h3>Call To action button:</h3>
                <CallToAction>Shop now</CallToAction>
            <hr/>
            <hr/>
                <h3>product details:</h3>
                <p>example made with ratio of the slider @ more colourways</p>
                <ProductDetailsPreview onMouseEnter={() => {setProductActive(true)}} onMouseLeave={() => {setProductActive(false)}}>
                    <ProductDetails active={productActive}  product={{...propsFromProduct(items[0])}}/>
                </ProductDetailsPreview>
            <hr/>

            <hr/>
                <h3>Karl Kani Brand:</h3>
                <BrandContainer><Brand color={'#000'}/></BrandContainer>
            <hr/>

            <hr/>
                <h3>product card:</h3>
                <p>the card size doesn't seem to be just a little to broad</p>
                <p>see how it look with the background</p>
                <ProductCard active={false}  product={{...propsFromProduct(items[0])}}/>
            <hr/>
            <hr/>
                <h3>slide:</h3>
                <Slide active={productActive}  product={{...propsFromProduct(items[0])}}/>
            <hr/>


        </div>
    );
}

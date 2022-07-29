import React, {useState} from "react";
import styled from 'styled-components';
import { proportional } from "../../../utils";
import { TextWrapper } from "../AnimatingWrapping";
import { BottomBrand } from "../BottomBrand/BottomBrand";
import { ScrollIndicator } from "../ScrollIndicator";
import { Title1 } from "../Text";

const BrandPreview = styled.div`
    background: grey;
    cursor: 'pointer';
`

const IndicatorPreview = styled.div.attrs({paddingTop: [80,80], paddingBottom: [150, 180]})`
    cursor: 'pointer';
    ${proportional};
    position: relative;
`

const RightText = styled(Title1).attrs({marginLeft: [516,516]})`
    ${proportional};
`


export default () => {
    const [currentTheme, setCurrentTheme] = useState('light');

    const childTransitions = {xStart1: "145", xEnd1: "-245",xStart2: "150", xEnd2: "-280", yStart1: '-100', yEnd1: '100', yStart2: '-100', yEnd2: '100'}
    return (
        <div>
            <h2>Discover the new karl kani:</h2>
            <hr/>
                <h3>brand:</h3>
                <BrandPreview  onClick={() => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}>
                    <BottomBrand currentTheme={currentTheme}/>
                </BrandPreview>
            <hr/>
            <hr/>
            <IndicatorPreview>
                <h3>Scroll indicator:</h3>
                <ScrollIndicator/>
            </IndicatorPreview>
            <hr/>
            <hr/>
                <h3>Text:</h3>
                
                <TextWrapper entrance="popUp" transitions={{variant:'horizontal-children', xStart: "100vw", xEnd: "-100vw", yStart: "100", yEnd: "-100", childTransitions}}>
                    <Title1>
                        Discover the new 
                    </Title1> 
                    <RightText>
                        Karl Kani ‘89
                    </RightText> 
                </TextWrapper>
            <hr/>
        </div>
    );
}

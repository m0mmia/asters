import React, {useState} from "react";
import styled from 'styled-components';
import { proportional } from "../../../utils";
import { TextWrapper } from "../AnimatingWrapping";
import { Title3 } from "../Text";


const TheNewKarlKani = styled(Title3).attrs({width: [,403,55]})`
    cursor: 'pointer';
    ${proportional};
    position: relative;
`

export default () => {

    const childTransitions = {xStart1: "0", xEnd1: "30",xStart2: "0", xEnd2: "30", yStart1: '-100', yEnd1: '100', yStart2: '-100', yEnd2: '100'}
    return (
        <div>
            <h2>the new karl kani:</h2>

            <hr/>
                <h3>Text:</h3>
                
                <TextWrapper transitions={{variant:'horizontal-children', xStart: "30px", xEnd: "0", yStart: "100", yEnd: "-100", childTransitions}}>
                <TheNewKarlKani>
                    THE NEW KARL KANI ‘89
                </TheNewKarlKani> 
                </TextWrapper>
            <hr/>
        </div>
    );
}

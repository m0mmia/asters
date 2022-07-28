import gsap, {Linear} from 'gsap/gsap-core';
import React, { useRef, useState } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';
import styled from 'styled-components';
import { proportional } from '../../../../utils';
import {ShopNow} from './index';

const CallToActionWrap = styled.div.attrs({paddingLeft: [20,20], paddingRight: [31,31], paddingTop: [15,21], paddingBottom: [15,21]})`
    ${proportional};
    /* border: 1px solid currentColor; */
    display: inline-block;
    cursor: pointer;
    position: relative;
    overflow: hidden;
`

const BorderDiv = styled.div`
    opacity: 0;
    border: 1px solid currentColor;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

const doDefault = (ref) => {
    gsap.to(ref.current, {
        delay: 0.1,
        duration: 0.3,
        opacity: 1,
        ease: Linear.easeInOut,
      });
  }


const visibilitySensorOptions = {
    partialVisibility: true,
    minTopValue: 100,
};

export default ({children}) => {
    const [hovered, setHovered] = useState(false);
    const borderRef = useRef(null)
    const display = (newVal) => {
        if (newVal) {
          if (!borderRef.current) {
            return;
          }
          else {
            doDefault(borderRef)
          }
        }
        else {
            gsap.set(borderRef.current, {opacity: 0})
        }
      };
    
    const onSetHovered = () => {
        setHovered(true)
    }
    const onSetNotHovered = () => {
        setHovered(false); 
    }
    return <CallToActionWrap onMouseLeave={onSetNotHovered} onMouseEnter={onSetHovered}>
        <ReactVisibilitySensor
            onChange={(newVal) => {
                display(newVal);
            }}
            {...visibilitySensorOptions}
        >
               <BorderDiv ref={borderRef}/>
        </ReactVisibilitySensor>
            <ShopNow hovered={hovered} variant="p5">{children}</ShopNow>
        </CallToActionWrap>
}
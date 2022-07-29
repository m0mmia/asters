import gsap, {Linear} from 'gsap/gsap-core';
import React, { useEffect, useRef, useState } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';
import styled from 'styled-components';
import { proportional } from '../../../utils';
import { AnimatedArrow } from '../DecoElements';
import { P } from '../Text/Paragraph';


const visibilitySensorOptions = {
    partialVisibility: true,
    minTopValue: 75,
  };

const TextWrap = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
`

const Arrow = styled.div`
    display: inline-block;
 
`

const Text = styled(P).attrs({marginRight: [20, 20]})`
    ${proportional};
    text-transform: uppercase;
    user-select: none;
    
`
const doDefault = (ref) => {
    gsap.to(ref.current, {
        delay: 0.2,
        duration: 0.4,
        opacity: 1,
        ease: Linear.easeInOut,
      });
  }



export default ({variant, children, hovered=false, active=true}) => {
    const content = children || 'shop now';
    const textRef = useRef(null)
    const [displayArrow, setDisplayArrow] = useState(false)
    const timelineRef = useRef(null);


    const notHoveredTl = () => {
        const tl = gsap.timeline({});

        tl.to(textRef.current, {x: 0, duration: 0.6}, 0);

        return tl
    }

    const hoveredTL = () => {
        const tl = gsap.timeline({});
        tl.to(textRef.current, {x: 15, duration: 0.6}, 0);

        return tl
    }

    useEffect(() => {
        if(hovered) {
            timelineRef.current = hoveredTL();
        } else {
            timelineRef.current = notHoveredTl();
        }

    }, [hovered])

    const display = (newVal) => {
        if (newVal) {
          if (!textRef.current) {
            return;
          }
          else {
            setDisplayArrow(true)
            doDefault(textRef)
          }
        }
        else {
            setDisplayArrow(false)
            gsap.set(textRef.current, {opacity: 0})
        }
      };
    

    return (<ReactVisibilitySensor
            onChange={(newVal) => {
                display(newVal);
            }}
            {...visibilitySensorOptions}
        >
        <TextWrap> 
            {displayArrow && <Arrow>
                <AnimatedArrow active={false} hovered={hovered}/>
            </Arrow>}   
                <Text ref={textRef} variant={variant}>{content}</Text>
            {displayArrow && <Arrow>
                <AnimatedArrow active={active} hovered={hovered}/>
            </Arrow>}
        </TextWrap>
    </ReactVisibilitySensor>
    )

}
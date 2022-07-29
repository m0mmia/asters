import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {proportional } from "../../../../utils";
import { gsap } from "gsap";
import ArrowSvg from "./ArrowSvg";

const Arrow = styled.div.attrs({height: [9,9], width: [11,11]})`
  ${proportional};
  position: absolute;
  top: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const SvgWrap = styled.div`
  position: relative;
  pointer-events: none;
  width: 100%;
  height: 100%;
  opacity: 0;
  > svg {
    position: absolute;
  }
`


export const Component = React.forwardRef(
  ({ color = "#000", active = false, hovered }, ref) => {
    const [initial, setInital] = useState(true);  
    const timeline = useRef(null);
    const arrowRef = useRef(null);
    const enterTimeLineRef = useRef(null);
    const leftTimeLineRef = useRef(null);
    const rightTimeLineRef = useRef(null);
    const opacityTimeLineRef = useRef(null);
    const rightTimelineRef = useRef(null);
    const leftTimelineRef = useRef(null);

    function activate() {
      timeline.current.play();
    }
    const fadeOut = () => {
      opacityTimeLineRef.current.reverse()
    }
    const fadeIn = () => {
      opacityTimeLineRef.current.play()
    }

    function leave() {
      fadeOut()
      enterTimeLineRef.current.reverse();
    }

    const enter = () => {
      fadeIn()
      enterTimeLineRef.current.play();
    }

    const goLeft = () => {
      leftTimeLineRef.current.reverse();
    }

    const goBackFromLeft = () => {
      leftTimeLineRef.current.play();
    }


    const goRight = () => {
      rightTimeLineRef.current.play();
    }

    const goBackFromRight = () => {
      rightTimeLineRef.current.reverse();
    }

    const createEnterTimeLine = () => {
      const tl = gsap.timeline({});
        tl.fromTo(arrowRef.current, {x: -5, duration: 1.3}, {x: 0}, 0)

      return tl
    }

    const createOpacityTimeLine = () => {
      const tl = gsap.timeline({});
      tl.to(arrowRef.current, {opacity: 1, duration: 0.6}, 0)
      return tl
    }

    const createToLeft = () => {
      const tl = gsap.timeline({});
      tl.fromTo(arrowRef.current, {x: -25, duration: 0.6}, {x: 0}, 0)

      return tl
    }

    const createToRight = () => {
      const tl = gsap.timeline({});
        tl.fromTo(arrowRef.current, {x: 0, duration: 0.6}, {x: 25}, 0)

      return tl
    }

    useEffect(() => {

      if(initial) {
        setInital(false)
        const enterTl = createEnterTimeLine();
        const opacityTl = createOpacityTimeLine();
        const leftTl = createToLeft();
        const rightTl = createToRight();
        enterTl.pause();
        leftTl.pause();
        rightTl.pause();
        opacityTl.pause();

        enterTimeLineRef.current = enterTl;
        rightTimeLineRef.current = rightTl;
        leftTimeLineRef.current = leftTl;
        opacityTimeLineRef.current = opacityTl;
       }  
       return () => {
         enterTimeLineRef.current?.kill();
         rightTimeLineRef.current?.kill();
         leftTimeLineRef.current?.kill();
         opacityTimeLineRef.current?.kill();
       }
    }, []);


    useEffect(() => {
      if(!arrowRef.current) {
          return
      }
      if(hovered) {
          if(active){
            fadeOut()
            goRight()
          } else {
            goBackFromLeft()
            fadeIn()
          }
      } else {
        if(active){
          goBackFromRight()
          fadeIn();
        } else {
          fadeOut()
          goLeft();
        }

      }
    }, [active, hovered])

    useEffect(() => {
        if(active) {
            enter()
        } else {
            leave();
        }
    }, [active])

    return (
        <Arrow>
            <SvgWrap ref={arrowRef}>
              <ArrowSvg />
            </SvgWrap>
        </Arrow>
    );
  }
);

export default styled(Component)``;

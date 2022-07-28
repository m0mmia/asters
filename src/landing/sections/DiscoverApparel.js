import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { assetUrl, media, proportional } from "../../../utils";
import { DiscoverCard } from "../components/DiscoverCard";
import { Title4, Text2 } from "../components/Text";
import FixedTextContainer from "../components/FixedTexts/FixedTextContainer";
import { RoadZero, RoadFirst, RoadSecond, RoadThird } from "../components/FixedTexts";

const SectionContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background: black;
  background-image: url(${assetUrl(`/images/karlkani2/background.jpg`)});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled(Title4).attrs({ marginBottom: [30, 33] })`
  ${proportional};
  text-transform: uppercase;
  color: #20c20e;
  position: relative;
  position: relative;
  top: -405px;
  left: 280px;
`;

const Text = styled(Text2).attrs({
  width: [180, 354],
  marginBottom: [30, 36],
})`
  ${proportional};
  color: #20c20e !important;
  position: relative;
  top: -380px;
  left: 800px;
`;

const AstersGlass = styled.img.attrs({
  width: [440, 1440],
})`
  ${proportional}

`;

var number = 1

export default () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible0, setIsVisible0] = useState(true);

  const switchRoadmap = () => {
    
      if(number === 0){
        setIsVisible3(false);
        setIsVisible1(false);
        setIsVisible2(false);
        setIsVisible0(true);
        number = 1
      }else if(number === 1){
        setIsVisible1(true);
        setIsVisible2(false);
        setIsVisible3(false);
        setIsVisible0(false);
        number = 2
      }else if(number === 2){
        setIsVisible1(false);
        setIsVisible2(true);
        setIsVisible3(false);
        setIsVisible0(false);
        number = 3
      }else if(number === 3){
        setIsVisible1(false);
        setIsVisible2(false);
        setIsVisible3(true);
        setIsVisible0(false);
        number = 0
      }
    };

  return (
    <SectionContainer>
        <AstersGlass onClick={switchRoadmap} src={assetUrl("/images/karlkani2/lentes-v1-hover.png")} />
        <RoadZero isVisible={isVisible0} > </RoadZero>
        <RoadFirst isVisible={isVisible1} > </RoadFirst>
        <RoadSecond isVisible={isVisible2} > </RoadSecond>
        <RoadThird isVisible={isVisible3} > </RoadThird>

        <svg style={{position: "relative",
    top: "-909px",
    transform: "scale(-1)",
    left: "294px"}}  width="168" height="113" viewBox="0 0 168 113" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M167.5 111.7H12.8L1.39999 100.3V22.3L22.8 0.900009H167.4" stroke="#A4FFAA" stroke-miterlimit="10"/>
        </svg>
        <svg style={{position: "relative",
    top: "-937px",
    
    left: "130px"}}   width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.89999 9.7H19.9" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M5.89999 13.3H13.5" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M5.89999 16.9H12" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M5.89999 20.5H21.8" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M5.89999 24.1H23.3" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M5.89999 27.7H10.1" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M33.5 32.7H1.29999V0.599998H29.3L33.5 4.8V32.7Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
        </svg>
        <svg style={{position: "relative",
    top: "-938px",
    
    left: "128px"}}   width="54" height="21" viewBox="0 0 54 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.2 9.29999H9.8" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M3.2 11H6.8" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M3.2 12.7H6" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M3.2 14.4H10.7" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M3.2 16.1H11.4" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M3.2 17.9H5.09999" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M16.2 20.3H1V5H12.1L16.3 9.2V20.3H16.2Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M21.3 14.4H26.3" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M21.3 16.1H29.6" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M21.3 17.9H26.1" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M34.4 20.3H19.2V5H30.3L34.5 9.2V20.3H34.4Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M39.5 11H43.1" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M39.5 12.7H41.5" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M39.5 14.4H41.1" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M39.5 16.1H43.6" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M39.5 17.8H44" stroke="#A4FFAA" stroke-width="0.5" stroke-miterlimit="10"/>
          <path d="M52.6 20.3H37.3V5H48.4L52.6 9.2V20.3Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M9.8 1.10001L8.3 2.70001L6.7 1.10001" stroke="#A4FFAA" stroke-miterlimit="10"/>
        </svg>
        <svg style={{position: "relative",
    top: "-1040px",
    
    left: "28px"}}   width="9" height="42" viewBox="0 0 9 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.899994 35.4V38.3L3.39999 40.8H7.59999V34.9H3.29999" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M0.899994 26.8V29.7L3.39999 32.2H7.59999V26.3H3.29999" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M0.899994 18.2V21.1L3.39999 23.6H7.59999V17.7H3.29999" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path opacity="0.1" d="M0.899994 9.60001V12.5L3.39999 15H7.59999V9.10001H3.29999" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M0.899994 1V3.9L3.39999 6.4H7.59999V0.5H3.29999" stroke="#A4FFAA" stroke-miterlimit="10"/>
        </svg>
        <svg style={{position: "relative",
    top: "-1197px",
    
    left: "300px"}}   width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.3 22.2C17.2095 22.2 22 17.4094 22 11.5C22 5.59055 17.2095 0.800003 11.3 0.800003C5.39056 0.800003 0.600006 5.59055 0.600006 11.5C0.600006 17.4094 5.39056 22.2 11.3 22.2Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M11.3 17C14.3376 17 16.8 14.5376 16.8 11.5C16.8 8.46243 14.3376 6 11.3 6C8.26244 6 5.8 8.46243 5.8 11.5C5.8 14.5376 8.26244 17 11.3 17Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
          <path d="M7.10001 11.5H15.4" stroke="#A4FFAA" stroke-miterlimit="10"/>
        </svg>
        <svg style={{position: "relative",
    top: "-1200px",
    
    left: "310px"}}   width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.10001 7.89999L7.70001 1.29999" stroke="#A4FFAA" stroke-miterlimit="10"/>
        </svg>
        <svg style={{position: "relative",
    top: "-1200px",
    
    left: "310px"}}   width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 10.1C7.98528 10.1 10 8.08529 10 5.60001C10 3.11472 7.98528 1.10001 5.5 1.10001C3.01472 1.10001 1 3.11472 1 5.60001C1 8.08529 3.01472 10.1 5.5 10.1Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
        </svg>

        <svg style={{position: "relative",
    top: "-1200px",
    
    left: "310px"}}   width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.90001 6.70001C5.61209 6.70001 7 5.31209 7 3.60001C7 1.88792 5.61209 0.5 3.90001 0.5C2.18792 0.5 0.800003 1.88792 0.800003 3.60001C0.800003 5.31209 2.18792 6.70001 3.90001 6.70001Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M2.7 4.79999L5.19999 2.29999" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>


<svg style={{position: "relative",
    top: "-1200px",
    
    left: "310px"}}   width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.90001 6.70001C5.61209 6.70001 7 5.31209 7 3.60001C7 1.88792 5.61209 0.5 3.90001 0.5C2.18792 0.5 0.800003 1.88792 0.800003 3.60001C0.800003 5.31209 2.18792 6.70001 3.90001 6.70001Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M2.7 4.79999L5.19999 2.29999" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>


<svg style={{position: "relative",
    top: "-1200px",
    
    left: "310px"}}   width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.90001 6.70001C5.61209 6.70001 7 5.31209 7 3.60001C7 1.88792 5.61209 0.5 3.90001 0.5C2.18792 0.5 0.800003 1.88792 0.800003 3.60001C0.800003 5.31209 2.18792 6.70001 3.90001 6.70001Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M2.7 4.79999L5.19999 2.29999" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>


<svg style={{position: "relative",
    top: "-1198px",
    
    left: "741px"}}   width="18" height="40" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1.2H14.2" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M0 8.8H7.7" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M0 16.5H6.1" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M0 24.1H16.1" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M0 31.8H17.6" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M0 39.5H4.2" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>


<svg style={{position: "relative",
    top: "-1200px",
    
    left: "310px"}}   width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6 19.3C15.7915 19.3 20 15.0915 20 9.9C20 4.70852 15.7915 0.5 10.6 0.5C5.40852 0.5 1.2 4.70852 1.2 9.9C1.2 15.0915 5.40852 19.3 10.6 19.3Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>


<svg style={{position: "relative",
    top: "-1120px",
    
    left: "605px"}}   width="147" height="95" viewBox="0 0 147 95" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M72 93.8C72.0027 73.9626 79.8842 54.9385 93.9113 40.9113C107.938 26.8842 126.963 19.0027 146.8 19" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M57 33.2H68.7L93.3 57.8" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M111.4 17.3H117.6L129 28.8" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M57.2 29.7H64.3" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M111.5 14.1H115.4" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M97.8238 60.1764C100.696 55.2022 101.085 50.0505 98.6937 48.6698C96.3022 47.2891 92.0354 50.2022 89.1636 55.1764C86.2917 60.1507 85.9022 65.3024 88.2937 66.6831C90.6852 68.0638 94.9519 65.1507 97.8238 60.1764Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M104.086 63.6076C110.299 52.846 111.148 41.7043 105.983 38.722C100.817 35.7397 91.5928 42.046 85.3796 52.8076C79.1664 63.5691 78.3171 74.7108 83.4827 77.6931C88.6482 80.6755 97.8726 74.3691 104.086 63.6076Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M93.645 57.8811C94.0316 57.2115 94.0736 56.512 93.7388 56.3187C93.404 56.1254 92.8192 56.5115 92.4326 57.1811C92.046 57.8507 92.004 58.5503 92.3388 58.7436C92.6736 58.9369 93.2584 58.5508 93.645 57.8811Z" fill="#A4FFAA"/>
<path opacity="0.1" d="M32.2 6.3H142.5" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M12.5 16.7H103.6" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M0.700012 27H51.3" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M24.9 37.4H51.3" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M29.6 47.8H71.2" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M29.6 58.1H73.8" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M33.6 68.5H68.2" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M36.6 78.8H61.1" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M36.6 89.2H66.1" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M44.2 94.8V2.60001" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M54.9 24.3V2.60001" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M65.9 22.5V0.800003" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M76.6 22.5V0.800003" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M87.3 22.5V0.800003" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M98 22.5V0.800003" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M108.7 11.8V0.800003" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M119.5 11.3V0.800003" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M130.2 12.8V0.800003" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M54.9 94.8V40.2" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M33.4 63.1V2.60001" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M23 34V2.60001" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>


<svg style={{position: "relative",
    top: "-1031px",
    
    left: "-190px"}}   width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.1" d="M0.600006 9.99999V12.9L3.10001 15.4H7.30002V9.49999H3" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M0.600006 1.4V4.3L3.10001 6.8H7.30002V0.900002H3" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>

<svg style={{position: "relative",
    top: "-1167px",
    
    left: "470px"}}   width="32" height="58" viewBox="0 0 32 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.1" d="M25.9 18.6H1.1V1.10001H14.1L26 13V18.6H25.9Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M30.6 31.3H5.8V13.8H18.8L30.7 25.7V31.3H30.6Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M30.6 44H5.8V26.5H18.8L30.7 38.4V44H30.6Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M30.6 56.7H5.8V39.2H18.8L30.7 51.1V56.7H30.6Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>


<svg style={{position: "relative",
    top: "-1041px",
    
    left: "-250px"}}   width="9" height="26" viewBox="0 0 9 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.199997 0.799988H7" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M0.199997 5.60001H3.9" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path opacity="0.1" d="M0.199997 10.4H3.1" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M0.199997 15.3H7.9" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M0.199997 20.1H8.6" stroke="#A4FFAA" stroke-miterlimit="10"/>
<path d="M0.199997 25H2.2" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>


<svg style={{position: "relative",
    top: "-715px",
    
    left: "30px"}}    width="498" height="612" viewBox="0 0 298 112" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.600006 111.3V21.9L22 0.5H296.9V89.9L275.5 111.3H0.600006Z" stroke="#A4FFAA" stroke-miterlimit="10"/>
</svg>




    </SectionContainer>
  );
};

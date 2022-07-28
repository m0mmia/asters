import React from "react";
import DiscoverKarlList from "./DiscoverKarlList";
import MiscList from "./MiscList";
import SliderList from "./SliderList";
import TextList from "./TextList";
import ColourwaysList from "./ColourwaysList";
import StoreList from "./StoreList";
import TheNewKarlKani from "./TheNewKarlKani";


export function ComponentList() {
  return (
      <>
    <MiscList/>
    <SliderList/>
    <ColourwaysList/>
    <StoreList/>
    <DiscoverKarlList/>
    <TheNewKarlKani/>
    <TextList/>
  </>
  );
}
import React, { useState, createContext, useEffect, useRef } from "react";
import { getIsMobileWidth } from "../../../utils";
export const SiteStateContext = createContext();
export const SiteContentContext = createContext();
export const ShoePositionContext = createContext();
export const SITE_STATE_1 = 1; // None visible
export const SITE_STATE_2 = 2; // Visible text 1
export const SITE_STATE_3 = 3; // Visible text 1
export const SITE_STATE_4 = 4; // Visible text 2
export const SITE_STATE_5 = 5; // Shoe is sticky

export default React.memo(({ children }) => {
  const isMobile = getIsMobileWidth();
  const [shoePosition, setShoePosition] = useState(0);
  const [siteState, setSiteState] = useState(SITE_STATE_1);
  const [siteContent, setSiteContent] = useState(false);
  const siteStateRef = useRef(siteState);

  function GetScrollFactor() {
    let scrollfactor = 1440 / window.innerWidth;
    if (scrollfactor < 1) {
      scrollfactor = 1;
    }
    return scrollfactor;
  }

  function GetPos() {
    let scrollfactor = GetScrollFactor();
    let switchpos = 2600;
    if (isMobile) {
      switchpos = 7000;
    }
    let pos = switchpos - (window.innerHeight * scrollfactor) / 2;

    //console.log(pos,"pos")

    return pos;
  }

  function GetValue(value) {
    if (typeof value == "number") {
      return value;
    } else if (typeof value == "function") {
      return value();
    }
    return undefined;
  }

  const siteStates = [
    {
      desktop: [0, 600],
      mobile: [0, 2000],
      state: SITE_STATE_2,
    },
    {
      desktop: [600, 1300],
      mobile: [2000, 3500],
      state: SITE_STATE_3,
    },
    {
      desktop: [1300, 2000],
      mobile: [2000, 3500],
      state: SITE_STATE_4,
    },
  ];

  const shoeStates = [
    {
      desktop: [0, 200],
      mobile: [0, 200],
    },
    {
      desktop: [200, 560],
      mobile: [200, 1000],
    },
    {
      desktop: [560, GetPos],
      mobile: [1000, GetPos],
    },
    {
      desktop: [GetPos],
      mobile: [GetPos],
    },
  ];

  const onScroll = () => {
    if (siteStateRef.current < SITE_STATE_2) return;

    let scrolly = window.scrollY * GetScrollFactor();

    let newstate = null;
    for (let i = 0; i < siteStates.length; i++) {
      let visible = siteStates[i];
      let check = isMobile ? visible["mobile"] : visible["desktop"];
      if (scrolly >= check[0] && scrolly < check[1]) {
        newstate = visible.state;
      }
    }
    if (!newstate) {
      newstate = SITE_STATE_5;
    }
    setSiteState(newstate);

    let newsshoetate = null;
    for (let i = 0; i < shoeStates.length; i++) {
      let shoepos = shoeStates[i];
      let check = isMobile ? shoepos["mobile"] : shoepos["desktop"];
      if (check[1] != undefined) {
        if (scrolly >= GetValue(check[0]) && scrolly < GetValue(check[1])) {
          newsshoetate = i;
          break;
        }
      } else {
        if (scrolly >= GetValue(check[0])) {
          console.log("scrollPos2", scrolly, GetValue(check[0]));
          newsshoetate = i;
          break;
        }
      }
    }
    if (newsshoetate != null) {
      setShoePosition(newsshoetate);
    }
  };

  useEffect(() => {
    console.log("SITE STATE CHANGE", siteState);
    siteStateRef.current = siteState;

    if (siteState >= SITE_STATE_2) {
      setSiteContent(true);
    }
  }, [siteState]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <SiteStateContext.Provider value={[siteState, setSiteState]}>
      <SiteContentContext.Provider value={[siteContent, setSiteContent]}>
        <ShoePositionContext.Provider value={[shoePosition, setShoePosition]}>
          {children}
        </ShoePositionContext.Provider>
      </SiteContentContext.Provider>
    </SiteStateContext.Provider>
  );
});

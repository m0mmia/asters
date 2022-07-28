import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
//import * as PIXI from "pixi.js";
import * as PIXI from 'pixi.js-legacy'
import { useBaseUrl } from "../../../../i18n/siteContext";

import threeDShoeSection from "./sections/threeD-shoe/desktop";

import { clamp } from "../../../../utils/Clamp";
import { gsap, TweenMax } from "gsap";
import { ScrollToPlugin } from "../../../../libs/ScrollToPlugin";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: -300px;
  background-color: red;
`;

// 'sectionB': {label: 'sectionB', section: SectionB, height: 1282, paddingTop: 0 },
let scrolling = false;
let addpixels = 300;
let lastInnerheight = 0;
//addpixels = 0;
const desktopSections = {
  /* threeDShoe: {
    label: "threeDShoe",
    section: threeDShoeSection,
    height: 1983 + addpixels,
    paddingTop: 0,
    order: 0,
  }, */
};

const MobileSections = {};

let visible = true;
let app;
let factor = 1;
let innited = false;
let container;
let pageContainer;
let scaleFactor = 1;
let scale = 1;
let lastScrollPos = -1;
let currentClosest = "";
let videoPlayer;
let files = {};
let videoPlayerLoaded = false;
let sections = {};
let lastProgress = 0;
let currentPercentage = 0;

const PixiPage = (props) => {
  // pass isMobile from parent, due to logic happening in parent component this prop will be passed as a single value per instance of "PixiPage"
  const { isMobile, isLoaded, currentSection } = props;
  // create container ref
  const containerRef = useRef(null);
  const containerMobileRef = useRef(null);
  // subscribe to formatLink hook
  const formatLink = useBaseUrl();

  // what does / should "slide2url" do?
  const slide2url = formatLink("/c/sprite");
  console.log("ismobile ", isMobile);

  // resize handler
  const onResize = () => {
    // todo: declare these values somewhere more global?
    let minWidth = 1441;
    let maxWidth = 1920;
    let mobileRefWidth = 375;
    //console.log("resize ",window.innerHeight);

    // get the sections
    const keys = Object.keys(sections);

    // create new number to increment based on the heights of components
    let top = 0;

    // based on the keys derived from sections: get the section heights and add them tp th
    // - set the current section position.y to top
    // - increment top based on the height of the section before moving on to the next.
    for (const key of keys) {
      top += sections[key].paddingTop;
      sections[key].GetContainer().position.y = top;
      top += sections[key].GetHeight();
    }

    // set scaleFactor to 1 as a way of reseting it.
    scaleFactor = 1;

    // check if scalefactor should be higher based on pixelRatio.
    if (window.devicePixelRatio > 1) {
      if (isMobile) {
        scaleFactor = window.devicePixelRatio;
      } else {
        scaleFactor = 1;

        if (window.innerWidth > 2880) {
          scaleFactor = 2880 / window.innerWidth;
        }

        console.log("size ", window.innerWidth * scaleFactor);
      }
    }

    // use the app renderer to resize to the new scaleFactor.

    var height =   window.innerHeight * scaleFactor;
    if (isMobile) {
      height = height * 1.1;
    }

    app.renderer.resize(
      window.innerWidth * scaleFactor,
      height
    );

    // transform the apps scale and origin.
    app.renderer.view.style.transformOrigin = "0 0";
    app.renderer.view.style.transform = "scale(" + 1 / scaleFactor + ")";

    // do container scaling, clamp will "clamp" a value between x and y
    let refWidth = clamp(window.innerWidth, minWidth, maxWidth);

    if (isMobile) {
      refWidth = mobileRefWidth;
    }

    scale = window.innerWidth / refWidth;

    // use the value to scale the container
    container.scale.set(scale * scaleFactor, scale * scaleFactor);

    // get container position and move it.
    const onMovePixels = (movePixels) => {
      container.position.x = 0 - (movePixels / 2) * (scale * scaleFactor);
    };

    if (!isMobile) {
      if (window.innerWidth < maxWidth && window.innerWidth > minWidth) {
        onMovePixels(maxWidth - window.innerWidth);
      } else if (window.innerWidth < minWidth) {
        onMovePixels(maxWidth - minWidth);
      } else {
        container.position.x = 0;
      }
    } else {
      container.position.x = 0;
    }

    // set scale for sections
    for (const key of keys) {
      sections[key].SetScale(scale, scaleFactor);
      sections[key].SetX(container.position.x);
    }

    // run callback
    if (props.callback) {
      props.callback(top * scale);
    }
  };


  function handleScroll(e) {
    // console.log("handlescroll",window.scrollY,lastScrollPos);
    if (window.scrollY != lastScrollPos) {
      // get new ypos
      let ypos = 0 - window.scrollY * scaleFactor;
      // set container ypos
      container.position.y = ypos;
      // set container scroll positions
      const keys = Object.keys(sections);
      let closestsections = [];
      let closest = "";
      let closestPos = null;

      for (const key of keys) {
        sections[key].SetScrollPosition(window.scrollY / scale);
        if (
          closestPos == null ||
          Math.abs(sections[key].absolutey) < closestPos
        ) {
          closestPos = Math.abs(sections[key].absolutey);
          closest = key;
        }
      }

      if (currentClosest != closest) {
        currentClosest = closest;
        props.setCurrentSection(currentClosest);
      }

      lastScrollPos = window.scrollY;
    }
  }

  const addDomEvents = () => {
    window.addEventListener("resize", onResize);
  };

  const removeDomEvents = () => {
    window.removeEventListener("resize", onResize);
  };

  function Render() {
    requestAnimationFrame(Render);
  }

  function tick() {
    //console.log("resize 2",window.innerHeight,document.documentElement.clientHeight);
    handleScroll();
    const keys = Object.keys(sections);
    for (const key of keys) {
      sections[key].Render();
    }
  }

  function loadProgress(e) {
    setProgress(e.progress);
  }

  function setup() {
    const keys = Object.keys(sections);
    for (const key of keys) {
      sections[key].Build();
    }

    onResize();
    handleScroll();
    app.ticker.start();
    app.ticker.add(tick);

    loadProgress({ progress: 100 });
  }

  // when mounting run "build" to get everything in place for a render on the selected device.
  // this should run once per instance of "PixiPage"
  const build = () => {
    //create the pixie app and configure it
    app = new PIXI.Application({
      width: window.innerWidth, // default: 800
      height: window.innerHeight, // default: 600
      antialias: true, // default: false
      transparent: false, // default: false
      resolution: 1, // default: 1
      autoStart: false,
    });

    //console.log("canvas",app.renderer.view.style.touchAction.toString());
    app.renderer.view.style.touchAction = "auto";
    app.renderer.plugins.interaction.autoPreventDefault = false;

    // add the newly created pixie app to the container by append.
    if (isMobile) {
      containerMobileRef.current.appendChild(app.view);
    } else {
      containerRef.current.appendChild(app.view);
    }

    // create a "container" and a "pageContainer"
    // the container is used for:
    // the pageContainer is used for:

    container = new PIXI.Container();
    pageContainer = new PIXI.Container();
    app.stage.addChild(container);
    container.addChild(pageContainer);
    app.stage.interactive = true;

    // create sections based on a list that differs on the isMobile prop
    let orders = [];
    if (isMobile) {
      sections = {};
      for (const key of Object.keys(MobileSections)) {
        const currentItem = MobileSections[key];
        sections[currentItem.label] = new currentItem.section(
          app,
          currentItem.height,
          currentItem.paddingTop,
          currentItem.order
        );
        orders.push(sections[currentItem.label]);
      }
    } else {
      for (const key of Object.keys(desktopSections)) {
        const currentItem = desktopSections[key];
        sections[currentItem.label] = new currentItem.section(
          app,
          currentItem.height,
          currentItem.paddingTop,
          currentItem.order
        );
        orders.push(sections[currentItem.label]);
      }
    }

    orders.sort(function (a, b) {
      return a.order - b.order;
    });
    for (var i = 0; i < orders.length; i++) {
      //console.log("order",i,orders[i]);
      container.addChild(orders[i].GetContainer());
    }
  };

  function testScroll() {
    console.log("update scroll ", window.scrollY);
  }

  function scrollToSection(section) {
    if (section != currentClosest) {
      if (sections[section]) {
        //gsap.to(window, 1,{scrollY:sections[section].GetScrollPosition(),duration:4,onUpdate:testScroll});
        gsap.to(window, 1, { scrollTo: sections[section].GetScrollPosition() });
        console.log(
          "scroll to section",
          section,
          sections[section].GetScrollPosition()
        );
      } else {
        console.log("not in section ", section);
      }
    }
  }

  function setProgress(percentage) {
    currentPercentage = percentage;
    if (!videoPlayerLoaded) {
      percentage = percentage * 0.9;
    }
    if (percentage != lastProgress) {
      console.log("set progress ", percentage);
      props.progressCallback(percentage);
    }
    lastProgress = percentage;
  }

  function removePixi() {
    app.destroy(true);
    app = null;
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
    build();

    let totalfiles = files;
    const filekeys = Object.keys(sections);
    for (const key of filekeys) {
      totalfiles = { ...totalfiles, ...sections[key].files };
    }

    const keys = Object.keys(totalfiles);
    for (const key of keys) {
      app.loader.add(totalfiles[key]);
    }

    app.loader.onProgress.add(loadProgress);

    app.loader.load(setup);

    innited = true;
    requestAnimationFrame(Render);
    addDomEvents();
    return () => {
      removeDomEvents();
      removePixi();
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      sections["masthead"].afterLoaded();
    }
  }, [isLoaded]);

  useEffect(() => {
    console.log("section changed ", props.currentSection);
    scrollToSection(props.currentSection);
  }, [currentSection]);

  return (
    <>
      {isMobile && <Container ref={containerMobileRef}></Container>}
      {!isMobile && <Container ref={containerRef}></Container>}
      <Canvas id="logocanvas"></Canvas>
    </>
  );
};

export default PixiPage;

import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  SiteStateContext,
  ShoePositionContext,
  SITE_STATE_2,
} from "../../components/SiteContext";
import {
  ThreeContext,
  AnimationContext,
} from "../../../components/preloader/Context";

import { TweenMax, Circ, Power4, Linear, gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import { assetUrl, media, getIsMobileWidth, proportional } from "../../../utils";
import { Timeline } from "gsap/gsap-core";

export const POSES = {
  INITIAL: "INITIAL",
  FRONT: "FRONT",
  BACK: "BACK",
  SIDE_DIAGONAL: "SIDE_DIAGONAL",
  KARL: "KARL",
  SIDE: "SIDE",
  ANIMATION: "ANIMATION",
};

const isMobile = getIsMobileWidth();
let mixer;
let rendered = false;
let animationRef;
let visible = false;
let factor = 1;
let dragging = false;
let down = false;
let control = false;
let container;
let plane;
let cube;
let modelRef;
let ShoeLaceMobileRef;
let lastX = 0;
let lastY = 0;
let initialX = 0;
let initialY = 0;
let lastDeltaMove = { x: 0, y: 0 };
let lastDeltaMoves = [];
let lastrot = 0;
let acceleration = 0.006;
let callback;
let referenceWidth = 1440;
let windowHeight = 0;
let tanFOV;
let camera;
let renderer;
let scene;
let shoelace;
let shoelacematerial = null;
let shoelacematerial2 = null;
let gltf;
let canvas;
let rotationSpeed = 0.04;
let screenFactor = 1;
let lockedPosition = 2600;
let moveLockedPosition = 400;
let model;
let shoceUrl = "/images/karlkani/Shoe/Scene-4.gltf";
let shoelaceUrl = "/images/karlkani/Lace/logo_aster_A01.gltf";
let texture2 = assetUrl("/images/karlkani/Lace/shoelace_white_2k.jpg");
let texture = assetUrl("/images/karlkani/Lace/shoelace_black_2k.jpg");
let introAnimationRotation = -10;
const ShoeLaceMobile = styled.img.attrs({
  width: [320, 151],
  left: [0,100]
})`
  ${proportional}
  position: absolute;
  top: 20vh;
  user-select: none;
  display: none;
  opacity: 0;
  margin-left: auto; 
  margin-right: auto;
`;

if (isMobile) {
  shoelaceUrl = "/images/karlkani2/mobile-shoelace.png";
  lockedPosition = 7000;
  moveLockedPosition = -5000;
  introAnimationRotation = -360;
  rotationSpeed= 0.04
}
let currentPose = null;
let lastPose = null;
let colorway;
let dragFactor = 5;
let titleMover;
let shoeTimeLine = null;
let shoeTimeLine2 = null;
let shoelacematerial3 = null;
let uniforms = null;
let indicator;
let waitingforsecond = false;
let scrollState = 0;

async function Preloader(setThreeLoaded) {
  const LoadModel = ({ path }) =>
    new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      // Load a glTF resource
      loader.load(
        // resource URL
        path,
        // called when the resource is loaded
        (gltf) => resolve(gltf),
        // called while loading is progressing
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        (error) => reject(error)
      );
    });

  gltf = await LoadModel({
    path: assetUrl(shoceUrl),
  });
 if(!isMobile){
    shoelace = await LoadModel({
      path: assetUrl(shoelaceUrl),
    });
  }
  }

function getScreenFactor() {
  screenFactor = window.innerWidth / referenceWidth;
}

function createReferenceSize(width, height) {
  windowHeight = height;
  const tempcamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  tanFOV = Math.tan(((Math.PI / 180) * tempcamera.fov) / 2);
}

function ResizeBasedOnReferenceSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.fov =
    (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function scale(obj, val) {
  obj.scale.set(val, val, val);
}

let vertexShader = `
  precision highp float;
  precision highp int;
  attribute vec2 uv2;
  
  varying vec2 vUv;
  varying vec2 v_texCoord;
  void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `;

let fragmentShader = `
    precision mediump float;

    varying vec2 vUv;
    
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform float multiplier;
    void main( void ) {
        vec3 tex1 = texture2D(texture1, vUv).xyz ;
        vec3 tex2 = texture2D(texture2, vUv).xyz ;
        vec3 mixCol = mix( tex1, tex2, multiplier )  ;
      gl_FragColor = vec4(mixCol, 1.0);
    }
  `;

function PlaySecondAnimation() {
  if (shoeTimeLine2) {
    shoeTimeLine2.play();
  }
}

function scaleBasedOnReferenceWidth(obj, factor, limitonMax) {
  if (!factor) {
    factor = 1;
  }
  let sf = screenFactor;
  if (limitonMax) {
    if (sf > limitonMax) {
      sf = limitonMax;
    }
  }
  scale(obj, sf * factor);
}

const visibleHeightAtZDepth = (depth, camera) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

const visibleWidthAtZDepth = (depth, camera) => {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
};

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function radians_to_degrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

function onThrow(e) {
  const screenX = e.screenX || e.touches?.[0].screenX;
  const screenY = e.screenY || e.touches?.[0].screenY;

  if (isNaN(screenX) || isNaN(screenY)) {
    return;
  }

  const deltaMove = {
    x: screenX - lastX,
    y: screenY - lastY,
  };

  const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(
      toRadians(deltaMove.y * 0.02),
      toRadians(deltaMove.x * 0.02),
      0,
      "XYZ"
    )
  );

  modelRef.quaternion.multiplyQuaternions(
    deltaRotationQuaternion,
    modelRef.quaternion
  );

  lastX = screenX;
  lastY = screenY;
  lastDeltaMove = deltaMove;
}

function onMove(e) {
  let scrollfactor = window.innerWidth / 1440;
  let setlockedPosition = lockedPosition;
  if (waitingforsecond) {
    if (down) {
      PlaySecondAnimation();
      waitingforsecond = false;
    }
  }
  if (scrollfactor < 1) {
    setlockedPosition = lockedPosition * scrollfactor;
    moveLockedPosition = 200;
  }
  if (
    e.pageY < setlockedPosition + moveLockedPosition ||
    (e.changedTouches &&
      e.changedTouches[0].pageY < setlockedPosition + moveLockedPosition)
  ) {

    if (dragging) {
      const screenX = e.screenX || e.touches?.[0].screenX;
      const screenY = e.screenY || e.touches?.[0].screenY;

      if (e.touches) {
        // e.preventDefault();
      }

      const deltaMove = {
        x: (screenX - lastX) * dragFactor,
        y: (screenY - lastY) * dragFactor,
      };

      const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          toRadians(deltaMove.y * rotationSpeed),
          toRadians(deltaMove.x * rotationSpeed),
          0,
          "XYZ"
        )
      );

      modelRef.quaternion.multiplyQuaternions(
        deltaRotationQuaternion,
        modelRef.quaternion
      );

      lastX = screenX;
      lastY = screenY;
      lastDeltaMove = deltaMove;

      lastDeltaMoves.push(lastDeltaMove);

      if (lastDeltaMoves.length === 3) {
        lastDeltaMoves.shift();
      }
    } else if (
      e.pageY > lockedPosition + moveLockedPosition ||
      (e.changedTouches &&
        e.changedTouches[0].pageY > lockedPosition + moveLockedPosition)
    ) {
      clearMovement();
    }
  }
}

const ThreeCanvas = styled.canvas`
  outline: none;
  right: 0px;
  pointer-events: none;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  ${variant({
    variants: {
      drag: {
        cursor: `url(${assetUrl("/images/westbrook/drag-cursor.png")}), auto`,
        cursor: `-webkit-image-set(
          url(${assetUrl("/images/westbrook/drag-cursor.png")}) 1x,
          url(${assetUrl("/images/westbrook/drag-cursor@2x.png")}) 2x
        ),
        auto;`,
      },
    },
  })}
`;

const THREE_UPDATE = "three_update";

const getSpotLight = ({
  x = 0,
  y = 0,
  z = 0,
  intensity = 1,
  color = 0xffffff,
  castShadow = false,
  distance = null,
}) => {
  let spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(x, y, z);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 200;
  spotLight.intensity = intensity;

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 256;
  spotLight.shadow.mapSize.height = 256;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.focus = 0.1;
  //scene.add( spotLight );

  // let lightHelper = new THREE.SpotLightHelper( spotLight );
  // scene.add( lightHelper );

  // let shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
  // scene.add( shadowCameraHelper );

  return spotLight;
};

const CompleteAnimation = () => {
  //alert('klaar')
  //console.log("completed");
  //console.log("completed",scene,shoelace.scene);
  if(!isMobile){
    scene.remove(shoelace.scene);
  }
};

const MakeTimeLine = (setSiteState) => {
  let timings = { animationTime: 0 };

  let titleAnimation = { position: -50 };

  let visiblewidth = visibleWidthAtZDepth(0.06, camera);

  function AnimateLace() {
    if (mixer) {
      mixer.setTime(timings.animationTime);
    }
  }
  function setScrollPage() {
    setTimeout(() => setSiteState(SITE_STATE_2), 350);
  }
  let poseTime = 0;
  let sceneTime = 0;
  let sceneOutTime = 0;
  let animationRotation = GetPose("ANIMATION");

  shoeTimeLine = new Timeline({ onComplete: WaitForSecondAnimation });
  shoeTimeLine.add(
    TweenMax.set(titleMover, { autoAlpha: 1, display: "block" })
  );
  shoeTimeLine.add(
    TweenMax.to(indicator, 1, { autoAlpha: 1, display: "inline-block" }),
    3
  );
  if(!isMobile){
    shoeTimeLine.add(
      TweenMax.to(timings, 3, {
        animationTime: 2.7,
        onUpdate: AnimateLace,
        ease: "none",
      }),
      0
    );
    shoeTimeLine.add(
      TweenMax.to(shoelace.scene.position, 3, {
        x: camera.position.x + 0.1,
        z: 0.06,
        ease: "Expo.easeOut",
      }),
      0
    );
  }else{
    shoeTimeLine.add(
      gsap.to(ShoeLaceMobileRef.current, {
        css: { display: "block",left: "0px", right: "0px", opacity: "1" },
        ease: "Power1.easeIn",
      }),
      0
    );
  }
  shoeTimeLine.add(
    TweenMax.to(titleMover, 3, { y: 0, ease: "Expo.easeOut" }),
    0
  );

  shoeTimeLine2 = new Timeline({ onComplete: CompleteAnimation });

  shoeTimeLine2.add(
    TweenMax.to(modelRef.rotation, 2, {
      x: animationRotation.x,
      y: animationRotation.y,
      z: animationRotation.z,
      ease: "Expo.easeOut",
    }),
    1
  );
  shoeTimeLine2.add(
    TweenMax.to(camera.position, 2.9, {
      x: 0,
      y: 0,
      ease: "Expo.easeInOut",
    }),
    0
  );
  shoeTimeLine2.add(
    TweenMax.from(modelRef.rotation, 3, {
      y: introAnimationRotation,
      ease: "Expo.easeOut",
    }),
    0
  );
  if(!isMobile){
    shoeTimeLine2.add(
      TweenMax.to(timings, 2, {
        animationTime: 5,
        onUpdate: AnimateLace,
        ease: "none",
      })
    );
    shoeTimeLine2.add(
      TweenMax.to(shoelace.scene.position, 5.5, {
        x: shoelace.scene.position - 0.00002,
        ease: "Power1.easeIn",
      })
    );
  }
  else{
    shoeTimeLine2.add(
      gsap.to(ShoeLaceMobileRef.current, 2.5,{
        css: { display: "none", left: "-780px" },
        ease: "Power1.easeIn",
      }),0);
    }
  // shoeTimeLine2.add(TweenMax.to(shoelace.scene.position,2,{x:-100,ease:"none"}))
  shoeTimeLine2.add(
    gsap.to(animationRef.current, {
      duration: 0.7,
      css: { right: "0px" },
      ease: "Power1.easeIn",
      onComplete: setScrollPage,
    }),
    0
  );
  shoeTimeLine2.add(
    TweenMax.to(titleMover, 2, {
      x: 0 - window.innerWidth / 4,
      ease: "Power1.easeIn",
    }),
    0.5
  );
  shoeTimeLine2.pause();

  shoeTimeLine.play();

  function WaitForSecondAnimation() {
    waitingforsecond = true;
  }
};

const SetupScene = async ({
  scene,
  camera,
  renderer,
  setThree,
  //controls,
  setSiteState,
  setThreeLoaded,
  animation,
  threeLoader,
}) => {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  getScreenFactor();
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 1.5;

  camera.zoom = 15;

  let visiblewidth = visibleWidthAtZDepth(0.06, camera);
  camera.position.set(0 - visiblewidth / 5, 0, 45);
  visiblewidth = visibleWidthAtZDepth(0.06, camera);
  camera.position.set(0 - visiblewidth / 5, 0, 45);
  const planeGeometry = new THREE.PlaneBufferGeometry(8, 8, 1, 1);
  let planeMaterial = new THREE.ShadowMaterial({ opacity: 0.05 });

  container = new THREE.Group();
  //planeMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = 1;
  scene.add(plane);
  plane.position.z = -3;
  scene.add(container);

  const ambientLight = new THREE.AmbientLight(0xffffff, 3.5);
  scene.add(ambientLight);

  // const point_01 = getPointLight({
  //   x: 11.182,
  //   y: 12.426,
  //   z: 13.804,
  //   color: 0xffffff,
  //   intensity: 16.3,
  //   distance: 21.22,
  // });
  // scene.add(point_01);

  const point_02 = getSpotLight({
    x: -0.1,
    y: 0.5,
    z: 20,
    color: 0xffffff,
    distance: 0.22,
    intensity: 10,
    castShadow: true,
  });
  scene.add(point_02);

  // const point_03 = getPointLight({
  //   x: 0,
  //   y: 0.1,
  //   z: 2.9,
  //   color: 0xffffff,
  //   distance: 32.22,
  //   intensity: 7,
  // });
  // scene.add(point_03);

  var clock = new THREE.Clock();

  const isDesktop = window.matchMedia(`(min-width: 768px)`).matches;
  //model desktop

  const [width, height] = [
    isDesktop ? Math.min(window.innerWidth) : 420,
    isDesktop ? Math.min(window.innerHeight) : 420,
  ];
  gltf.scene.traverse((n) => {
    isDesktop ? (n.position.y = 0) : (n.position.y = 0.15);
    if (n.isMesh) {
      n.scale.set(0.04, 0.04, 0.04);
      n.position.set(1, -0.9, -1.3);
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
 if (!isMobile){
    shoelace.scene.writable = true;
    //console.log(shoelace)
    shoelace.scene.traverse((n) => {
      if (n.isMesh) {
        // n.castShadow = true;
        // n.receiveShadow = true;
        //console.log(n)
        n.position.set(0.0005, -0.6, 0.0005);
        n.scale.set(3, 3, 3);

        //console.log("what is it",n,n.material)

        // if (n.material.map) n.material.map.anisotropy = 16;
      }
    });
    shoelace.scene.position.set(camera.position.x + 4, 0.3, 200);
  }

  container.add(gltf.scene);
  modelRef = gltf.scene;
  if(!isMobile){
    scene.add(shoelace.scene);
  }
  initialX = gltf.scene.scale.x;
  initialY = gltf.scene.scale.y;

  setThree({
    scene,
    camera,
    renderer,
    //controls,
    model: gltf.scene,
    shoelaceModel: shoelace ? shoelace.scene : null ,
  });
};

let lockedInPosition = false;

function setLocked() {
  let scrollfactor = 1440 / window.innerWidth;
  if (scrollfactor < 1) {
    scrollfactor = 1;
  }

  const scrollPos = window.scrollY * scrollfactor;
  const targetPos = lockedPosition - (window.innerHeight * scrollfactor) / 2;
  const topPos = lockedPosition / scrollfactor - window.innerHeight / 2;

  if (scrollPos >= targetPos) {
    if (!lockedInPosition) {
      canvas.style.position = "absolute";
      canvas.style.top = topPos + "px";
      canvas.style.left = 0;
      lockedInPosition = true;
      scrollState = 1;
    }
  } else if (lockedInPosition) {
    canvas.style.position = "fixed";
    canvas.style.top = "0px";
    lockedInPosition = false;
    scrollState = 0;
  }
}

const SetupThree = async ({
  canvas,
  setThree,
  setSiteState,
  setThreeLoaded,
  animation,
  threeLoader,
}) => {
  const [clampedWidth, clampedHeight] = [referenceWidth, referenceWidth]; // Based on max dimensions in design
  const isDesktop = window.matchMedia(`(min-width: 768px)`).matches;
  const [width, height] = [
    Math.min(clampedWidth, window.innerWidth),
    Math.min(clampedHeight, window.innerHeight),
  ];
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  createReferenceSize(referenceWidth, (referenceWidth / 16) * 9);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    antiAliasing: true, // @NOTE this would do something weird with the cursor on retina screens
    canvas,
    alpha: true,
  });
  renderer.setSize(width, height);
  let ratio = window.devicePixelRatio;
  if (window.devicePixelRatio > 1 && window.innerWidth > 1080) {
    ratio = 1;
  }

  renderer.setPixelRatio(ratio);

  let wait = await Preloader(setThreeLoaded);

  /*  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.update();

  controls.enableKeys = false;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.enabled = false; */

  let animationFrameID;
  const update = () => {
    animationFrameID = requestAnimationFrame(update);
    setLocked();

    lastPose = currentPose;
    if (modelRef) {
      //console.log(container.rotation,modelRef.rotation);
    }
    if (control == true) {
      if (modelRef) {
        if (!dragging) {
          // container.rotation.y += acceleration + add;

          let bla = {};

          bla.screenX = lastX + lastDeltaMove.x;
          bla.screenY = lastY + lastDeltaMove.y;

          onThrow(bla);

          lastDeltaMove.x *= 0.99;
          lastDeltaMove.y *= 0.99;

          if (Math.abs(lastDeltaMove.x) < 0.7) {
            if (lastDeltaMove.x >= 0) {
              lastDeltaMove.x = 0.7;
            } else {
              lastDeltaMove.x = -0.7;
            }
          }

          // if (lastDeltaMove.x < 0.01) {
          //   lastDeltaMove.x = 0.01;
          // }
          // delta -= 10;
        }

        // modelRef.rotation.x += 0.01;
        // modelRef.rotation.y += 0.005;
        // modelRef.rotation.z += 0.0075;

        //  plane.rotation.x += 0.01;
        //console.log("YES RENDER");
        rendered = true;
      }
    }
    renderer.render(scene, camera);
  };
  update();

  const resize = () => {
    const [clampedWidth, clampedHeight] = [
      referenceWidth,
      (referenceWidth / 16) * 9,
    ];
    const [width, height] = [
      isDesktop ? Math.min(window.innerWidth) : 420,
      isDesktop ? Math.min(window.innerHeight) : 420,
    ];
    getScreenFactor();
    ResizeBasedOnReferenceSize();

    let size = 0.8;
    if (isMobile) {
      size = 1;
    }else{
      scaleBasedOnReferenceWidth(shoelace.scene, size);
    }
    size = 1.3;
    if (isMobile) {
      size = 1.8;
    }
    scaleBasedOnReferenceWidth(modelRef, size, 1);

  };
  window.addEventListener("resize", resize);

  await SetupScene({
    scene,
    camera,
    renderer,
    //controls,
    animationDOMListener: canvas,
    setThree,
    setSiteState,
    setThreeLoaded,
    animation,
    threeLoader,
  });
  resize();
  setThreeLoaded(1);
  return () => {
    cancelAnimationFrame(animationFrameID);
    window.removeEventListener("resize", resize);
  };
};

const GetPose = (pose) => {
  switch (pose) {
    case POSES.INITIAL:
    case POSES.FRONT:
      return {
        x: THREE.MathUtils.DEG2RAD * -20,
        y: THREE.MathUtils.DEG2RAD * -185,
        z: THREE.MathUtils.DEG2RAD * -90,
      };
      break;
    case POSES.ANIMATION:
      return {
        x: THREE.MathUtils.DEG2RAD * 0,
        y: THREE.MathUtils.DEG2RAD * 0,
        z: THREE.MathUtils.DEG2RAD * 0,
      };
      break;
    case POSES.BACK:
      return {
        x: THREE.MathUtils.DEG2RAD * 0,
        y: THREE.MathUtils.DEG2RAD * 0,
        z: THREE.MathUtils.DEG2RAD * 0,
      };
      break;
    case POSES.SIDE_DIAGONAL:
      return {
        x: THREE.MathUtils.DEG2RAD * 10,
        y: THREE.MathUtils.DEG2RAD * -30,
        z: THREE.MathUtils.DEG2RAD * 0,
      };
      break;
    case POSES.KARL:
      return {
        x: THREE.MathUtils.DEG2RAD * 10,
        y: THREE.MathUtils.DEG2RAD * 10,
        z: THREE.MathUtils.DEG2RAD * -40,
      };
      break;
    case POSES.SIDE:
      return {
        x: THREE.MathUtils.DEG2RAD * -10,
        y: THREE.MathUtils.DEG2RAD * 10,
        z: THREE.MathUtils.DEG2RAD * 0,
      };
      break;
  }
};

const clearMovement = () => {
  lastDeltaMove = { x: 0, y: 0 };
  lastDeltaMoves = [];
};

const PoseShoe = ({ pose, three, percentage }) => {
  if (!three) return;
  currentPose = pose;
  const {
    scene,
    renderer,
    camera,
    model,
    shoelaceModel,
    //controls,
  } = three;
  const isDesktop = window.matchMedia(`(min-width: 768px)`).matches;
  const [width, height] = [
    isDesktop ? Math.min(window.innerWidth) : 420,
    isDesktop ? Math.min(window.innerHeight) : 420,
  ];
  let targetRotation;
  let objectRotation = { x: 0, y: 0, z: 0 };
  let targetPosition = isDesktop
    ? { x: -5, y: 5, z: 40 }
    : { x: -5, y: 5, z: 40 };
  switch (pose) {
    case POSES.INITIAL:
    case POSES.FRONT:
      clearMovement();
      targetRotation = GetPose(pose);
      control = false;
      break;
    case POSES.BACK:
      clearMovement();
      targetRotation = GetPose(pose);
      control = false;
      break;
    case POSES.SIDE_DIAGONAL:
      clearMovement();
      targetRotation = GetPose(pose);
      control = false;
      break;
    case POSES.KARL:
      clearMovement();
      targetRotation = GetPose(pose);
      control = false;
      break;
    case POSES.SIDE:
      clearMovement();
      targetRotation = GetPose(pose);
      control = true;
      break;
    case POSES.ANiMATION:
      clearMovement();
      targetRotation = GetPose(pose);
      control = true;
      break;
  }
  /*   if (controls.enabled) {
    controls.enabled = false;
    TweenMax.set(camera.position, { x: 0, y: 0, z: isDesktop ? 50 : 40 });
    camera.quaternion.set(0, 0, 0, 1);
  } */

  if (pose == POSES.INITIAL) {
    //TweenMax.set(camera.position, targetPosition);
    TweenMax.set(modelRef.rotation, {
      z: targetRotation.z,
      x: targetRotation.x,
    });
    TweenMax.fromTo(
      renderer.domElement,
      1,
      { opacity: 0 },
      {
        opacity: 1,
        ease: Circ.easeInOut,
      }
    );

    TweenMax.to(modelRef.rotation, 2, {
      ...targetRotation,
      ease: Power4.easeInOut,
      delay: 0,
    });
  } else {
    TweenMax.to(modelRef.rotation, 2, {
      ...targetRotation,
      ease: Power4.easeInOut,
    });
  }

  return () => {
    modelRef.rotation && TweenMax.killTweensOf(model.rotation);
    camera.position && TweenMax.killTweensOf(camera.position);
    shoelaceModelRef.position && TweenMax.set(shoelaceModel.position);
  };
};

export default React.forwardRef(
  (
    { pose, rotateCallback, setAnimationRef, titleMoverRef, indicatorRef },
    canvasRef
  ) => {
    const [siteState, setSiteState] = useContext(SiteStateContext);
    const [shoePosition, setShoePosition] = useContext(ShoePositionContext);
    const [threeLoader, setThreeLoaded] = useContext(ThreeContext);
    const [animation, setAnimation] = useContext(AnimationContext);
    canvasRef = canvasRef || useRef();
    callback = rotateCallback;
    animationRef = setAnimationRef;
    ShoeLaceMobileRef = useRef();

    function onScroll() {
      if (waitingforsecond) {
        PlaySecondAnimation();
        waitingforsecond = false;
        document.body.removeEventListener("scroll", onScroll);
      }
    }

    //let [pose, setPose] = useState(POSES.INITIAL);
    function onUp() {
      down = false;
      if (control) {
        let biggestX = 0;
        let biggestY = 0;
        dragging = false;

        for (let i = 0; i < lastDeltaMoves.length; i++) {
          const { x, y } = lastDeltaMoves[i];

          if (Math.abs(x) > Math.abs(biggestX)) {
            biggestX = x;
          }

          if (Math.abs(y) > Math.abs(biggestY)) {
            biggestY = y;
          }
        }

        lastDeltaMove = { x: biggestX, y: biggestY };
      }
    }

    function onDown(e) {
      down = true;
      if (control) {
        dragging = true;
        const screenX = e.screenX || e.touches?.[0].screenX;
        const screenY = e.screenY || e.touches?.[0].screenY;

        if (!isNaN(screenX) && !isNaN(screenY)) {
          lastX = screenX;
          lastY = screenY;

          lastDeltaMove = { x: 0, y: 0 };
        }
      }
    }

    const [three, setThree] = useState(null);

    useEffect(() => {
      console.log(shoePosition, "shoePosition");
      switch (shoePosition) {
        case 0:
          console.log("MOVE SHOE ", shoePosition);
          PoseShoe({ three: three, pose: POSES.ANIMATION });
          break;
        case 1:
          console.log("MOVE SHOE ", shoePosition);
          PoseShoe({ three: three, pose: POSES.BACK });
          break;
        case 2:
          console.log("MOVE SHOE ", shoePosition);
          PoseShoe({ three: three, pose: POSES.SIDE_DIAGONAL });
          break;
        case 3:
          console.log("MOVE SHOE ", shoePosition);
          PoseShoe({ three: three, pose: POSES.SIDE });
          break;
      }
    }, [shoePosition]);

    useEffect(() => {
      if (titleMoverRef.current) {
        titleMover = titleMoverRef.current;
      }
    }, [titleMoverRef]);

    useEffect(() => {
      if (indicatorRef.current) {
        indicator = indicatorRef.current;
      }
    }, [indicatorRef]);
    useEffect(() => {
      canvas = canvasRef.current;
    }, [canvasRef]);
    useEffect(() => {
      SetupThree({
        canvas: canvasRef.current,
        setThree,
        setSiteState,
        setThreeLoaded,
        animation,
        threeLoader,
      });
    }, []);
    useEffect(() => {
      if (animation >= 1 && threeLoader >= 1) {
        MakeTimeLine(setSiteState);
      }
    }, [animation, threeLoader]);

    useEffect(() => {
      PoseShoe({ three, pose });
    }, [three, pose]);
    useEffect(() => {
      window.addEventListener("scroll", onScroll);
      window.addEventListener("wheel", onScroll);
      window.addEventListener("mousedown", onDown);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);

      window.addEventListener("touchstart", onDown);
      window.addEventListener("touchmove", onMove);
      window.addEventListener("touchend", onUp);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("wheel", onScroll);
        window.removeEventListener("mousedown", onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);

        window.removeEventListener("touchstart", onDown);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onUp);
      };
    }, []);
    return (
      <>
      {isMobile ? <ShoeLaceMobile ref={ShoeLaceMobileRef} src={assetUrl(shoelaceUrl)} /> : ""}
        <ThreeCanvas
          ref={canvasRef}
          variant={pose === POSES.SIDE ? "drag" : null}
        />
      </>
    );
  }
);

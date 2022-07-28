import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { assetUrl } from "../../../../utils";

export const POSES = {
  INITIAL: "INITIAL",
  FRONT: "FRONT",
  BACK: "BACK",
  SIDE_DIAGONAL: "SIDE_DIAGONAL",
  SIDE: "SIDE",
};

const ThreeCanvas = styled.canvas`
  outline: none;
`;

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

const SetupScene = async ({
  scene,
  camera,
  renderer,
  composer,
  setThree,
  controls,
  initialCameraRotation,
}) => {
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 1.5;
  camera.position.set(12, 23, -1000);

  const ambientLight = new THREE.AmbientLight(0xffffff, 3.5);
  scene.add(ambientLight);

  const gltf = await LoadModel({
    path: assetUrl("/images/karlkani/Gltf/shoelace_baked_01.glb"),
  });

  gltf.scene.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });

  scene.add(gltf.scene);

  setThree({
    scene,
    camera,
    renderer,
    composer,
    controls,
    initialCameraRotation,
    model: gltf.scene,
  });
};

const SetupThree = ({ canvas, setThree }) => {
  const [clampedWidth, clampedHeight] = [1996, 1996]; // Based on max dimensions in design
  const [width, height] = [
    Math.min(clampedWidth, window.innerWidth),
    Math.min(clampedHeight, window.innerHeight),
  ];
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, width / height, 1, 10000000000000);
  camera.position.set(12, 23, -1000);
  const renderer = new THREE.WebGLRenderer({
    antialias: false, // @NOTE this would do something weird with the cursor on retina screens
    canvas,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.update();

  controls.enableKeys = false;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.enabled = false;

  const initialCameraRotation = camera.quaternion.clone();

  let animationFrameID;
  const update = () => {
    animationFrameID = requestAnimationFrame(update);
    controls.enabled = true;
    composer.render();
  };
  update();

  SetupScene({
    scene,
    camera,
    renderer,
    composer,
    controls,
    initialCameraRotation,
    animationDOMListener: canvas,
    setThree,
  });

  return () => {
    cancelAnimationFrame(animationFrameID);
    window.removeEventListener("resize", resize);
  };
};

export default React.forwardRef(({ pose }, canvasRef) => {
  canvasRef = canvasRef || useRef();
  const [three, setThree] = useState(null);
  useEffect(() => SetupThree({ canvas: canvasRef.current, setThree }), []);
  return (
    <ThreeCanvas
      ref={canvasRef}
    />
  );
});


const SetupThree = ({ canvas, setThree }) => {
  const [clampedWidth, clampedHeight] = [1996, 1996]; // Based on max dimensions in design
  const [width, height] = [
    Math.min(clampedWidth, window.innerWidth),
    Math.min(clampedHeight, window.innerHeight),
  ];
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(-25, 30, 45);
  const renderer = new THREE.WebGLRenderer({
    antialias: false, // @NOTE this would do something weird with the cursor on retina screens
    canvas,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.update();

  controls.enableKeys = false;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.enabled = false;

  const initialCameraRotation = camera.quaternion.clone();

  let animationFrameID;
  const update = () => {
    animationFrameID = requestAnimationFrame(update);
    controls.enabled = true;
    composer.render();
  };
  update();

  SetupScene({
    scene,
    camera,
    renderer,
    composer,
    controls,
    initialCameraRotation,
    animationDOMListener: canvas,
    setThree,
  });

  return () => {
    cancelAnimationFrame(animationFrameID);
    window.removeEventListener("resize", resize);
  };
};

export default React.forwardRef(({ pose }, canvasRef) => {
  canvasRef = canvasRef || useRef();
  const [three, setThree] = useState(null);
  useEffect(() => SetupThree({ canvas: canvasRef.current, setThree }), []);
  return (
    <ThreeCanvas
      ref={canvasRef}
    />
  );
});



import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { TweenMax, Circ, Power4, Linear } from "gsap";

import { assetUrl, media } from "../../../../utils";


export const POSES = {
  INITIAL: "INITIAL",
  FRONT: "FRONT",
  BACK: "BACK",
  SIDE_DIAGONAL: "SIDE_DIAGONAL",
  SIDE: "SIDE",
};

const ThreeCanvas = styled.canvas`
  outline: none;

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

const getPointLight = ({
  x = 0,
  y = 0,
  z = 0,
  intensity = 1,
  color = 0xffffff,
  castShadow = true,
  distance = null,
}) => {
  const light = new THREE.PointLight(color, intensity, distance);
  light.position.set(x, y, z);
  light.castShadow = castShadow;
  light.shadow.bias = -0.0001;
  light.shadow.mapSize.width = 1024 * 4;
  light.shadow.mapSize.height = 1024 * 4;

  // const spotLightHelper = new THREE.PointLightHelper(light, 0xff0000);
  // light.add(spotLightHelper);

  return light;
};

const SetupScene = async ({
  scene,
  camera,
  renderer,
  composer,
  setThree,
  controls,
  initialCameraRotation,
}) => {
  // renderer.shadowMap.enabled = true;

  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 1.5;
  camera.position.set(-5, 5, 45);

  // const hemiLight = new THREE.HemisphereLight(0xe6e79c, 0x080820, 2.5);
  // hemiLight.position.set(0, 8.854, 0);
  // scene.add(hemiLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 3.5);
  scene.add(ambientLight);

  const point_01 = getPointLight({
    x: 11.182,
    y: 12.426,
    z: 13.804,
    color: 0xffffff,
    intensity: 16.3,
    distance: 21.22,
  });
  scene.add(point_01);

  const point_02 = getPointLight({
    x: -23.292,
    y: 13.157,
    z: -9.399,
    color: 0xe5e0c0,
    distance: 32.22,
    intensity: 40.02,
  });
  scene.add(point_02);

  const gltf = await LoadModel({
    path: assetUrl("/images/karlkani/karlKani_v02/karlKani_painter_02.gltf"),
  });

  gltf.scene.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });

  scene.add(gltf.scene);

  setThree({
    scene,
    camera,
    renderer,
    composer,
    controls,
    initialCameraRotation,
    model: gltf.scene,
  });
};

const SetupThree = ({ canvas, setThree }) => {
  const [clampedWidth, clampedHeight] = [1996, 1996]; // Based on max dimensions in design
  const isDesktop = window.matchMedia(`(min-width: 768px)`).matches;
  const [width, height] = [
    Math.min(clampedWidth, window.innerWidth),
    Math.min(clampedHeight, window.innerHeight),
  ];
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(-5, 25, 75);

  const renderer = new THREE.WebGLRenderer({
    antialias: false, // @NOTE this would do something weird with the cursor on retina screens
    canvas,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.update();

  controls.enableKeys = false;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.enabled = false;

  const initialCameraRotation = camera.quaternion.clone();

  let animationFrameID;
  const update = () => {
    animationFrameID = requestAnimationFrame(update);
    if (controls.enabled) {
      controls.update();
    }
    composer.render();
  };
  update();


  const resize = () => {
    const [width, height] = [
      isDesktop ? Math.min(clampedWidth, window.innerWidth) : 420,
      isDesktop ? Math.min(clampedHeight, window.innerHeight) : 420,
    ];
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
  };
  window.addEventListener("resize", resize);

  resize();
  SetupScene({
    scene,
    camera,
    renderer,
    composer,
    controls,
    initialCameraRotation,
    animationDOMListener: canvas,
    setThree,
  });

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
        x: THREE.MathUtils.DEG2RAD * 0,
        y: THREE.MathUtils.DEG2RAD * 40,
        z: THREE.MathUtils.DEG2RAD * 30,
      };
      break;
    case POSES.BACK:
      return {
        x: THREE.MathUtils.DEG2RAD * 20,
        y: THREE.MathUtils.DEG2RAD * -145,
        z: THREE.MathUtils.DEG2RAD * 25,
      };
      break;
    case POSES.SIDE_DIAGONAL:
      return {
        x: THREE.MathUtils.DEG2RAD * 0,
        y: THREE.MathUtils.DEG2RAD * 0,
        z: THREE.MathUtils.DEG2RAD * 35,
      };
      break;

    case POSES.SIDE:
      return {
        x: THREE.MathUtils.DEG2RAD * 0,
        y: THREE.MathUtils.DEG2RAD * 180,
        z: THREE.MathUtils.DEG2RAD * 0,
      };
      break;
  }
};

const PoseShoe = ({ pose, three, percentage }) => {
  if (!three) return;
  const {
    scene,
    renderer,
    composer,
    camera,
    model,
    controls,
    initialCameraRotation,
  } = three;
  let isControlsEnabled = false;
  const isDesktop = window.matchMedia(`(min-width: 768px)`).matches;
  let targetRotation;
  let targetPosition = isDesktop
    ? { x: -5, y: 5, z: 4 }
    : { x: -5, y: 5, z: 40 };
  switch (pose) {
    case POSES.INITIAL:
    case POSES.FRONT:
      targetRotation = GetPose(pose);
      if (!isDesktop) {
        targetPosition = { ...targetPosition, x: -3 };
      }
      break;
    case POSES.BACK:
      if (!isDesktop) {
        targetPosition = { ...targetPosition, x: 0 };
      } else {
        targetPosition = { ...targetPosition, y: 8, x: 1, z: 35 };
      }
      targetRotation = GetPose(pose);
      break;
    case POSES.SIDE_DIAGONAL:
      if (isDesktop) {
        targetPosition = { ...targetPosition, y: 6, z: 35 };
      } else {
        targetPosition = { ...targetPosition, x: -3 };
      }
      targetRotation = GetPose(pose);
      break;

    case POSES.SIDE:
      targetRotation = GetPose(pose);
      targetPosition = { ...targetPosition, x: 2 };
      if (isDesktop) {
        targetPosition = { ...targetPosition, z: 50, x: 0, y: 0 };
      } else {
        targetPosition = { ...targetPosition, z: 55, x: 0, y: 0 };
      }
      isControlsEnabled = true;

      break;
  }
  if (controls.enabled) {
    controls.enabled = false;
    TweenMax.set(camera.position, { x: 0, y: 0, z: isDesktop ? 50 : 40 });
    camera.quaternion.set(0, 0, 0, 1);
  }
  if (pose == POSES.INITIAL) {
    TweenMax.set(camera.position, targetPosition);
    TweenMax.set(model.rotation, {
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

    TweenMax.to(camera.position, 2, {
      ...targetPosition,
      onUpdate: () => {},
      onComplete: () => {
      },
      ease: Power4.easeOut,
      delay: 0,
    });
    TweenMax.to(model.rotation, 2, {
      ...targetRotation,
      ease: Power4.easeInOut,
      delay: 0,
    });
  } else {
    TweenMax.to(model.rotation, 2, {
      ...targetRotation,
      onComplete: () => {
        if (isControlsEnabled) {
          controls.enabled = true;
        }
      },
      ease: Power4.easeInOut,
    });
    TweenMax.to(camera.position, 2, {
      ...targetPosition,
      ease: Power4.easeInOut,
    });
  }

  return () => {
    model.rotation && TweenMax.killTweensOf(model.rotation);
    camera.position && TweenMax.killTweensOf(camera.position);
  };
};

export default React.forwardRef(({ pose }, canvasRef) => {
  canvasRef = canvasRef || useRef();
  // const [pose, setPose] = useState(POSES.BACK);
  const [three, setThree] = useState(null);
  useEffect(() => SetupThree({ canvas: canvasRef.current, setThree }), []);
  useEffect(() => PoseShoe({ three, pose }), [three, pose]);
  return (
    <ThreeCanvas
      ref={canvasRef}
      variant={pose === POSES.SIDE ? "drag" : null}
    />
  );
});





import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { TweenMax, Circ, Power4, Linear } from "gsap";

import { assetUrl, media } from "../../../../utils";


export const POSES = {
  INITIAL: "INITIAL",
  FRONT: "FRONT",
  BACK: "BACK",
  SIDE_DIAGONAL: "SIDE_DIAGONAL",
  SIDE: "SIDE",
};

const ThreeCanvas = styled.canvas`
  outline: none;

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

const getPointLight = ({
  x = 0,
  y = 0,
  z = 0,
  intensity = 1,
  color = 0xffffff,
  castShadow = true,
  distance = null,
}) => {
  const light = new THREE.PointLight(color, intensity, distance);
  light.position.set(x, y, z);
  light.castShadow = castShadow;
  light.shadow.bias = -0.0001;
  light.shadow.mapSize.width = 1024 * 4;
  light.shadow.mapSize.height = 1024 * 4;

  // const spotLightHelper = new THREE.PointLightHelper(light, 0xff0000);
  // light.add(spotLightHelper);

  return light;
};

const SetupScene = async ({
  scene,
  camera,
  renderer,
  composer,
  setThree,
  controls,
  initialCameraRotation,
}) => {
  // renderer.shadowMap.enabled = true;

  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 1.5;
  camera.position.set(-5, 5, 45);

  // const hemiLight = new THREE.HemisphereLight(0xe6e79c, 0x080820, 2.5);
  // hemiLight.position.set(0, 8.854, 0);
  // scene.add(hemiLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 3.5);
  scene.add(ambientLight);

  const point_01 = getPointLight({
    x: 11.182,
    y: 12.426,
    z: 13.804,
    color: 0xffffff,
    intensity: 16.3,
    distance: 21.22,
  });
  scene.add(point_01);

  const point_02 = getPointLight({
    x: -23.292,
    y: 13.157,
    z: -9.399,
    color: 0xe5e0c0,
    distance: 32.22,
    intensity: 40.02,
  });
  scene.add(point_02);

  const gltf = await LoadModel({
    path: assetUrl("/images/karlkani/karlKani_v02/karlKani_painter_02.gltf"),
  });

  gltf.scene.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  
  const shoelace = await LoadModel({
    path: assetUrl("/images/karlkani/Gltf/shoelace_baked_01.glb"),
  });

  shoelace.scene.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });

  scene.add(gltf.scene);
  scene.add(shoelace.scene);

  setThree({
    scene,
    camera,
    renderer,
    composer,
    controls,
    initialCameraRotation,
    model: gltf.scene,
    shoelaceModel: shoelace.scene,
  });
};

const SetupThree = ({ canvas, setThree }) => {
  const [clampedWidth, clampedHeight] = [1996, 1996]; // Based on max dimensions in design
  const isDesktop = window.matchMedia(`(min-width: 768px)`).matches;
  const [width, height] = [
    Math.min(clampedWidth, window.innerWidth),
    Math.min(clampedHeight, window.innerHeight),
  ];
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(-5, 25, 75);

  const renderer = new THREE.WebGLRenderer({
    antialias: false, // @NOTE this would do something weird with the cursor on retina screens
    canvas,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.update();

  controls.enableKeys = false;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.enabled = false;

  const initialCameraRotation = camera.quaternion.clone();

  let animationFrameID;
  const update = () => {
    animationFrameID = requestAnimationFrame(update);
    if (controls.enabled) {
      controls.update();
    }
    composer.render();
  };
  update();


  const resize = () => {
    const [width, height] = [
      isDesktop ? Math.min(clampedWidth, window.innerWidth) : 420,
      isDesktop ? Math.min(clampedHeight, window.innerHeight) : 420,
    ];
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
  };
  window.addEventListener("resize", resize);

  resize();
  SetupScene({
    scene,
    camera,
    renderer,
    composer,
    controls,
    initialCameraRotation,
    animationDOMListener: canvas,
    setThree,
  });

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
        x: THREE.MathUtils.DEG2RAD * 0,
        y: THREE.MathUtils.DEG2RAD * 40,
        z: THREE.MathUtils.DEG2RAD * 30,
      };
      break;
    case POSES.BACK:
      return {
        x: THREE.MathUtils.DEG2RAD * 20,
        y: THREE.MathUtils.DEG2RAD * -145,
        z: THREE.MathUtils.DEG2RAD * 25,
      };
      break;
    case POSES.SIDE_DIAGONAL:
      return {
        x: THREE.MathUtils.DEG2RAD * 0,
        y: THREE.MathUtils.DEG2RAD * 0,
        z: THREE.MathUtils.DEG2RAD * 35,
      };
      break;

    case POSES.SIDE:
      return {
        x: THREE.MathUtils.DEG2RAD * 0,
        y: THREE.MathUtils.DEG2RAD * 180,
        z: THREE.MathUtils.DEG2RAD * 0,
      };
      break;
  }
};

const PoseShoe = ({ pose, three, percentage }) => {
  if (!three) return;
  const {
    scene,
    renderer,
    composer,
    camera,
    model,
    shoelaceModel,
    controls,
    initialCameraRotation,
  } = three;
  let isControlsEnabled = false;
  const isDesktop = window.matchMedia(`(min-width: 768px)`).matches;
  let targetRotation;
  let targetPosition = isDesktop
    ? { x: -5, y: 5, z: 40 }
    : { x: -5, y: 5, z: 40 };
    console.log(pose)
  switch (pose) {
    case POSES.INITIAL:
    case POSES.FRONT:
      targetRotation = GetPose(pose);
      targetPosition = { ...targetPosition, x: -2, y: 1, z: 3 };
      if (!isDesktop) {
        targetPosition = { ...targetPosition, x: -3 ,  z: -3};

      }
      break;
    case POSES.BACK:
      if (!isDesktop) {
        targetPosition = { ...targetPosition, y: 8, x: 1,  z: 100};
      } else {
        console.log("pose")
        targetPosition = { ...targetPosition, y: 1, x: 1, z: 3 };
      }
      targetRotation = GetPose(pose);
      break;
    case POSES.SIDE_DIAGONAL:
      if (isDesktop) {
        targetPosition = { ...targetPosition, z: -3, y: 6, z: 35 };
      } else {
        targetPosition = { ...targetPosition, x: -3, z: 5  };
      }
      targetRotation = GetPose(pose);
      break;

    case POSES.SIDE:
      targetRotation = GetPose(pose);
      targetPosition = { ...targetPosition, x: 2 };
      if (isDesktop) {
        targetPosition = { ...targetPosition, z: -3, x: 0, y: 0 };
      } else {
        targetPosition = { ...targetPosition, z: 55, x: 0, y: 0 };
      }
      isControlsEnabled = true;

      break;
  }
  if (controls.enabled) {
    controls.enabled = false;
    TweenMax.set(camera.position, { x: 0, y: 0, z: isDesktop ? 50 : 40 });
    camera.quaternion.set(0, 0, 0, 1);
  }
  if (pose == POSES.INITIAL) {
    TweenMax.set(camera.position, targetPosition);
    shoelaceModel.position =  {x: -5, y: 5, z: 40 }
    TweenMax.set(model.rotation, {
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

    TweenMax.to(camera.position, 2, {
      ...targetPosition,
      onUpdate: () => {},
      onComplete: () => {
      },
      ease: Power4.easeOut,
      delay: 0,
    });
    TweenMax.to(model.rotation, 2, {
      ...targetRotation,
      ease: Power4.easeInOut,
      delay: 0,
    });
  } else {
    TweenMax.to(model.rotation, 2, {
      ...targetRotation,
      onComplete: () => {
        if (isControlsEnabled) {
          controls.enabled = true;
        }
      },
      ease: Power4.easeInOut,
    });
    TweenMax.to(camera.position, 2, {
      ...targetPosition,
      ease: Power4.easeInOut,
    });
  }

  return () => {
    model.rotation && TweenMax.killTweensOf(model.rotation);
    camera.position && TweenMax.killTweensOf(camera.position);
    shoelaceModel.position && TweenMax.set(shoelaceModel.position);
  };
};

export default React.forwardRef(({ pose }, canvasRef) => {
  canvasRef = canvasRef || useRef();
  // const [pose, setPose] = useState(POSES.BACK);
  const [three, setThree] = useState(null);
  useEffect(() => SetupThree({ canvas: canvasRef.current, setThree }), []);
  useEffect(() => PoseShoe({ three, pose }), [three, pose]);
  return (
    <ThreeCanvas
      ref={canvasRef}
      variant={pose === POSES.SIDE ? "drag" : null}
    />
  );
});

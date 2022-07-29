import React, { useRef } from "react";
import { TweenMax, Circ, Power4, Linear } from "gsap";

export const loadAnimation = async ({ numFrames = 30, imagePrefix = "" }) => {
  const imagesToLoad = [];
  for (let i = 0; i < numFrames; i++) {
    const number = i < 10 ? `0000${i}` : `000${i}`;

    imagesToLoad.push(
      new Promise((resolve, reject) => {
        const image = new Image();
        image.src = `${imagePrefix.replace("{number}", number)}`;
        image.onload = () => resolve(image.src);
        image.onerror = reject;
      })
    );
  }
  return await Promise.all(imagesToLoad);
};

export const playAnimation = ({
  duration = 1,
  startFrame = 0,
  numFrames = 29,
  flipImagesRef,
}) => {
  let currentFrame = 0;
  flipImagesRef.current.forEach((flipImage, index) => {
    flipImage.style.display = index == currentFrame ? "block" : "none";
  });
  const flipbook = {
    frame: (value) => {
      if (value) {
        currentFrame = Math.floor(value);
        flipImagesRef.current.forEach((flipImage, index) => {
          flipImage.style.display = index == currentFrame ? "block" : "none";
        });
      }
      return currentFrame;
    },
  };
  const tween = TweenMax.fromTo(
    flipbook,
    duration,
    {
      frame: startFrame,
    },
    { frame: numFrames, paused: false }
  );
  return tween;
};

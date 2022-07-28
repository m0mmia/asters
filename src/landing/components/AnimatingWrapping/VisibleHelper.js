import React from "react";
import VisibilitySensor from "react-visibility-sensor";

const defaultSensorOptions = {
  partialVisibility: true,
  minTopValue: 100,
};

export default ({
  onChangedisplay,
  visibilitySensorOptions = defaultSensorOptions,
  children,
}) => {
  return (
    <VisibilitySensor
      onChange={(newVal) => {
        console.log("change", newVal);
        onChangedisplay(newVal);
      }}
      {...visibilitySensorOptions}
    >
      {children}
    </VisibilitySensor>
  );
};

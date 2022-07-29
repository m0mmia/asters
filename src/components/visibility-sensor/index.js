import React, { useState } from "react";
import { default as Container } from "react-visibility-sensor";

export function VisibilitySensor(props) {
  const [visible, setVisible] = useState(false);

  function onChange(value) {
    setVisible(value);
  }

  return <Container onChange={onChange}>{props.children(visible)}</Container>;
}

// Docs -> https://github.com/joshwnj/react-visibility-sensor

/* Example
<VisibilitySensor>
  {visible => {
    <h1>Hello {visible ? "World" : "Moon"}</h1>
  }}
</VisibilitySensor>
*/

// Props

/*
onChange: callback for whenever the element changes from being within the window viewport or not. Function is called with 1 argument (isVisible: boolean)
active: (default true) boolean flag for enabling / disabling the sensor. When active !== true the sensor will not fire the onChange callback.
partialVisibility: (default false) consider element visible if only part of it is visible. Also possible values are - 'top', 'right', 'bottom', 'left' - in case it's needed to detect when one of these become visible explicitly.
offset: (default {}) with offset you can define amount of px from one side when the visibility should already change. So in example setting offset={{top:10}} means that the visibility changes hidden when there is less than 10px to top of the viewport. Offset works along with partialVisibility
minTopValue: (default 0) consider element visible if only part of it is visible and a minimum amount of pixels could be set, so if at least 100px are in viewport, we mark element as visible.
intervalCheck: (default true) when this is true, it gives you the possibility to check if the element is in view even if it wasn't because of a user scroll
intervalDelay: (default 100) integer, number of milliseconds between c  hecking the element's position in relation the the window viewport. Making this number too low will have a negative impact on performance.
scrollCheck: (default: false) by making this true, the scroll listener is enabled.
scrollDelay: (default: 250) is the debounce rate at which the check is triggered. Ex: 250ms after the user stopped scrolling.
scrollThrottle: (default: -1) by specifying a value > -1, you are enabling throttle instead of the delay to trigger checks on scroll event. Throttle supercedes delay.
resizeCheck: (default: false) by making this true, the resize listener is enabled. Resize listener only listens to the window.
resizeDelay: (default: 250) is the debounce rate at which the check is triggered. Ex: 250ms after the user stopped resizing.
resizeThrottle: (default: -1) by specifying a value > -1, you are enabling throttle instead of the delay to trigger checks on resize event. Throttle supercedes delay.
containment: (optional) element to use as a viewport when checking visibility. Default behaviour is to use the browser window as viewport.
delayedCall: (default false) if is set to true, wont execute on page load ( prevents react apps triggering elements as visible before styles are loaded )
children: can be a React element or a function. If you provide a function, it will be called with 1 argument {isVisible: ?boolean, visibilityRect: Object}
*/

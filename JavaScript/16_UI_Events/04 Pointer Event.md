# Pointer Events

- Pointer Events are modern type of Events that can handle multiple pointing devices, such as a mouse, a pen/stylus, a Touchscreen, etc.
- every `mouse<event>`, there’s a `pointer<event>` that plays a similar role.
- We can replace `mouse<event>` events with `pointer<event>` in our code

  ![pointEvents & mouseEvents](./pointEvents%20&%20mouseEvents.png)

## Pointer event properties

- pointer event have the same properties as Mouse Event such as clientX/Y, target and many more,

  - `pointerId` - unique identifier of the pointer causing the event
  - `pointerType` - the pointing device type. Must be a string, one of: “mouse”, “pen” or “touch”.
  - `isPrimary` - is `true` for the primary pointer (the first finger in multi-touch).
  - `Width` - the width of the area where the pointer (e.g. a finger) touches the device. for mouse alsway 1
  - `Height` - the height of the area where the pointer touches the device. Where unsupported, it’s always 1.
  - `pressure` - the pressure of the pointer tip, in range from 0 to 1
  - `tangentialPressure` - the normalized tangential pressure.
  - `tiltX`, `tiltY`, `twist` - pen-specific properties that describe how the pen is positioned relative to the surface.

## Multi-touch

- At the first finger touch:
  - pointerdown with isPrimary=true and some pointerId.
- For the second finger and more fingers (assuming the first one is still touching):
  - pointerdown with isPrimary=false and a different pointerId for every finger.

## Event: pointercancel

- Prevent the default browser action to avoid `pointercancel`.

## Pointer capturing

- Method:
  - `elem.setPointerCapture(pointerId)` - binds events with the given pointerId to elem
  - `gotpointercapture` fires when an element uses `setPointerCapture` to enable capturing.
  - `lostpointercapture` fires when the capture is released: either explicitly with `releasePointerCapture` call, or automatically on `pointerup`/`pointercancel`.


## Go back to Drag and Drag

- [Drag and Drag](./03%20Drag_n_Drag.md)

## Now Learn about another Event which is Keyboard Event

- [Keyboard Event](./05%20KeyBoard%20Event.md)
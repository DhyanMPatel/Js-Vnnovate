# Keyboard Events

- Keyboard events should be used when we want to handle keyboard actions (virtual keyboard also counts). For instance, to react on arrow keys `Up` and `Down` or `hotkeys` (including combinations of keys).

## Keydown and keyup

- The `keydown` events happens when a key is pressed down, and then `keyup` – when it’s released.
- `event.key` property is use to get the character, and `event.code` property is use to get the "Physical key code".
- The `event.key` is exactly the character, and it will be different. But event.code is the same:

  ![Keyboard .key and .code](./keyboard%20key%20&%20code.png)

- Letter keys have codes `"Key<letter>"`: "KeyA", "KeyB" etc.
- Digit keys have codes: `"Digit<number>"`: "Digit0", "Digit1" etc.
- Special keys are coded by their names: "Enter", "Backspace", "Tab", "ShiftLeft", "ShiftRight" etc.

### Note

- Case matters: `"KeyZ"`, not `"keyZ"`.
- The only exception is `Fn` key that sometimes presents on a laptop keyboard. There’s no keyboard event for it, because it’s often implemented on lower level than OS.

## Auto-repeat

- When user press any key for a long time then it start `auto-repeat`.
- For events triggered by `auto-repeat`, the event object has `event.repeat` property set to true.

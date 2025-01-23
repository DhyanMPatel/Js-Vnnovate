# Keyboard Events

-

## Keydown and keyup

- The `keydown` events happens when a key is pressed down, and then `keyup` – when it’s released.
- The `event.key` is exactly the character, and it will be different. But event.code is the same:

  ![Keyboard .key and .code](./keyboard%20key%20&%20code.png)

- Letter keys have codes "Key<letter>": "KeyA", "KeyB" etc.
- Digit keys have codes: "Digit<number>": "Digit0", "Digit1" etc.
- Special keys are coded by their names: "Enter", "Backspace", "Tab" etc.

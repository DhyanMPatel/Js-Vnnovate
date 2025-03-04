# React Events

- React Events are function that triggered in response to user Interaction.

# Event Handling

- Common events like, `onClick`, `onSubmit`, `onChange`, `onInput`, `onMouseOver`, `onKeyDown`, `onKeyUp` etc.

## handling click event

- React uses `event handler` just like HTML but with JSX syntax.
- In React no need to call `addEventListener` to add listener to the DOM element after it is created.

- **`Note`**

  - React Events are written in camelCase syntax.
  - React Events handlers written inside `{...}`.
  - To pass an arguments to an event handler, use arrow function.

  ```js
  function App() {
    function handler(name = "Default") {
      alert(`Button Clicked ${name}`);
    }

    return <button onClick={handler}>Click</button>;

    return <button onClick={() => handler("Dhyan")}> Click </button>; // With Parameter in Function components.

    return <button onClick={this.handler.bind(this, pars)}> Click </button>; // Possible only in Class components.
  }

  export default App;
  ```

## Event Object (`event`).

- react also automatically pass an Object `event` to event handler.

  ```js
  function App() {
    function handler(event) {
      console.log(
        `target generated from ${event.target} and type ${event.type}`
      );
    }

    return <button onClick={() => handler()}> Click </button>;
  }

  export default App;
  ```

## Example

### Form Handling

- Use `onChange` and `onSubmit` events.

```js
import { useState } from "react";

function App() {
  const [text, setText] = useState("");

  function handleInput(event) {
    setText(event.target.value);
  }

  function handleForm(event) {
    event.preventDefaut();
    console.log(`Text: ${text}`);
  }

  return (
    <div>
      <form onSubmit={handleForm}>
        <input type="text" value={text} onChange={handleInput} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

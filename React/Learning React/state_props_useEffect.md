# Props

- props allow components to receive data from their `parent component`.
- props are **read-only** and can't change in child component.
- Props work just like `function argument` but for React components.

- Example

  ```jsx
  import React from "react";
  import { useState } from "react";

  // Simple Child with props
  function SimpleChild(props) {
    return <div>Hello, {props.name}</div>;
  }

  // Child with Destructing props
  function DestructuringChild({ name }) {
    return <div>Hello, {name}</div>;
  }

  // Child with Default props
  function DefaultChild({ name = "Default" }) {
    return <div>Hello, {name}</div>;
  }

  // Simple Child with props
  class ClassChild extends React.Component {
    render() {
      return <div>Hello, {this.props.name}</div>;
    }
  }

  function FuncChild({ setMessage }) {
    return (
      <button onClick={() => setMessage("Now Update")}>Update Message</button>
    );
  }

  // Parent Component
  function Parent(props) {
    const [message, setMessage] = useState("Waiting...");
    return (
      <div>
        <h3>{message}</h3>

        <SimpleChild name="Simple" />
        <DestructuringChild name="Destructuring" />
        <DefaultChild />
        <ClassChild name="Class" />
        <FuncChild setMessage={setMessage} />
      </div>
    );
  }

  export default Parent;
  ```

# State

- State is **built-in object** that allows components to manage `dynamic data`.
- When state change, the component automatically **re-render** to reflect the updates.
- State is **local to a component itself**.

- Example,

  ```js
  import { useState } from "react";
  function StateComponent() {
    const [count, setCount] = useState(0);
    const [user, setUser] = useState({ name: "User1", age: 20 });
    const [tasks, setTasks] = useState([
      "Learning React",
      "LifeCycle",
      "Props",
    ]);

    function countPlus3() {
      // /// This Methods not work, React batches updates for performance.
      // setCount(count + 1);
      // setCount(count + 1);
      // setCount(count + 1);

      setCount((prov) => prov + 1);
      setCount((prov) => prov + 1);
      setCount((prov) => prov + 1);
    }

    function addTask() {
      let task = prompt("What is Task to add?", undefined);
      if (task !== "" && task != null) {
        setTasks([...tasks, task]);
      }
    }
    return (
      <>
        <h2>State</h2>
        <div>{count}</div>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Update Count
        </button>
        <button onClick={countPlus3}>Increase by 3</button>
        <br />
        <br />

        {/* State With Object */}
        <div>
          User: {user.name}, age: {user.age}
        </div>
        <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
          Increase Age
        </button>
        <br />
        <br />

        {/* State with Array */}
        <div>
          <ul>
            {tasks.map((task) => (
              <li>{task}</li>
            ))}
          </ul>
        </div>
        <button onClick={() => addTask()}>add Task</button>
      </>
    );
  }

  export default StateComponent;
  ```

- **`Note`** :- State does not update immediately (State updates are Asynchronous). If we update state multiple times in a row, React batches updates for performance.

# UseEffect

- `useEffect()` is a **React Hook** for handling _side Effects in functional Components_.
- Side Effects like **Fetching data from API**, **Cleanup data**.

- `return` keyword used for cleanup data just like `componentWillUnmount()`.
- `[]` empty dpendency array use to run useEffect() only once.

```js

```

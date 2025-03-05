import { useState } from "react";
function StateComponent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "User1", age: 20 });
  const [tasks, setTasks] = useState(["Learning React", "LifeCycle", "Props"]);

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
      <button onClick={() => setCount((prev) => prev + 1)}>Update Count</button>
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

import React from "react";
import { useState } from "react";

function SimpleChild(props) {
  return <div>Hello, {props.name}</div>;
}
function DestructuringChild({ name }) {
  return <div>Hello, {name}</div>;
}
function DefaultChild({ name = "Default" }) {
  return <div>Hello, {name}</div>;
}

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

function Parent(props) {
  const [message, setMessage] = useState("Waiting...");
  return (
    <div>
      <h2>Props</h2>
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

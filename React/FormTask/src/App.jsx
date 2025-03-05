import "./App.css";
import Form from "./components/Form";
import Display from "./components/Display";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <Form setUser={setUser} />
      <Display />
    </>
  );
}

export default App;

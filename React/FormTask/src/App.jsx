import "./App.css";
import Form from "./components/Form";
import FormikForm from "./components/formikForm";
import Display from "./components/Display";
import { use, useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {}, [users]);

  return (
    <>
      {/* <Form setUsers={setUsers} users={users} /> */}
      <FormikForm />
      <Display />
    </>
  );
}

export default App;

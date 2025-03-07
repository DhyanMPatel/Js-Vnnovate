import "./App.css";
import Form from "./components/Form";
import FormikForm from "./components/formikForm";
import Display from "./components/Display";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState([])

  // useEffect(() => {}, [users]);

  // console.log(editUser);
  return (
    <>
      {/* <Form setUsers={setUsers} users={users} /> */}
      <FormikForm users={users} setUsers={setUsers} editUser={editUser} setEditUser = {setEditUser} />
      <Display users={users} setUsers={setUsers} setEditUser= {setEditUser} />
    </>
  );
}

export default App;

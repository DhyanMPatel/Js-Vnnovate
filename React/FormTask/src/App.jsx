import "./css/App.css";
import FormikForm from "./formikForm";
import Display from "./Display";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("UserData")) || []
  );
  const [editUser, setEditUser] = useState(
    JSON.parse(localStorage.getItem("EditUser")) || null
  );

  useEffect(() => {
    if (editUser) {
      localStorage.setItem("EditUser", JSON.stringify(editUser));
    } else {
      localStorage.removeItem("EditUser");
    }
  }, [editUser]);

  useEffect(() => {
    localStorage.setItem("UserData", JSON.stringify(users));
  }, [users]);

  return (
    <>
      <FormikForm
        users={users}
        setUsers={setUsers}
        editUser={editUser}
        setEditUser={setEditUser}
      />
      <Display users={users} setUsers={setUsers} setEditUser={setEditUser} />
    </>
  );
}

export default App;

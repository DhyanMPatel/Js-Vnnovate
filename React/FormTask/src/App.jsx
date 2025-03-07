import "./App.css";
import Form from "./components/Form";
import FormikForm from "./components/formikForm";
import Display from "./components/Display";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("UserData")) || []
  );
  const [editUser, setEditUser] = useState(
    JSON.parse(localStorage.getItem("EditUser")) || null
  );

  useEffect(() => {
    // console.log(editUser);
    if (editUser) {
      // console.log(`App EditUser: ${editUser.id}`);
      localStorage.setItem("EditUser", JSON.stringify(editUser));
    } else {
      localStorage.removeItem("EditUser");
    }
  }, [editUser]);

  useEffect(() => {
    localStorage.setItem("UserData", JSON.stringify(users));
  }, [users]);

  // console.log(editUser);
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

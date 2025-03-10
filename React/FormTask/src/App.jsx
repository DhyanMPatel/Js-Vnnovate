import "./css/App.css";
import FormikForm from "./formikForm";
import Display from "./Display";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("UserData")) || []
  );
  const [editUser, setEditUser] = useState(
    JSON.parse(localStorage.getItem("EditUser")) || null
  );

  const [showBtn, setShowBtn] = useState(true);

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
      <div className="m-4">
        <Button variant="contained" onClick={() => setShowBtn(!showBtn)}>
          {showBtn ? "Add User" : "Show List"}
        </Button>
      </div>
      {showBtn ? (
        <Display
          users={users}
          setUsers={setUsers}
          setEditUser={setEditUser}
          setShowBtn={setShowBtn}
        />
      ) : (
        <FormikForm
          users={users}
          setUsers={setUsers}
          editUser={editUser}
          setEditUser={setEditUser}
          setShowBtn={setShowBtn}
          showBtn={showBtn}
        />
      )}
    </>
  );
}

export default App;

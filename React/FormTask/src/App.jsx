import "./style/css/App.css";
import FormikForm from "./formikForm";
import Display from "./Display";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setShowBtn } from "./redux/slice/showBtnSlice";

function App() {
  // const [users, setUsers] = useState(
  //   JSON.parse(localStorage.getItem("UserData")) || []
  // );
  // const [editUser, setEditUser] = useState(
  //   JSON.parse(localStorage.getItem("EditUser")) || null
  // );

  // const [showBtn, setShowBtn] = useState(true);

  const users = useSelector((state) => state.users.value);
  const editUser = useSelector((state) => state.editUser.value);
  const showBtn = useSelector((state) => state.showBtn.value);
  const dispatch = useDispatch();

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
      {showBtn ? (
        <Display
        // users={users}
        // setUsers={setUsers}
        // setEditUser={setEditUser}
        // setShowBtn={setShowBtn}
        />
      ) : (
        <FormikForm
        // users={users}
        // setUsers={setUsers}
        // editUser={editUser}
        // setEditUser={setEditUser}
        // setShowBtn={setShowBtn}
        // showBtn={showBtn}
        />
      )}
    </>
  );
}

export default App;

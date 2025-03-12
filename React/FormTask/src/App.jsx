import "./style/css/App.css";
import FormikForm from "./pages/formikForm";
import Display from "./pages/Display";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const users = useSelector((state) => state.users.value);
  const editUser = useSelector((state) => state.editUser.value);
  const showBtn = useSelector((state) => state.showBtn.value);

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

  return <>{showBtn ? <Display /> : <FormikForm />}</>;
}

export default App;

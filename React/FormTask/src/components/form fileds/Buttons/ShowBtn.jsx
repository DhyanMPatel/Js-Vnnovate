import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setShowBtn } from "../../../redux/slice/showBtnSlice";
import { setEditUser } from "../../../redux/slice/editUserSlice";

function ShowBtn({ resetForm }) {
  const showBtn = useSelector((state) => state.showBtn.value);
  const dispatch = useDispatch();
  return (
    <>
      <div className="">
        {/* <Button variant="contained" onClick={() => setShowBtn(!showBtn)}>
                    {showBtn ? "Add User" : "Show List"}
                  </Button> */}
        <Button
          variant="contained"
          // resetForm={resetForm}
          onClick={() => {
            resetForm();
            dispatch(setEditUser(null));
            localStorage.removeItem("EditUser");
            dispatch(setShowBtn(!showBtn));
          }}
        >
          {showBtn ? "Add User" : "Show List"}
        </Button>
      </div>
    </>
  );
}
export default ShowBtn;

import { setEditUser } from "../../../redux/features/editUserSlice";
import { setShowBtn } from "../../../redux/features/showBtnSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function ResetBtn({ resetForm }) {
  const dispatch = useDispatch();
  return (
    <>
      <button
        type="reset"
        id="cancel"
        className="button"
        title="Clear Field"
        onClick={async () => {
          resetForm();

          // setEditUser(null);
          dispatch(setEditUser(null));
          localStorage.removeItem("EditUser");
          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: "All Fields are clear.",
            showConfirmButton: false,
            timer: 1500,
          });

          // setShowBtn(true);
          dispatch(setShowBtn(true));
        }}
      >
        Cancel
      </button>
    </>
  );
}

export default ResetBtn;

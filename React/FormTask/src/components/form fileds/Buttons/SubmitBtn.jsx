import { useSelector } from "react-redux";

function SubmitBtn() {
  const editUser = useSelector((state) => state.editUser.value);
  return (
    <button
      type="submit"
      id={editUser ? "update" : "create"}
      className="button"
      title={editUser ? "Update User" : "Create User"}
    >
      {editUser ? "Update" : "Create"}
    </button>
  );
}

export default SubmitBtn;

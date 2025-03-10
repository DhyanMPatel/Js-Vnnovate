import Swal from "sweetalert2";

export default function Buttons({
  editUser,
  resetForm,
  setEditUser,
  setShowBtn,
  showBtn,
}) {
  return (
    <>
      <button
        type="submit"
        id={editUser ? "update" : "create"}
        className="button"
        title={editUser ? "Update User" : "Create User"}
      >
        {editUser ? "Update" : "Create"}
      </button>

      <button
        type="reset"
        id="cancel"
        className="button"
        title="Clear Field"
        onClick={async () => {
          resetForm();
          setEditUser(null);
          localStorage.removeItem("EditUser");
          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: "All Fields are clear.",
            showConfirmButton: false,
            timer: 1500,
          });
          setShowBtn(true);
        }}
      >
        Cancel
      </button>
    </>
  );
}

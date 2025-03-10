import Swal from "sweetalert2";

export default function Buttons({ editUser, resetForm, setEditUser }) {
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "All User Fields are cleared",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
          setEditUser(null);
          localStorage.removeItem("EditUser");
        }}
      >
        Cancel
      </button>
    </>
  );
}

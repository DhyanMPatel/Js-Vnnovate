import { Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";

export default function Id({ /*editUser,*/ errors, touched }) {
  const editUser = useSelector((state) => state.editUser.value);
  return (
    <>
      <th>
        <label htmlFor="id">ID:</label>
      </th>
      <td
        className={`input-control ${
          editUser ? "" : errors.id && touched.id ? "error" : ""
        }`}
      >
        <Field
          id="id"
          name="id"
          placeholder="Enter your ID"
          autoComplete="off"
          className={`inputField ${editUser ? "default" : ""}`}
          disabled={!!editUser}
        />
        {editUser ? null : (
          <ErrorMessage
            name="id"
            render={(msg) => <div className="error">{msg}</div>}
          />
        )}
      </td>
    </>
  );
}

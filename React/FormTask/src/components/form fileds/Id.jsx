import { Field, ErrorMessage } from "formik";

export default function Id({ editUser, errors, touched }) {
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

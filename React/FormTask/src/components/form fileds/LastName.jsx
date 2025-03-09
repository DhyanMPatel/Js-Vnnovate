import { Field, ErrorMessage } from "formik";

export default function LastName({ errors, touched }) {
  return (
    <>
      <th>
        <label htmlFor="lastName">Last Name:</label>
      </th>
      <td
        className={`input-control ${
          errors.lastName && touched.lastName ? "error" : ""
        }`}
      >
        <Field
          id="lastName"
          name="lastName"
          placeholder="Enter your Last Name"
          className="inputField"
        />
        <ErrorMessage
          name="lastName"
          render={(msg) => <div className="error">{msg}</div>}
        />
      </td>
    </>
  );
}

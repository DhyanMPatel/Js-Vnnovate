import { Field, ErrorMessage } from "formik";

export default function BirthDate({ errors, touched }) {
  return (
    <>
      <th>
        <label htmlFor="birthDate">Birth Date:</label>
      </th>
      <td
        className={`input-control ${
          errors.birthDate && touched.birthDate ? "error" : ""
        }`}
      >
        <Field
          className="inputField"
          type="date"
          name="birthDate"
          id="birthDate"
        />
        <ErrorMessage
          name="birthDate"
          render={(msg) => <div className="error">{msg}</div>}
        />
      </td>
    </>
  );
}

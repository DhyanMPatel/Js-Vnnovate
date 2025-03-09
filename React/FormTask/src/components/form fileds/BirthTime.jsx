import { Field, ErrorMessage } from "formik";

export default function BirthTime({errors, touched}) {
  return (
    <>
      <th>
        <label htmlFor="birthTime">Birth Time:</label>
      </th>
      <td
        className={`input-control ${
          errors.birthTime && touched.birthTime ? "error" : ""
        }`}
      >
        <Field
          className="inputField"
          type="time"
          name="birthTime"
          id="birthTime"
        />
        <ErrorMessage
          name="birthTime"
          render={(msg) => <div className="error">{msg}</div>}
        />
      </td>
    </>
  );
}

import { Field, ErrorMessage } from "formik";

export default function FirstName({ errors, touched }) {
  return (
    <>
      
        <th>
          <label htmlFor="firstName">First Name:</label>
        </th>
        <td
          className={`input-control ${
            errors.firstName && touched.firstName ? "error" : ""
          }`}
        >
          <Field
            id="firstName"
            name="firstName"
            placeholder="Enter your First Name"
            autoComplete="off"
            className="inputField"
          />
          <ErrorMessage
            name="firstName"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </td>
      
    </>
  );
}

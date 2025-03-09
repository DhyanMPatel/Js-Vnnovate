import { Field, ErrorMessage } from "formik";

export default function Country({ errors, touched }) {
  return (
    <>
      <th>
        <label htmlFor="country">Country:</label>
      </th>
      <td
        className={`input-control ${
          errors.country && touched.country ? "error" : ""
        }`}
      >
        <Field as="select" name="country" id="country">
          <option value="Country">Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </Field>
        <ErrorMessage
          name="country"
          render={(msg) => <div className="error">{msg}</div>}
        />
      </td>
    </>
  );
}

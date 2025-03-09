import { Field, ErrorMessage } from "formik";

export default function State({ errors, touched }) {
  return (
    <>
      <th>
        <label htmlFor="state">State:</label>
      </th>
      <td
        className={`input-control ${
          errors.state && touched.state ? "error" : ""
        }`}
      >
        <Field as="select" name="state" id="state">
          <option value="State">State</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Kerala">Kerala</option>
          <option value="Rajastan">Rajastan</option>
          <option value="California">California</option>
        </Field>
        <ErrorMessage
          name="state"
          render={(msg) => <div className="error">{msg}</div>}
        />
      </td>
    </>
  );
}

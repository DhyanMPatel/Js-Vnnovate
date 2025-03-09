import { Field, ErrorMessage } from "formik";

export default function City({errors, touched}) {
  return (
    <>
      <th>
        <label htmlFor="city">City:</label>
      </th>
      <td
        className={`input-control ${
          errors.city && touched.city ? "error" : ""
        }`}
      >
        <Field as="select" name="city" id="city">
          <option value="City">City</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Surat">Surat</option>
          <option value="Vadodara">Vadodara</option>
          <option value="Toronto">Toronto</option>
        </Field>
        <ErrorMessage
          name="city"
          render={(msg) => <div className="error">{msg}</div>}
        />
      </td>
    </>
  );
}

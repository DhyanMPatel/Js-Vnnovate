import { Field, ErrorMessage } from "formik";

export default function Gender({errors, touched}) {
  return (
    <>
      <th>Gender:</th>
      <td
        className={`input-control ${
          errors.gender && touched.gender ? "error" : ""
        }`}
      >
        <Field type="radio" name="gender" value="Male" id="Male" />
        <label htmlFor="Male">Male</label>
        <Field type="radio" name="gender" value="Female" id="Female" />
        <label htmlFor="Female">Female</label>
        <Field
          type="radio"
          name="gender"
          value="Transgender"
          id="Transgender"
        />
        <label htmlFor="Transgender">Transgender</label>
        <ErrorMessage
          name="gender"
          render={(msg) => <div className="error">{msg}</div>}
        />
      </td>
    </>
  );
}

import { Field, ErrorMessage } from "formik";

export default function Hobbies({errors, touched}) {
  return (
    <>
      <th>Hobbies:</th>
      <td>
        <div
          className={`input-control ${
            errors.hobbies && touched.hobbies ? "error" : ""
          }`}
        >
          <Field type="checkbox" name="hobbies" id="cricket" value="Cricket" />
          <label htmlFor="cricket">Cricket</label>
          <Field
            type="checkbox"
            name="hobbies"
            id="football"
            value="Football"
          />
          <label htmlFor="football">Football</label>
          <Field type="checkbox" name="hobbies" id="reading" value="Reading" />
          <label htmlFor="reading">Reading</label>
          <Field
            type="checkbox"
            name="hobbies"
            id="travelling"
            value="Travelling"
          />
          <label htmlFor="travelling">Travelling</label>
          <Field type="checkbox" name="hobbies" id="cycling" value="Cycling" />
          <label htmlFor="cycling">Cycling</label>
          <Field type="checkbox" name="hobbies" id="others" value="Others" />
          <label htmlFor="others">Others</label>
          <ErrorMessage
            name="hobbies"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </div>
      </td>
    </>
  );
}

import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const INITIAL_VALUE = {
  id: "",
  firstName: "",
  lastName: "",
  gender: "",
  hobbies: [],
  country: "",
  state: "",
  city: "",
  birthDate: "",
  birthTime: "",
};
const idRegex = /^[0-9]+$/;
const users = JSON.parse(localStorage.getItem("UserData"));
const availableIds = [];

for (let user in users) {
  availableIds.push(users[user].id);
}

const FORM_VALIDATION = Yup.object().shape({
  id: Yup.string()
    .required("Enter your ID!")
    .matches(idRegex, "Id should be Positive Number")
    .notOneOf(availableIds, "ID is already available"),
  firstName: Yup.string().min(3).max(20).required("Enter your First Name"),
  lastName: Yup.string().min(3).max(20).required("Last Name is required!"),
  gender: Yup.string().required("Gender is required!"),
  hobbies: Yup.array()
    .min(1)
    .of(Yup.string().required())
    .required("Last Name is required!"),
  country: Yup.string()
    .oneOf(["India", "USA", "UK", "Canada", "Australia"])
    .required("Last Name is required!"),
  state: Yup.string()
    .oneOf(["Gujarat", "Kerala", "Rajastan", "California"])
    .required("Last Name is required!"),
  city: Yup.string()
    .oneOf(["Ahmedabad", "Surat", "Vadodara", "Toronto"])
    .required("Last Name is required!"),
  birthDate: Yup.date().required("Last Name is required!"),
  birthTime: Yup.string().required("Last Name is required!"),
});

export default function FormikForm() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("UserData")) || [];
    setUsers(storedUsers);
  }, []);
  return (
    <>
      <div className="containerForm">
        <div className="formDiv">
          <Formik
            initialValues={{ ...INITIAL_VALUE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              const updatedUsers = [...users, values];
              setUsers(updatedUsers);
              localStorage.setItem("UserData", JSON.stringify(updatedUsers));
            }}
            onReset={INITIAL_VALUE}
          >
            <Form>
              <table>
                <tbody>
                  <tr id="idTr">
                    <th>
                      <label htmlFor="id">ID:</label>
                    </th>
                    <td className={`input-control`}>
                      <Field
                        id="id"
                        name="id"
                        placeholder="Enter your ID"
                        autoComplete="off"
                      />
                      <ErrorMessage
                        name="id"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="firstName">First Name:</label>
                    </th>
                    <td className={`input-control `}>
                      <Field
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your First Name"
                        autoComplete="off"
                      />
                      <ErrorMessage
                        name="firstName"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="lastName">Last Name:</label>
                    </th>
                    <td className={`input-control`}>
                      <Field
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your Last Name"
                      />
                      <ErrorMessage
                        name="lastName"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Gender:</th>
                    <td className={`input-control`}>
                      <Field
                        type="radio"
                        name="gender"
                        value="Male"
                        id="Male"
                      />
                      <label htmlFor="Male">Male</label>
                      <Field
                        type="radio"
                        name="gender"
                        value="Female"
                        id="Female"
                      />
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
                  </tr>
                  <tr id="hobbies">
                    <th>Hobbies:</th>
                    <td>
                      <div className={`input-control`}>
                        <Field
                          type="checkbox"
                          name="hobbies"
                          id="cricket"
                          value="Cricket"
                        />
                        <label htmlFor="cricket">Cricket</label>
                        <Field
                          type="checkbox"
                          name="hobbies"
                          id="football"
                          value="Football"
                        />
                        <label htmlFor="football">Football</label>
                        <Field
                          type="checkbox"
                          name="hobbies"
                          id="reading"
                          value="Reading"
                        />
                        <label htmlFor="reading">Reading</label>
                        <Field
                          type="checkbox"
                          name="hobbies"
                          id="travelling"
                          value="Travelling"
                        />
                        <label htmlFor="travelling">Travelling</label>
                        <Field
                          type="checkbox"
                          name="hobbies"
                          id="cycling"
                          value="Cycling"
                        />
                        <label htmlFor="cycling">Cycling</label>
                        <Field
                          type="checkbox"
                          name="hobbies"
                          id="others"
                          value="Others"
                        />
                        <label htmlFor="others">Others</label>
                        <ErrorMessage
                          name="hobbies"
                          render={(msg) => <div className="error">{msg}</div>}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="country">Country:</label>
                    </th>
                    <td className={`input-control`}>
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
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="state">State:</label>
                    </th>
                    <td className={`input-control`}>
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
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="city">City:</label>
                    </th>
                    <td className={`input-control`}>
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
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="birthDate">Birth Date:</label>
                    </th>
                    <td className={`input-control`}>
                      <Field type="date" name="birthDate" id="birthDate" />
                      <ErrorMessage
                        name="birthDate"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="birthTime">Birth Time:</label>
                    </th>
                    <td className={`input-control`}>
                      <Field type="time" name="birthTime" id="birthTime" />
                      <ErrorMessage
                        name="birthTime"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="buttons">
                <button
                  type="submit"
                  id="create"
                  className="button"
                  title="Create New User"
                >
                  Create
                </button>
                <button
                  type="reset"
                  id="cancel"
                  className="button"
                  title="Create New User"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

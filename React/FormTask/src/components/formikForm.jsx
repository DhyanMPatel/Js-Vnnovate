import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";

// const availableIds = (users && Array.isArray(users)) ? users.map((user) => user.id) : [];

export default function FormikForm({ users, setUsers, editUser, setEditUser }) {
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("UserData")) || [];
    setUsers(storedUsers);
  }, []);

  const INITIAL_VALUE = {
    id: editUser ? editUser.id : "",
    firstName: editUser ? editUser.firstName : "",
    lastName: editUser ? editUser.lastName : "",
    gender: editUser ? editUser.gender : "",
    hobbies: editUser ? editUser.hobbies : [],
    country: editUser ? editUser.country : "",
    state: editUser ? editUser.state : "",
    city: editUser ? editUser.city : "",
    birthDate: editUser ? editUser.birthDate : "",
    birthTime: editUser ? editUser.birthTime : "",
  };
  const idRegex = /^[0-9]+$/;
  // const users = JSON.parse(localStorage.getItem("UserData"));

  const availableIds = useMemo(() => {
    return users && Array.isArray(users) ? users.map((user) => user.id) : [];
  }, [users]);

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
      .required("Hobbies are required!"),

    country: Yup.string()
      .oneOf(
        ["India", "USA", "UK", "Canada", "Australia"],
        "Please, Select the Country"
      )
      .required("Country is required!"),

    state: Yup.string()
      .oneOf(
        ["Gujarat", "Kerala", "Rajastan", "California"],
        "Please, Select the State"
      )
      .required("State is required!"),

    city: Yup.string()
      .oneOf(
        ["Ahmedabad", "Surat", "Vadodara", "Toronto"],
        "Please, Select the City"
      )
      .required("City is required!"),

    birthDate: Yup.date().required("Birth Date is required!"),

    birthTime: Yup.string().required("Birth Time is required!"),
  });

  console.log(`editUser: ${{editUser}}`);

  return (
    <>
      <div className="containerForm">
        <div className="formDiv">
          <Formik
            initialValues={{ ...INITIAL_VALUE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values, { resetForm }) => {
              if (editUser) {
                const updatedUsers = users.map((user) => {
                  user.id === editUser.id ? { ...values } : user;
                });
                setUsers(updatedUsers);
                localStorage.setItem("UserData", JSON.stringify(updatedUsers));
                setEditUser(null);
              } else {
                const updatedUsers = [...users, values];
                setUsers(updatedUsers);

                localStorage.setItem("UserData", JSON.stringify(updatedUsers));

                resetForm();
              }
            }}
          >
            {({ errors, touched, resetForm }) => (
              <Form>
                <table>
                  <tbody>
                    <tr id="idTr">
                      <th>
                        <label htmlFor="id">ID:</label>
                      </th>
                      <td
                        className={`input-control ${
                          errors.id && touched.id ? "error" : ""
                        }`}
                      >
                        <Field
                          id="id"
                          name="id"
                          placeholder="Enter your ID"
                          autoComplete="off"
                          className="inputField"
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
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
                      <th>Gender:</th>
                      <td
                        className={`input-control ${
                          errors.gender && touched.gender ? "error" : ""
                        }`}
                      >
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
                        <div
                          className={`input-control ${
                            errors.hobbies && touched.hobbies ? "error" : ""
                          }`}
                        >
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
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
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
                    {editUser ? "Update" : "Create"}
                  </button>
                  <button
                    type="reset"
                    id="cancel"
                    className="button"
                    title="Create New User"
                    // onClick={resetForm}
                    onClick={() => {
                      resetForm();
                      setEditUser(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

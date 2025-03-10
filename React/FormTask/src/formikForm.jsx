import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import "./css/form.css";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Id from "./components/form fileds/Id";
import FirstName from "./components/form fileds/FirstName";
import LastName from "./components/form fileds/LastName";
import Gender from "./components/form fileds/Gender";
import Hobbies from "./components/form fileds/Hobbies";
import Country from "./components/form fileds/Country";
import State from "./components/form fileds/State";
import City from "./components/form fileds/City";
import BirthDate from "./components/form fileds/BirthDate";
import BirthTime from "./components/form fileds/BirthTime";
import Buttons from "./components/form fileds/Buttons";

export default function FormikForm({ users, setUsers, editUser, setEditUser }) {
  const [initialValues, setInitialValues] = useState({
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
  });

  useEffect(() => {
    if (editUser) {
      setInitialValues(editUser);
    } else {
      setInitialValues({
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
      });
    }
  }, [editUser]);

  const idRegex = /^[0-9]+$/;

  const availableIds = users.map((user) => user.id);

  const FORM_VALIDATION = Yup.object().shape({
    id: Yup.string()
      .required("Enter your ID!")
      .matches(idRegex, "Id should be Positive Number")
      .notOneOf(editUser ? [] : availableIds, "ID is already available"), // Validation Here for Id

    firstName: Yup.string().min(2).max(20).required("Enter your First Name"),

    lastName: Yup.string().min(2).max(20).required("Last Name is required!"),

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

  return (
    <>
      <div className="containerForm">
        <div className="formDiv">
          <Formik
            enableReinitialize    // Required for update operation
            initialValues={initialValues} // Remove {{...}}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values, { resetForm }) => {
              if (editUser) {
                await Swal.fire({
                  title: "Do you want to save the changes?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Save",
                  denyButtonText: `Don't save`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire("Saved!", "", "success");
                    const updatedUsers = users.map((user) =>
                      user.id === editUser.id ? { ...values } : user
                    );
                    setUsers(updatedUsers);
                    localStorage.setItem(
                      "UserData",
                      JSON.stringify(updatedUsers)
                    );

                    setEditUser(null);
                    localStorage.removeItem("EditUser");
                    resetForm();
                  } else if (result.isDenied) {
                    Swal.fire("Changes are not saved");
                    setEditUser(null);
                    localStorage.removeItem("EditUser");
                    resetForm();
                  }
                });
              } else {
                const updatedUsers = [...users, values];
                setUsers(updatedUsers);
                localStorage.setItem("UserData", JSON.stringify(updatedUsers));

                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "New User Created",
                  showConfirmButton: false,
                  timer: 1500,
                });
                resetForm();
              }
            }}
          >
            {({ errors, touched, resetForm }) => (
              <Form>
                <table>
                  <tbody>
                    <tr className="idTr">
                      <Id
                        editUser={editUser}
                        errors={errors}
                        touched={touched}
                      />
                    </tr>
                    <tr className="firstNameTr">
                      <FirstName errors={errors} touched={touched} />
                    </tr>
                    <tr className="lastNameTr">
                      <LastName errors={errors} touched={touched} />
                    </tr>
                    <tr className="genderTr">
                      <Gender errors={errors} touched={touched} />
                    </tr>
                    <tr className="hobbiesTr">
                      <Hobbies errors={errors} touched={touched} />
                    </tr>
                    <tr className="countryTr">
                      <Country errors={errors} touched={touched} />
                    </tr>
                    <tr className="stateTr">
                      <State errors={errors} touched={touched} />
                    </tr>
                    <tr className="cityTr">
                      <City errors={errors} touched={touched} />
                    </tr>
                    <tr className="birthDateTr">
                      <BirthDate errors={errors} touched={touched} />
                    </tr>
                    <tr className="birthTimeTr">
                      <BirthTime errors={errors} touched={touched} />
                    </tr>
                  </tbody>
                </table>
                <div className="buttons">
                  <Buttons
                    editUser={editUser}
                    resetForm={resetForm}
                    setEditUser={setEditUser}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

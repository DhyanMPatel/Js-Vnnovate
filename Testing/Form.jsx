import { useEffect, useState } from "react";
import "../css/form.css";
import { useFormik } from "formik";

export default function Form({ setUsers, users }) {
  // const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("UserData")) || [];
    setUsers(storedUsers);
  }, []);

  const idHandler = (errors) => {
    const idValue = user.id.trim();
    const idRegex = /^[0-9]+$/;
    // let isValid = true;
    // setUser({ ...user, id: e.target.value });

    const users = JSON.parse(localStorage.getItem("UserData"));
    let availableIds = [];

    for (let user in users) {
      availableIds.push(users[user].id);
    }

    if (!idValue) {
      errors.id = "Id is Required!";
    } else if (!idRegex.test(idValue)) {
      errors.id = "Id should be number!";
    } else if (availableIds.includes(idValue)) {
      errors.id = "Id is Already available!";
    } else {
      delete errors.id;
    }
  };
  const firstNameHandler = (errors) => {
    const firstNameValue = user.firstName.trim();
    if (!firstNameValue) {
      errors.firstName = "First Name is required!";
    }
  };
  const lastNameHandler = (errors) => {
    const lastNameValue = user.lastName.trim();
    if (!lastNameValue) {
      errors.lastName = "Last Name is required!";
    }
  };
  const genderHandler = (errors) => {
    const genderValue = user.gender;
    if (!genderValue) {
      errors.gender = "Gender is required!";
    }
  };
  const hobbiesHandler = (errors) => {
    const hobbiesValue = user.hobbies;
    if (hobbiesValue.length == 0) {
      errors.hobbies = "Hobbies is required!";
    }
  };
  const countryHandler = (errors) => {
    const countryValue = user.country;

    if (!countryValue || countryValue === "Country") {
      errors.country = "Country is required!";
    }
  };
  const stateHandler = (errors) => {
    const stateValue = user.state;
    if (!stateValue || stateValue === "State") {
      errors.state = "State is required!";
    }
  };
  const cityHandler = (errors) => {
    const cityValue = user.city;
    if (!cityValue || cityValue === "City") {
      errors.city = "City is required!";
    }
  };
  const birthDateHandler = (errors) => {
    const birthDateValue = user.birthDate;
    if (!birthDateValue) {
      errors.birthDate = "Birth Date is required!";
    }
  };
  const birthTimeHandler = (errors) => {
    const birthTimeValue = user.birthTime;
    if (!birthTimeValue) {
      errors.birthTime = "Birth Time is required!";
    }
  };

  const validate = (e) => {
    const errors = {};

    idHandler(errors);
    firstNameHandler(errors);
    lastNameHandler(errors);
    genderHandler(errors);
    hobbiesHandler(errors);
    countryHandler(errors);
    stateHandler(errors);
    cityHandler(errors);
    birthDateHandler(errors);
    birthTimeHandler(errors);

    return errors;
  };

  const clearData = () => {
    setUser({
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
  };

  function displayData(e) {
    e.preventDefault();
    const validateErrors = validate(e);
    if (Object.keys(validateErrors).length === 0) {
      const updatedUsers = [...users, user];
      setUsers(updatedUsers);
      console.log(updatedUsers);
      clearData();
      setErrors({});

      console.log(user.hobbies);
      console.log("submited");

      localStorage.setItem("UserData", JSON.stringify(updatedUsers));
    } else {
      setErrors(validateErrors);
    }
  }

  function hobbiesSelector(e) {
    const { value, checked } = e.target;

    if (checked) {
      setUser({ ...user, hobbies: [...user.hobbies, value] });
    } else {
      setUser({
        ...user,
        hobbies: user.hobbies.filter((elem) => elem !== value),
      });
    }
  }

  function selectorHandler(e) {
    if (e.target.id === "country") {
      setUser({ ...user, country: e.target.value });
    } else if (e.target.id === "state") {
      setUser({ ...user, state: e.target.value });
    } else if (e.target.id === "city") {
      setUser({ ...user, city: e.target.value });
    }
  }

  const Formik = useFormik({
    initialValues: {
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
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="containerForm">
      <div className="formDiv">
        <form
          id="form"
          name="form"
          /*onSubmit={(e) => displayData(e)}*/ onSubmit={Formik.handleSubmit}
        >
          <table>
            <tbody>
              <tr id="idTr">
                <th>ID:</th>
                <td className={`input-control ${errors.id ? "error" : ""}`}>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    placeholder="Enter your ID"
                    // value={user.id}
                    value={Formik.values.id}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    // onChange={(e) => idHandler(e)}
                    // onChange={(e) => setUser({ ...user, id: e.target.value })}
                  />
                  {errors.id && <span className="error">{errors.id}</span>}
                </td>
              </tr>
              <tr>
                <th>First Name:</th>
                <td className={`input-control ${errors.firstName && "error"}`}>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter Your First name"
                    // value={user.firstName}
                    // onChange={(e) =>
                    //   setUser({ ...user, firstName: e.target.value })
                    // }
                    value={Formik.values.firstName}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {errors.firstName && (
                    <span className="error">{errors.firstName}</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>Last Name:</th>
                <td className={`input-control ${errors.lastName && "error"}`}>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Your Last name"
                    // value={user.lastName}
                    // onChange={(e) =>
                    //   setUser({ ...user, lastName: e.target.value })
                    // }
                    value={Formik.values.lastName}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {errors.lastName && (
                    <span className="error">{errors.lastName}</span>
                  )}
                </td>
              </tr>
              <tr id="genders">
                <th>Gender:</th>
                <td>
                  <div className={`input-control ${errors.gender && "error"}`}>
                    <input
                      type="radio"
                      name="gender"
                      id="Male"
                      value="Male"
                      checked={user.gender === "Male"}
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                    />
                    <label htmlFor="Male">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      id="Female"
                      value="Female"
                      checked={user.gender === "Female"}
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                    />
                    <label htmlFor="Female">Female</label>
                    <input
                      type="radio"
                      name="gender"
                      id="Transgender"
                      value="Transgender"
                      checked={user.gender === "Transgender"}
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                    />
                    <label htmlFor="Transgender">Transgender</label>
                    {errors.gender && (
                      <span className="error">{errors.gender}</span>
                    )}
                  </div>
                </td>
              </tr>
              <tr id="hobbies">
                <th>Hobbies:</th>
                <td>
                  <div className={`input-control ${errors.hobbies && "error"}`}>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Cricket"
                      value="Cricket"
                      onChange={(e) => hobbiesSelector(e)}
                    />
                    <label htmlFor="Cricket">Cricket</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Football"
                      value="Football"
                      onChange={(e) => hobbiesSelector(e)}
                    />
                    <label htmlFor="Football">Football</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Reading"
                      value="Reading"
                      onChange={(e) => hobbiesSelector(e)}
                    />
                    <label htmlFor="Reading">Reading</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Travelling"
                      value="Travelling"
                      onChange={(e) => hobbiesSelector(e)}
                    />
                    <label htmlFor="Travelling">Travelling</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Cycling"
                      value="Cycling"
                      onChange={(e) => hobbiesSelector(e)}
                    />
                    <label htmlFor="Cycling">Cycling</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Others"
                      value="Others"
                      onChange={(e) => hobbiesSelector(e)}
                    />
                    <label htmlFor="Others">Others</label>
                    {errors.hobbies && (
                      <span className="error">{errors.hobbies}</span>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Country:</th>
                <td className={`input-control ${errors.country && "error"}`}>
                  <select
                    name="country"
                    id="country"
                    onChange={selectorHandler}
                  >
                    <option value="Country">Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                  {errors.country && (
                    <span className="error">{errors.country}</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>State:</th>
                <td className={`input-control ${errors.state && "error"}`}>
                  <select name="state" id="state" onChange={selectorHandler}>
                    <option value="State">State</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Rajastan">Rajastan</option>
                    <option value="California">California</option>
                  </select>
                  {errors.state && (
                    <span className="error">{errors.state}</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>City:</th>
                <td className={`input-control ${errors.city && "error"}`}>
                  <select name="city" id="city" onChange={selectorHandler}>
                    <option value="City">City</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Surat">Surat</option>
                    <option value="Vadodara">Vadodara</option>
                    <option value="Toronto">Toronto</option>
                  </select>
                  {errors.city && <span className="error">{errors.city}</span>}
                </td>
              </tr>
              <tr>
                <th>Birth Date:</th>
                <td className={`input-control ${errors.birthDate && "error"}`}>
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    // value={user.birthDate}
                    // onChange={(e) =>
                    //   setUser({ ...user, birthDate: e.target.value })
                    // }
                    value={Formik.values.birthDate}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {errors.birthDate && (
                    <span className="error">{errors.birthDate}</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>Birth Time:</th>
                <td className={`input-control ${errors.birthTime && "error"}`}>
                  <input
                    type="time"
                    name="birthTime"
                    id="birthTime"
                    // value={user.birthTime}
                    // onChange={(e) =>
                    //   setUser({ ...user, birthTime: e.target.value })
                    // }
                    value={Formik.values.birthTime}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {errors.birthTime && (
                    <span className="error">{errors.birthTime}</span>
                  )}
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
              // onClick={() => displayData()}
            >
              Create
            </button>
            {/* <button
            type="submit"
            id="update"
            className="button"
            title="Create New User"
          >
            Update
          </button> */}
            <button
              type="button"
              id="cancel"
              className="button"
              title="Create New User"
              onClick={() => clearData()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// export default Form;

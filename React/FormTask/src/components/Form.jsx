import { useEffect, useState } from "react";
import "../css/form.css";

export default function Form() {
  const [users, setUsers] = useState([]);
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
  },[]);

  // const idHandler = (e) => {
  //   const idValue = parseInt(user.id.trim());
  //   const idRegex = /^[0-9]+$/;
  //   let isValid = true;
  //   setUser({ ...user, id: e.target.value });

  //   const users = JSON.parse(localStorage.getItem("UserData"));
  //   let availableIds = [];

  //   for(let user in users){
  //     availableIds.push(users[user].id);
  //   }
  //   if (e.target.name === "id" && e.target.value !== "") {
  //     if (idRegex.test(idValue)) {
  //       setErrors({ ...errors, id: "ID should be Positive Number" });
  //       isValid = false;
  //     } else if(availableIds.includes(idValue)){
  //       setErrors({ ...errors, id: "ID already exists" });
  //       isValid = false;
  //     } else {
  //       setErrors(errors.filter((elem) => elem !== "id"));
  //     }
  //   }
  //   return isValid;
  // };

  const validate = () => {
    const errors = {};
    // let isValid = true;
    if (!user.id.trim()) {
      errors.id = "ID is required";
      // setErrors({...errors, id: "ID is required"});
      // isValid = false;
    }
    if (!user.firstName.trim()) {
      errors.firstName = "First Name is required";
      // setErrors({...errors, firstName: "First Name is required"});
      // isValid = false;
    }
    if (!user.lastName.trim()) {
      errors.lastName = "Last Name is required";
      // setErrors({...errors, lastName: "Last Name is required"});
      // isValid = false;
    }
    if (!user.gender) {
      errors.gender = "Gender is required";
      // setErrors({...errors, gender: "Gender is required"});
      // isValid = false;
    }
    if (user.hobbies.length === 0) {
      errors.hobbies = "Hobbies is required";
      // setErrors({...errors, hobbies: "Hobbies is required"});
      // isValid = false;
    }
    if (user.country === "Country" || !user.country) {
      errors.country = "Country is required";
      // setErrors({...errors, country: "Country is required"});
      // isValid = false;
    }
    if (user.state === "State" || !user.state) {
      errors.state = "State is required";
      // setErrors({...errors, state: "State is required"});
      // isValid = false;
    }
    if (user.city === "City" || !user.city) {
      errors.city = "City is required";
      // setErrors({...errors, city: "City is required"});
      // isValid = false;
    }
    if (!user.birthDate) {
      errors.birthDate = "Birth Date is required";
      // setErrors({...errors, birthDate: "Birth Date is required"});
      // isValid = false;
    }
    if (!user.birthTime) {
      errors.birthTime = "Birth Time is required";
      // setErrors({...errors, birthTime: "Birth Time is required"});
      // isValid = false;
    }
    // console.log(errors);
    return errors;
    // return isValid ? {} : errors;
  };

  async function displayData(e) {
    e.preventDefault();
    const validateErrors = validate();
    if (Object.keys(validateErrors).length === 0) {
      const updatedUsers = [...users, user];
      setUsers(updatedUsers);
      console.log(updatedUsers);
    //   setUser({
    //     id: "",
    // firstName: "",
    // lastName: "",
    // gender: "",
    // hobbies: [],
    // country: "",
    // state: "",
    // city: "",
    // birthDate: "",
    // birthTime: "",
    //   });
      localStorage.setItem("UserData", JSON.stringify(updatedUsers));
      setErrors({})
      
      console.log(user.id);
      console.log(user.firstName);
      console.log(user.lastName);
      console.log(user.gender);
      console.log(user.hobbies);
      console.log(user.country);
      console.log(user.state);
      console.log(user.city);
      console.log(user.birthDate);
      console.log(user.birthTime);

    } else {
      console.log(validateErrors);
      setErrors(validateErrors);
    }
  }

  

  function hobbiesHandler(e) {
    const { value, checked } = e.target;

    if (checked) {
      setUser({ ...user, hobbies: [...user.hobbies, value] });
      //   setHobbies([...hobbies, value]);
    } else {
      setUser({
        ...user,
        hobbies: user.hobbies.filter((elem) => elem !== value),
      });
      //   setHobbies(hobbies.filter((elem) => elem !== value));
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

  return (
    <div className="container">
      <div className="formDiv">
        <form id="form" name="form" onSubmit={(e)=> displayData(e)}>
          <table>
            <tbody>
              <tr id="idTr">
                <th>ID:</th>
                <td className={`input-control ${errors.id ? "error" : ""}`}>
                  <input
                    type="text"
                    id="Id"
                    placeholder="Enter your ID"
                    value={user.id}
                    // onChange={(e) => idHandler(e)}
                    onChange={(e) => setUser({ ...user, id: e.target.value })}
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
                    name="First Name"
                    placeholder="Enter Your First name"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
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
                    name="Last Name"
                    placeholder="Enter Your Last name"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
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
                      onChange={hobbiesHandler}
                    />
                    <label htmlFor="Cricket">Cricket</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Football"
                      value="Football"
                      onChange={hobbiesHandler}
                    />
                    <label htmlFor="Football">Football</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Reading"
                      value="Reading"
                      onChange={hobbiesHandler}
                    />
                    <label htmlFor="Reading">Reading</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Travelling"
                      value="Travelling"
                      onChange={hobbiesHandler}
                    />
                    <label htmlFor="Travelling">Travelling</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Cycling"
                      value="Cycling"
                      onChange={hobbiesHandler}
                    />
                    <label htmlFor="Cycling">Cycling</label>
                    <input
                      type="checkbox"
                      name="hobbies"
                      id="Others"
                      value="Others"
                      onChange={hobbiesHandler}
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
                    name="Birth Date"
                    id="birthDate"
                    value={user.birthDate}
                    onChange={(e) =>
                      setUser({ ...user, birthDate: e.target.value })
                    }
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
                    name="Birth Time"
                    id="birthTime"
                    value={user.birthTime}
                    onChange={(e) =>
                      setUser({ ...user, birthTime: e.target.value })
                    }
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
              type="submit"
              id="cancel"
              className="button"
              title="Create New User"
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

import { useEffect, useState } from "react";
import "../css/form.css";

function Form() {
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

  function displayData() {
    localStorage.setItem("UserData", JSON.stringify(user));
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
        <table>
          <tbody>
            <tr id="idTr">
              <th>ID:</th>
              <td className="input-control">
                <input
                  type="text"
                  id="Id"
                  placeholder="Enter your ID"
                  value={user.id}
                  onChange={(e) => setUser({ ...user, id: e.target.value })}
                />
                <span className="error"></span>
              </td>
            </tr>
            <tr>
              <th>First Name:</th>
              <td className="input-control">
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
                <span className="error">dfd</span>
              </td>
            </tr>
            <tr>
              <th>Last Name:</th>
              <td className="input-control">
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
                <span className="error"></span>
              </td>
            </tr>
            <tr id="genders">
              <th>Gender:</th>
              <td>
                <div className="input-control">
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
                </div>
              </td>
            </tr>
            <tr id="hobbies">
              <th>Hobbies:</th>
              <td>
                <div className="input-control">
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
                </div>
              </td>
            </tr>
            <tr>
              <th>Country:</th>
              <td>
                <select
                  name="country"
                  id="country"
                  className="input-control"
                  onChange={selectorHandler}
                >
                  <option value="Country">Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>State:</th>
              <td>
                <select
                  name="state"
                  id="state"
                  className="input-control"
                  onChange={selectorHandler}
                >
                  <option value="State">State</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Rajastan">Rajastan</option>
                  <option value="California">California</option>
                </select>
                <span className="error"></span>
              </td>
            </tr>
            <tr>
              <th>City:</th>
              <td>
                <select
                  name="city"
                  id="city"
                  className="input-control"
                  onChange={selectorHandler}
                >
                  <option value="City">City</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Surat">Surat</option>
                  <option value="Vadodara">Vadodara</option>
                  <option value="Toronto">Toronto</option>
                </select>
                <span className="error"></span>
              </td>
            </tr>
            <tr>
              <th>Birth Date:</th>
              <td className="input-control">
                <input
                  type="date"
                  name="Birth Date"
                  id="birthDate"
                  value={user.birthDate}
                  onChange={(e) =>
                    setUser({ ...user, birthDate: e.target.value })
                  }
                />
                <span className="error"></span>
              </td>
            </tr>
            <tr>
              <th>Birth Time:</th>
              <td className="input-control">
                <input
                  type="time"
                  name="Birth Time"
                  id="birthTime"
                  value={user.birthTime}
                  onChange={(e) =>
                    setUser({ ...user, birthTime: e.target.value })
                  }
                />
                <span className="error"></span>
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
            onClick={displayData}
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
      </div>
    </div>
  );
}

export default Form;

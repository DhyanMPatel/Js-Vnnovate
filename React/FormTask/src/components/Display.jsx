import "../css/form.css";

function Display() {
  return (
    <>
      <div className="container">
        <table id="displayTable">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Hobbies</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Birth Date</th>
              <th>Birth Time</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr className="defaultDeta">
              <th colSpan="11">There is no any Data</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Display;

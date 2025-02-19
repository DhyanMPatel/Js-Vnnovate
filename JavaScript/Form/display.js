const defaultData = document.getElementById("defaultData");
const tbody = document.querySelector("tbody");

function addData() {
  window.location.href = "index.html";
  localStorage.removeItem("Operation");
  localStorage.setItem("Operation", "add");
}

const fetchData = async (url) => {
  // const response = await fetch(url);
  // let json;

  // json = await response.json();
  // return json;

  const response = await axios(url);
  return response.data;
};
async function test() {
  const arr = [];
  await Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
  return arr;
}

async function displayUsers() {
  if (!localStorage.getItem("UserData")) {
    let jsonData = await fetchData(
      "https://mocki.io/v1/0eb26a23-6231-46fb-84bb-82d1c82a0dab"
    );
    localStorage.setItem("UserData", JSON.stringify(jsonData));
  }

  const users = JSON.parse(localStorage.getItem("UserData")) || (await test());

  users.length != 0 ? (tbody.innerHTML = "") : null;

  users.map((user, index) => {
    const row = document.createElement("tr");

    const birthDate = formateBirthDate(user.birthDate);

    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.gender}</td>
        <td>${user.hobbies.join(", ")}</td>
        <td>${user.country}</td>
        <td>${user.state}</td>
        <td>${user.city}</td>
        <td>${birthDate}</td>
        <td>${user.birthTime}</td>
        <td>
            <button onclick="editUser(${index})" class="button" id='edit' title="Edit User"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                  </svg></button>
            <button onclick="deleteUser(${index})" class="button" id="remove" title="Delete User"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                  </svg></button>
        </td>
        `;

    tbody.appendChild(row);
  });
}
function formateBirthDate(birthDate) {
  const date = new Date(birthDate);

  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

async function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem("UserData")) || [];

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this user data.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
  });
  if (result.isConfirmed) {
    users.splice(index, 1);
    if (users.length == 0) {
      localStorage.removeItem("UserData");
      defaultData.style.display = "block";
      window.location.href = "display.html";
    } else {
      localStorage.setItem("UserData", JSON.stringify(users));
      displayUsers();
      Swal.fire({
        title: "Deleted!",
        text: "User has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }
}

// Function to edit user data (redirect to the form page with data)
async function editUser(index) {
  localStorage.setItem("editIndex", index);
  localStorage.setItem("Operation", "edit");
  window.location.href = "index.html";
}

window.onload = function () {
  displayUsers();
};

// [
//   {
//     "id": 1,
//     "firstName": "Aarav",
//     "lastName": "Shah",
//     "gender": "Male",
//     "country": "India",
//     "state": "Gujarat",
//     "city": "Ahmedabad",
//     "birthDate": "1995-07-12",
//     "birthTime": "11:30 AM",
//     "hobbies": ["Cricket", "Reading"]
//   },
//   {
//     "id": 2,
//     "firstName": "Meera",
//     "lastName": "Patel",
//     "gender": "Female",
//     "country": "USA",
//     "state": "California",
//     "city": "Los Angeles",
//     "birthDate": "1992-03-25",
//     "birthTime": "03:45 PM",
//     "hobbies": ["Travelling", "Swimming"]
//   },
//   {
//     "id": 3,
//     "firstName": "Rohan",
//     "lastName": "Desai",
//     "gender": "Male",
//     "country": "Canada",
//     "state": "Ontario",
//     "city": "Toronto",
//     "birthDate": "2000-11-18",
//     "birthTime": "09:15 AM",
//     "hobbies": ["Football", "Cycling"]
//   },
//   {
//     "id": 4,
//     "firstName": "Sanya",
//     "lastName": "Verma",
//     "gender": "Female",
//     "country": "India",
//     "state": "Maharashtra",
//     "city": "Mumbai",
//     "birthDate": "1998-06-30",
//     "birthTime": "10:00 AM",
//     "hobbies": ["Reading", "Swimming"]
//   },
//   {
//     "id": 5,
//     "firstName": "Arjun",
//     "lastName": "Kapoor",
//     "gender": "Male",
//     "country": "Australia",
//     "state": "Victoria",
//     "city": "Melbourne",
//     "birthDate": "1997-05-21",
//     "birthTime": "02:20 PM",
//     "hobbies": ["Cricket", "Football"]
//   },
//   {
//     "id": 6,
//     "firstName": "Ritika",
//     "lastName": "Sharma",
//     "gender": "Female",
//     "country": "UK",
//     "state": "England",
//     "city": "London",
//     "birthDate": "1993-09-10",
//     "birthTime": "08:30 AM",
//     "hobbies": ["Travelling", "Cycling"]
//   },
//   {
//     "id": 7,
//     "firstName": "Vivaan",
//     "lastName": "Joshi",
//     "gender": "Male",
//     "country": "India",
//     "state": "Karnataka",
//     "city": "Bangalore",
//     "birthDate": "2001-12-05",
//     "birthTime": "06:50 PM",
//     "hobbies": ["Swimming", "Football"]
//   },
//   {
//     "id": 8,
//     "firstName": "Kiara",
//     "lastName": "Singh",
//     "gender": "Female",
//     "country": "USA",
//     "state": "Texas",
//     "city": "Houston",
//     "birthDate": "1996-02-17",
//     "birthTime": "04:40 AM",
//     "hobbies": ["Reading", "Cricket"]
//   },
//   {
//     "id": 9,
//     "firstName": "Aryan",
//     "lastName": "Mehta",
//     "gender": "Transgender",
//     "country": "Germany",
//     "state": "Bavaria",
//     "city": "Munich",
//     "birthDate": "1994-08-29",
//     "birthTime": "12:05 PM",
//     "hobbies": ["Cycling", "Travelling"]
//   },
//   {
//     "id": 10,
//     "firstName": "Pooja",
//     "lastName": "Chopra",
//     "gender": "Female",
//     "country": "India",
//     "state": "West Bengal",
//     "city": "Kolkata",
//     "birthDate": "1999-10-14",
//     "birthTime": "05:30 PM",
//     "hobbies": ["Football", "Reading"]
//   }
// ]

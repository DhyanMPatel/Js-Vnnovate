const form = document.getElementById("form");
const id = document.getElementById("Id");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const country = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");
const birthDate = document.getElementById("birthDate");
const birthTime = document.getElementById("birthTime");
const create = document.getElementById("create");
const update = document.getElementById("update");
const cancel = document.getElementById("cancel");
const allGender = document.getElementsByName("gender");
const allHobbies = document.querySelectorAll('input[name="hobbies"]');

const setErr = (elem, mgs) => {
  const inputControl = elem.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = mgs;
  inputControl.classList.add("error");
};

const setSuccess = (elem) => {
  const inputControl = elem.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
};

const validateId = () => {
  const idValue = parseInt(id.value.trim());
  const idRegex = /^\d+$/;
  let isValid = true;
  let operation = localStorage.getItem("Operation");

  const users = JSON.parse(localStorage.getItem("UserData"));
  let availableIds = [];

  for (let user in users) {
    availableIds.push(users[user].id);
  }

  if (operation != "edit") {
    if (!idValue) {
      setErr(id, "ID is Required.");
      isValid = false;
    } else if (!idRegex.test(idValue)) {
      setErr(id, "ID should be Positive Number");
      isValid = false;
    } else if (availableIds.includes(idValue)) {
      setErr(id, "This User is already Available.");
      isValid = false;
    } else {
      setSuccess(id);
    }
  }

  return isValid;
};

const validateFirstName = () => {
  const firstNameValue = firstName.value.trim();
  const nameRegex = /^[a-z]{3,10}$/i;
  let isValid = true;

  if (!firstNameValue) {
    setErr(firstName, "First Name is required");
    isValid = false;
  } else if (!nameRegex.test(firstNameValue)) {
    setErr(firstName, "First Name should be 3-10 letters only.");
    isValid = false;
  } else {
    setSuccess(firstName);
  }
  return isValid;
};

const validateLastName = () => {
  const lastNameValue = lastName.value.trim();
  const nameRegex = /^[a-z]{3,10}$/i;
  let isValid = true;

  if (!lastNameValue) {
    setErr(lastName, "Last Name is required");
    isValid = false;
  } else if (!nameRegex.test(lastNameValue)) {
    setErr(lastName, "Last Name should be 3-10 letters only ");
    isValid = false;
  } else {
    setSuccess(lastName);
  }
  return isValid;
};

const validateGender = () => {
  const gender = document.getElementsByName("gender");
  let isValid = true;

  if (!(gender[0].checked || gender[1].checked || gender[2].checked)) {
    setErr(document.getElementById("Male"), "Gender is Required");
    isValid = false;
  } else {
    setSuccess(gender[0]);
  }
  return isValid;
};

const validateHobbies = () => {
  const hobbies = document.querySelectorAll("input[name='hobbies']:checked");
  let isValid = true;

  if (hobbies.length > 0) {
    setSuccess(hobbies[0]);
  } else {
    setErr(document.getElementById("Cricket"), "Enter at least one Hobby");
    isValid = false;
  }
  return isValid;
};

const validateCountry = () => {
  const countryValue = country.value.trim();
  let isValid = true;

  if (countryValue == "Country") {
    setErr(country, "Please select a Country.");
    isValid = false;
  } else {
    setSuccess(country);
  }
  return isValid;
};

const validateState = () => {
  const stateValue = state.value.trim();
  let isValid = true;

  if (stateValue == "State") {
    setErr(state, "Please select a State.");
    isValid = false;
  } else {
    setSuccess(state);
  }
  return isValid;
};

const validateCity = () => {
  const cityValue = city.value.trim();
  let isValid = true;

  if (cityValue == "City") {
    setErr(city, "Plase select a City.");
    isValid = false;
  } else {
    setSuccess(city);
  }
  return isValid;
};

const validateBirthDate = () => {
  const birthDateValue = birthDate.value;
  let isValid = true;

  if (!birthDateValue) {
    setErr(birthDate, "Birth Date is Required");
    isValid = false;
  } else {
    setSuccess(birthDate);
  }
  return isValid;
};

const validateBirthTime = () => {
  const birthTimeValue = birthTime.value;
  let isValid = true;

  if (!birthTimeValue) {
    setErr(birthTime, "Birth Time is Required");
    isValid = false;
  } else {
    setSuccess(birthTime);
  }
  return isValid;
};

const validateInputes = () => {
  let isValid = true;

  if (!validateId()) {
    isValid = false;
  }
  if (!validateFirstName()) {
    isValid = false;
  }
  if (!validateLastName()) {
    isValid = false;
  }
  if (!validateGender()) {
    isValid = false;
  }
  if (!validateHobbies()) {
    isValid = false;
  }
  if (!validateCountry()) {
    isValid = false;
  }
  if (!validateState()) {
    isValid = false;
  }
  if (!validateCity()) {
    isValid = false;
  }
  if (!validateBirthDate()) {
    isValid = false;
  }
  if (!validateBirthTime()) {
    isValid = false;
  }

  return isValid;
};

const compareUser = (userB, userA) => {
  if (userA.id > userB.id) return -1;
  if (userA.id == userB.id) return 0;
  if (userA.id < userB.id) return 1;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateInputes()) {
    return;
  }
  let clickedBtn = document.activeElement.value;

  if (clickedBtn === "Update") {
    handleUpdate();
  } else if (clickedBtn === "Create") {
    handleCreate();
  }
});

id.addEventListener("input", () => validateId());
firstName.addEventListener("input", validateFirstName);
lastName.addEventListener("input", validateLastName);
allGender.forEach((gen) => gen.addEventListener("change", validateGender));
allHobbies.forEach((hobbie) =>
  hobbie.addEventListener("change", validateHobbies)
);
country.addEventListener("change", validateCountry);
state.addEventListener("change", validateState);
city.addEventListener("change", validateCity);
birthDate.addEventListener("change", validateBirthDate);
birthTime.addEventListener("change", validateBirthTime);

function showData() {
  window.location.href = "display.html";
  document.forms["form"].reset();
  localStorage.removeItem("Operation");
  localStorage.removeItem("editIndex");
}

async function handleCreate() {
  const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
  const arrTime = birthTime.value.split(":");
  const amPm = arrTime[0] >= 12 ? "PM" : "AM";

  if (arrTime[0] > 12) {
    arrTime[0] = String(arrTime[0] - 12);
  }
  const bt = `${arrTime.join(":")} ${amPm}`;

  const obj = {
    id: parseInt(id.value),
    firstName: firstName.value,
    lastName: lastName.value,
    gender: document.querySelector('input[name="gender"]:checked').value || [],
    hobbies: [],
    country: country.value,
    state: state.value,
    city: city.value,
    birthDate: birthDate.value,
    birthTime: bt,
  };
  for (let hobbie of hobbies) {
    obj.hobbies.push(hobbie.value);
  }

  let users = JSON.parse(localStorage.getItem("UserData")) || [];
  users.push(obj);
  users.sort(compareUser);

  localStorage.setItem("UserData", JSON.stringify(users));
  document.forms["form"].reset();

  localStorage.removeItem("Operation");
  OpCheck();
  Swal.fire({
    title: "User Created Successfully",
    text: "You have successfully added a new user.",
    icon: "success",
    showConfirmButton: false,
    timer: 1000,
  }).then(() => {
    window.location.href = "display.html";
  });
}

function OpCheck() {
  let operation = localStorage.getItem("Operation");
  if (operation == "edit") {
    create.style.display = "none";
    update.style.display = "block";
  } else {
    create.style.display = "block";
    update.style.display = "none";
  }
}

cancel.onclick = function () {
  document.forms["form"].reset();
  localStorage.removeItem("editIndex");
  localStorage.removeItem("Operation");
  OpCheck();
  window.location.href = "display.html";
};

document.addEventListener("DOMContentLoaded", function () {
  let editIndex = localStorage.getItem("editIndex");
  if (editIndex !== null) {
    let users = JSON.parse(localStorage.getItem("UserData")) || [];
    let user = users[editIndex];
    id.value = parseInt(user.id);
    id.ariaReadOnly = true;
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    document.querySelector(
      `input[name="gender"][value="${user.gender}"]`
    ).checked = true;

    user.hobbies.forEach((hobby) => {
      let hobbyCheckbox = document.querySelector(
        `input[name="hobbies"][value="${hobby}"]`
      );
      if (hobbyCheckbox) hobbyCheckbox.checked = true;
    });

    country.value = user.country;
    state.value = user.state;
    city.value = user.city;
    birthDate.value = user.birthDate;
    birthTime.value = convertIn24(user.birthTime);

    OpCheck();
  }
  let operation = localStorage.getItem("Operation");
  if (operation == "edit") {
    id.readOnly = true;
    id.tabIndex = "-1";
    id.style.border = "0px";
    id.style.backgroundColor = "inherit";
    id.style.pointerEvents = "none";
  }
});

function convertIn24(birthTime) {
  const [time, period] = birthTime.split(" ");
  const [hour, minute] = time.split(":");
  let intHour = parseInt(hour);

  if (period == "PM" && intHour != 12) {
    intHour = intHour + 12;
  }

  if (intHour < 10 && intHour >= 0) {
    return `0${intHour}:${minute}`;
  }

  return `${intHour}:${minute}`;
}

function handleUpdate() {
  let users = JSON.parse(localStorage.getItem("UserData")) || [];
  let editIndex = localStorage.getItem("editIndex");

  let hobbies = document.querySelectorAll('input[name="hobbies"]:checked');

  const arrTime = birthTime.value.split(":");
  const amPm = arrTime[0] >= 12 ? "PM" : "AM";
  if (arrTime[0] > 12) {
    arrTime[0] = String(arrTime[0] - 12);
  }
  const bt = `${arrTime.join(":")} ${amPm}`;

  const obj = {
    id: users[editIndex].id,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    hobbies: [],
    country: document.getElementById("country").value,
    state: document.getElementById("state").value,
    city: document.getElementById("city").value,
    birthDate: document.getElementById("birthDate").value,
    birthTime: bt,
  };
  for (let hobbie of hobbies) {
    obj.hobbies.push(hobbie.value);
  }

  users[editIndex] = obj;

  localStorage.setItem("UserData", JSON.stringify(users));

  localStorage.removeItem("editIndex");
  localStorage.removeItem("Operation");

  document.forms["form"].reset();
  OpCheck();
  Swal.fire({
    icon: "success",
    title: "User Data Updated",
    text: "You Updated User Data!",
    confirmButtonText: "OK",
  }).then(() => {
    window.location.href = "display.html";
  });
}

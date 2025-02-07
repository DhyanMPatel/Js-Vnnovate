function todisplay() {
  window.location.href = "display.html";
  document.forms["form"].reset();
  localStorage.removeItem("Operation");
  localStorage.removeItem("editIndex");
}

let create = document.getElementById("create");
create.onclick = function (e) {
  e.preventDefault();
  let birthTime = document.getElementById("birthTime").value;
  let hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
  let amPm;
  let arrTime = birthTime.split(":");
  amPm = arrTime[0] >= 12 ? "PM" : "AM";
  if (arrTime[0] > 12) {
    arrTime[0] = String(arrTime[0] - 12);
  }
  birthTime = `${arrTime.join(":")} ${amPm}`;

  let obj = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    hobbies: [],
    country: document.getElementById("country").value,
    state: document.getElementById("state").value,
    city: document.getElementById("city").value,
    birthDate: document.getElementById("birthDate").value,
    birthTime: birthTime,
  };

  for (let hobbie of hobbies) {
    obj.hobbies.push(hobbie.value);
  }

  let users = JSON.parse(localStorage.getItem("UserData")) || [];
  users.push(obj);

  localStorage.setItem("UserData", JSON.stringify(users));
  document.forms["form"].reset();
  localStorage.removeItem("Operation");
};
let operation = localStorage.getItem("Operation");
if (operation == "edit") {
  document.getElementById("create").style.display = "none";
  document.getElementById("update").style.display = "block";
} else {
  document.getElementById("create").style.display = "block";
  document.getElementById("update").style.display = "none";
}

let cancel = document.getElementById("cancel");
cancel.onclick = function () {
  document.forms["form"].reset();
  localStorage.removeItem("editIndex");
  localStorage.removeItem("Operation");
  document.getElementById("create").style.display = "block";
  document.getElementById("update").style.display = "none";
  // document.location.href = "./index.html";
};

document.addEventListener("DOMContentLoaded", function () {
  let editIndex = localStorage.getItem("editIndex");
  if (editIndex !== null) {
    let users = JSON.parse(localStorage.getItem("UserData")) || [];
    let user = users[editIndex];

    document.getElementById("firstName").value = user.firstName;
    document.getElementById("lastName").value = user.lastName;
    document.querySelector(
      `input[name="gender"][value="${user.gender}"]`
    ).checked = true;

    user.hobbies.forEach((hobby) => {
      let hobbyCheckbox = document.querySelector(
        `input[name="hobbies"][value="${hobby}"]`
      );
      if (hobbyCheckbox) hobbyCheckbox.checked = true;
    });

    document.getElementById("country").value = user.country;
    document.getElementById("state").value = user.state;
    document.getElementById("city").value = user.city;
    document.getElementById("birthDate").value = user.birthDate;
    document.getElementById("birthTime").value = convertIn24(user.birthTime);
  }
});

function convertIn24(birthTime) {
  let [time, period] = birthTime.split(" ");
  let [hour, minute] = time.split(":");
  let intHour = parseInt(hour);
  intHour = parseInt(hour);

  if (period == "PM") {
    if (intHour != 12) {
      intHour = intHour + 12;
    }
  }

  if (intHour < 10 && intHour >= 0) {
    return `0${intHour}:${minute}`;
  }

  return `${intHour}:${minute}`;
}

let update = document.getElementById("update");
update.addEventListener("click", function (e) {
  let users = JSON.parse(localStorage.getItem("UserData")) || [];
  let editIndex = localStorage.getItem("editIndex");
  // let user = users[editIndex];

  e.preventDefault();
  let birthTime = document.getElementById("birthTime").value;
  let hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
  let amPm;
  let arrTime = birthTime.split(":");
  amPm = arrTime[0] >= 12 ? "PM" : "AM";
  if (arrTime[0] > 12) {
    if (arrTime[0] != 12) {
      arrTime[0] = String(arrTime[0] - 12);
    }
  }
  birthTime = `${arrTime.join(":")} ${amPm}`;

  let obj = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    hobbies: [],
    country: document.getElementById("country").value,
    state: document.getElementById("state").value,
    city: document.getElementById("city").value,
    birthDate: document.getElementById("birthDate").value,
    birthTime: birthTime,
  };

  for (let hobbie of hobbies) {
    obj.hobbies.push(hobbie.value);
  }

  users[editIndex] = obj;
  localStorage.removeItem("UserData");
  localStorage.setItem("UserData", JSON.stringify(users));

  localStorage.removeItem("editIndex"); // Clear editIndex after loading data
  localStorage.removeItem("Operation");

  document.forms["form"].reset();
  document.getElementById("update").style.display = "none";
  document.getElementById("create").style.display = "block";

  document.location.href = "./display.html";
});

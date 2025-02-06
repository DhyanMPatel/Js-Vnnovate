let users = JSON.parse(localStorage.getItem("UserData")) || [];
// let key = localStorage.key();
// console.log(key);
let editData = JSON.parse(localStorage.getItem("editData"));
console.log(editData);

document.onsubmit = function handleForm(e) {
  let hobies = document.querySelectorAll('input[class="hobies"]:checked');
  let selectedCountry = document.getElementById("country");
  let selectedState = document.getElementById("state");
  let selectedCity = document.getElementById("city");
  let birthTime = document.getElementById("birthTime").value;
  let amPm;
  let arrTime = birthTime.split(":");

  let obj = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    hobies: [],
    address: {
      country: selectedCountry.options[selectedCountry.selectedIndex].text,
      state: selectedState.options[selectedState.selectedIndex].text,
      city: selectedCity.options[selectedCity.selectedIndex].text,
    },
    birthDate: document.getElementById("birthDate").value,
    birthTime: birthTime,
  };

  for (let hobie of hobies) {
    obj.hobies.push(hobie.value);
  }

  amPm = arrTime[0] >= 12 ? "PM" : "AM";
  if (arrTime[0] > 12) {
    arrTime[0] = String(arrTime[0] - 12);
  }
  obj.birthTime = `${arrTime.join(":")} ${amPm}`;

  localStorage.setItem("UserData", JSON.stringify(users));

  document.forms["form"].reset();

  e.preventDefault();
};

let cancel = document.getElementById("cancel");
cancel.onclick = function (e) {
  document.forms["form"].reset();
};

document.addEventListener("DOMContentLoaded", function () {
  if (editData) {
    document.getElementById("firstName").value = editData.firstName;
    document.getElementById("lastName").value = editData.lastName;
    document.getElementById(editData.gender).checked = true;
    for (let checked of editData.hobies) {
      document.getElementById(checked).checked = true;
    }
  }

  for (let add in editData.address) {
    document.getElementById(add).value = editData.address[add];
  }

  document.getElementById("birthDate").value = editData.birthDate;
  document.getElementById("birthTime").value = convertin24(editData.birthTime);
});

function convertin24(inputTime) {
  let [time, period] = inputTime.split(" ");
  let [hh, mm] = time.split(":");
  let formatedHH = parseInt(hh);

  if (period == "PM") {
    formatedHH += 12;
  }

  return `${formatedHH}:${mm}`;
}

let displayDiv = document.getElementById("displayDiv");
let counter = 0;

document.onsubmit = function handleForm(e) {
  let hobies = document.querySelectorAll('input[class="hobies"]:checked');
  let selectedCountry = document.getElementById("country");
  let selectedState = document.getElementById("state");
  let selectedCity = document.getElementById("city");
  let birthTime = document.getElementById("birthTime").value;
  let amPm;

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

  let arrTime = birthTime.split(":");

  amPm = arrTime[0] >= 12 ? "PM" : "AM";
  if (arrTime[0] > 12) {
    arrTime[0] = String(arrTime[0] - 12);
  }

  obj.birthTime = `${arrTime.join(":")} ${amPm}`;

  let id = "UserData" + counter;
  counter++;
  localStorage.setItem(id, JSON.stringify(obj));

  document.forms["form"].reset();
};

let cancel = document.getElementById("cancel");
cancel.onclick = function () {
  document.forms["form"].reset();
};

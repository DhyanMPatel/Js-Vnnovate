let displayDiv = document.getElementById("displayDiv");
document.onsubmit = function handleForm(e) {
  if (displayDiv.children.length > 1) {
    console.log(localStorage.getItem("userData"));
    e.preventDefault();
  } else {
    e.preventDefault();
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

    if (arrTime[0] > 12) {
      amPm = arrTime[0] > 12 ? "PM" : "AM";
      arrTime[0] = String(arrTime[0] - 12);
    }
    obj.birthTime = `${arrTime.join(":")} ${amPm}`;

    storeContent(obj);
    displayContent();
  }
};

function storeContent(obj) {
  if (!localStorage.getItem("UserData")) {
    localStorage.setItem("userData", JSON.stringify(obj));
  }
}

function displayContent() {
  let data = JSON.parse(localStorage.getItem("userData"));

  let remove = document.createElement("button");
  remove.id = "remove";
  remove.innerHTML = "Remove";
  let edit = document.createElement("button");
  edit.id = "edit";
  edit.innerHTML = "Edit";

  displayDiv.children[0].appendChild(edit);
  displayDiv.children[0].appendChild(remove);

  remove.onclick = function (e) {
    table.remove();
    remove.remove();
    edit.remove();
  };

  edit.onclick = function (e) {
    firstName.focus();
    table.remove();
    remove.remove();
    edit.remove();
    localStorage.removeItem("userData");
  };

  let table = content(data);

  displayDiv.appendChild(table);
}

function content(data) {
  let table = document.createElement("table");
  table.className = "table";

  for (let key in data) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    th.innerHTML = key;
    key == "address" ? innerObject(data, key, td) : (td.innerHTML = data[key]);
    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);
  }

  return table;
}
function innerObject(data, key, td) {
  let tableA = document.createElement("table");
  tableA.className = "innerTable";
  for (let elem in data[key]) {
    let trA = document.createElement("tr");
    let thA = document.createElement("th");
    let tdA = document.createElement("td");

    thA.innerHTML = elem;
    tdA.innerHTML = data[key][elem];
    trA.appendChild(thA);
    trA.appendChild(tdA);
    tableA.appendChild(trA);
    td.appendChild(tableA);
  }
}

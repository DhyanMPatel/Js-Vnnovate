let displayDiv = document.getElementById("displayDiv");
let users = JSON.parse(localStorage.getItem("UserData")) || [];

document.addEventListener("DOMContentLoaded", displayContent);

function displayContent() {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    let div = document.createElement("div");
    div.className = "div";

    let buttons = document.createElement("div");
    buttons.className = "buttons";
    let remove = document.createElement("button");
    remove.id = "remove";
    remove.innerHTML = "Remove";
    let edit = document.createElement("a");
    edit.id = "edit";
    edit.innerHTML = "Edit";
    edit.href = "./index.html";

    let table = document.createElement("table");
    table.className = "table";

    buttons.appendChild(edit);
    buttons.appendChild(remove);
    div.appendChild(buttons);

    remove.onclick = function (e) {
      table.remove();
      remove.remove();
      edit.remove();
      localStorage.removeItem(user);
    };

    edit.onclick = function (e) {
      let editDiv = e.target.closest(".div");
      let index = Array.from(displayDiv.children).indexOf(editDiv);

      editData(index);
    };

    for (let key in user) {
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      let td = document.createElement("td");
      th.innerHTML = key;
      key == "address"
        ? innerObject(user[key], td)
        : (td.innerHTML = user[key]);
      tr.appendChild(th);
      tr.appendChild(td);
      table.appendChild(tr);
      div.appendChild(table);
      displayDiv.appendChild(div);
    }
  }
}

function innerObject(value, td) {
  let tableA = document.createElement("table");
  tableA.className = "innerTable";
  for (let elem in value) {
    let trA = document.createElement("tr");
    let thA = document.createElement("th");
    let tdA = document.createElement("td");

    thA.innerHTML = elem;
    tdA.innerHTML = value[elem];
    trA.appendChild(thA);
    trA.appendChild(tdA);
    tableA.appendChild(trA);
    td.appendChild(tableA);
  }
}

function editData(index) {
  let data = users[index];

  localStorage.setItem("editData", JSON.stringify(data));
}

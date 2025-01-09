sourceObj = {
  name: "Vnnovate",
};

const targetObj = { location: "Ahmedabad" };

const new_obj = Object.assign(targetObj, sourceObj); // new_obj === targetObj





console.log(new_obj);
console.log(targetObj);
console.log(targetObj === new_obj);
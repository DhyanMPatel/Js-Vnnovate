/// For...in Loop
//      - walk over all keys of an Object
//      - not work with map and set
//      - If we store properties as number in String formate then output will display number wise not in stored formate at last another type of String will display


/// Here properties value is number
let codes1 = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    // ..,
    "1": "USA"
  };
  
  for (let code in codes1) {
    alert(code); // 1, 41, 44, 49
  }


  /// This will not considered as number
  let codes2 = {
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    // ..,
    "+1": "USA"
  };
  
  for (let code in codes2) {
    alert( +code ); // 49, 41, 44, 1
  }
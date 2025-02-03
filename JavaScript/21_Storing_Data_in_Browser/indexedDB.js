let openRequest = indexedDB.open("CollegeDB", 1);

/// If want to do task like CRUD Operation.
openRequest.onsuccess = (e) => {
  console.log("Success!");

  let db = openRequest.result;
  let transaction = db.transaction("students", "readwrite");
  let students = transaction.objectStore("students");

  /*
  /// INSERT DATA INTO INDEXED DB
  //   let request = students.add({
  //     id: 1,
  //     name: "Jaydeep",
  //     email: "jaydeep@test.com",
  //   });
  //  OR
  let request = students.put({
    id: 4,
    name: "Jaymeen",
    email: "jaymeen@test.com",
  });
  */

  /// GET DATA FROM INDEXED DB
  //   let request = students.get(1); // Return - data, where id=1
  //   let request = students.getAll(IDBKeyRange.bound(2, 3)); // Return - range of data, where id=2,3
  //   let request = students.getAllKeys(); // Return - range of keys only, all keys

  //        CHANGE INDEXING
  let index = students.index("name");
  let request = index.get("Jaydip");

  request.onsuccess = (e) => {
    console.log(e.target.result); // Return - id value.
  };
  request.onerror = (e) => {
    console.log(e.target.error.name);

    if (request.error.name == "ConstraintError") {
      console.log("This is Constraint Error.");
      e.preventDefault(); // Don't abort the Transaction
    }
  };
  request.oncomplete = (e) => {
    console.log("Complete Transaction");
  };

  /*
  // DELETE DATA
  let deleteRequest = students.delete(2);
  console.log(deleteRequest);
    */

  /// HANDLE HUGE DATA USING 'CURSOR'
  let reqcursor = students.openCursor();

  reqcursor.onsuccess = (e) => {
    let cursor = reqcursor.result;

    if (cursor) {
      let primaryKey = cursor.primaryKey;
      let key = cursor.key;
      let value = cursor.value;
      console.log(`PrimaryKey: ${primaryKey}, Key: ${key}, Value:`, value);
      cursor.continue();
    }
  };
};

/// If we want to do task like create table(ObjectStore), create Collumn(Index).
openRequest.onupgradeneeded = (e) => {
  console.log("Upgrade needed");

  let db = openRequest.result;
  //   console.log(db);

  if (!db.objectStoreNames.contains("students")) {
    let request = db.createObjectStore("students", { keyPath: "id" });
    request.createIndex("name", "name", { unique: false });
    request.createIndex("email", "email", { unique: true });
  }
};

/// If Error create at ".open()" creation of DB.
openRequest.onerror = (e) => {
  console.log("Error: ", e);
};

let openRequest = indexedDB.open("CollegeDB", 1);

openRequest.onsuccess = (e) => {
    console.log("Success!");
    let db = openRequest.result;
    

}
openRequest.onupgradeneeded = (e)=>{
    console.log("Upgrade needed");

    let db = openRequest.result;
    console.log(db);

    if(!db.objectStoreNames.contains('students')){
        let request = db.createObjectStore('students', {keyPath: 'id'});
        request.createIndex('name', 'name', {unique: false});
        request.createIndex('email', 'email', {unique: true});
    }
}

openRequest.onerror = (e) => {
    console.log("Error: ", e);
}
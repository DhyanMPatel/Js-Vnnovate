/// Fetch
//    - Fetch create HTTP Request.
//    - Syntax:-
let promise = fetch(url, [options]);

//      - url:- url to access.
//      - options:- Optional Perameters: method, headers, etc.

// Responce give 2 Properties: `ok`, `status`
let responce = fetch(url);

if (responce.ok) {
  let json = await responce.json();
} else {
  alert("HTTP-Status: ", responce.status);
}

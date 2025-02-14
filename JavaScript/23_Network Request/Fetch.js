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

///   Experiment
//      1) Fetch data from Github
async function getUsers(names) {
  let jobs = [];

  for (let name of names) {
    let job = await fetch(`https://api.github.com/users/${name}`).then(
      (successResponse) => {
        if (Response.status != 200) {
          return null;
        }
        return Response.json();
      },
      (failResponse) => {
        return null;
      }
    );
    jobs.push(job);
  }

  let promise = await Promise.all(jobs);
  return promise;
}

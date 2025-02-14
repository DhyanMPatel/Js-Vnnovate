/// FETCH-API
//      - Fetch uses [Reques] and [Response] objects.

const url = "https://example.com/users";

/// GET Request
//      -
let resGet = fetch(url)
  .then((res) => res.json())
  .then((res) => console.log(res));

let resGet2 = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.text())
  .then((res) => console.log(res));

/// POST Request
let respost = fetch(url, {
  method: "POST",
  headers: {
    // To access a protected resources you might need to include an authorization token in the header like JWT token.
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json",
  },
  body: {
    name: "John Doe",
    email: "john@test.com",
  },
})
  .then((res) => res.blob())
  .then((res) => console.log(res));

/// PUT Request
//      - Update Entire Resource like, user1
let resPut = fetch(`${url}/user1`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    name: "John Doe Updated",
    email: "john@Update.com",
  },
})
  .then((res) => res.arrayBuffer())
  .then((res) => console.log(res));

/// PATCH Request
//      - Partial Update
let resPatch = fetch(`${url}/user1`, {
  method: "PATCH",
  headers: {
    "Content-type": "application/json",
  },
  body: {
    email: "john@last.com",
  },
})
  .then((res) => res.formData())
  .then((res) => console.log(res));

/// DELETE Request
//      - Delete Resources from Server
let resDelete = fetch(`${url}/user1`, {
  method: "DELETE",
})
  .then((res) => res.json())
  .then((res) => console.log(res));

/// HEAD Request
let resHead = fetch(url, {
  method: "HEAD",
}).then((res) => console.log(res.headers.get("Content-Type")));

/// OPTIONS Request
//      - allowed HTTP methods for a specific resource.
let resOps = fetch(url, {
  method: "OPTIONS",
}).then((res) => res.headers.get("Allow"));

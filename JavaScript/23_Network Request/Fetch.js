/// Error if generate

let responce = fetch(url);

if (responce.ok) {
  let json = await responce.json();
} else {
  alert("HTTP-Status: ", responce.status);
}

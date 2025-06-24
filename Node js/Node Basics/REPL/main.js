// import http from "http";
// import fs, { readFile } from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const server = http.createServer((req, res) => {
//   const filePath = path.join(__dirname, "message.txt");

//   fs.readfile(filePath, "urf8", (err, data) => {
//     if (err) {
//       res.writeHead(500, { "content-type": "text/plain" });
//       res.end("Error reading file");
//     } else {
//       res.writeHead(200, { "content-type": "text/plain" });
//       res.end(data);
//     }
//   });
// });

// server.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

// global.a = "Hii this is Global Object";

// console.log("Process ID:", process.pid);
// console.log("Node.js Version:", process.version);

// const buffer = Buffer.from('Hello Node.js');
// console.log(buffer);  // Outputs the binary representation

// console.log(__dirname);  // Outputs the directory of the current file
// console.log(__filename); // Outputs the full path of the current file

// const myUrl = new URL('https://www.example.com/?name=Dhyan');
// console.log(myUrl.searchParams.get('name'));
// myUrl.searchParams.append('age', '20');
// console.log(myUrl.href);

// const encoder = new TextEncoder();
// const encoded = encoder.encode("Hello, This will encode.");
// console.log(encoded);

// import http from "http";

// const server2 = http.createServer((req, res) => {
//   //   res.writeHead(200, { "content-type": "text/html" });
//   //   res.end("<h2>Welcome, Node.js!</h2>");

//   res.writeHead(200, { "content-type": "application/json" });
//   res.end(JSON.stringify({ message: "This is Message from Backend" }));
// });
// server2.listen(
//   4000,
//   console.log("Server is listening on http://localhost:4000/ Port...")
// );

// /* Read file with Async/Await */
// import fs from 'fs/promises';

// async function readFileAsync() {
//   try {
//     const data = await fs.readFile('message.txt', 'utf8');
//     console.log(data);
//   } catch (err) {
//     console.log('Error: ', err.message);
//   }
// }

// readFileAsync();

import { deleteFile, readFile, updateFile, writeFile } from "./fsCRUD.js";
import fs from 'fs';
try {
  fs.access("message.json");
} catch {
  fs.writeFile("message.json", '[]', 'utf8', (err) => {
    if (err) throw err;
    console.log('File written successfully!');
  });
  console.log("Initialized users.json");
}

await writeFile(1, "Dhayan")
await readFile()
await writeFile(2, "Bhautik")
await readFile()
await updateFile(1, "Dhyan")
await readFile()
await deleteFile(2)
await readFile()
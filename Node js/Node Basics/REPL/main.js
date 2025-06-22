import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, "message.txt");

    fs.readfile(filePath, "urf8", (err, data) => {
        if(err){
            res.writeHead(500, {"content-type": "text/plain"});
            res.end("Error reading file");
        } else {
            res.writeHead(200, {"content-type": "text/plain"});
            res.end(data);
        }
    })
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
})

global.a = "Hii this is Global Object";

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

const encoder = new TextEncoder();
const encoded = encoder.encode("Hello, This will encode.");
console.log(encoded);
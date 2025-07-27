// const http = require("http");

// /// Create an HTTP server
// const server = http.createServer((req,res) => {

//     // response header
//     res.writeHead(200, { "content-type": "text/plain"})

//     res.end("Hello, Node.js HTTP Server!");
// });
//

//
// /// Create an HTTP server that logs request headers and responds with specific headers
// const http = require("http");
// const server = http.createServer((req, res) => {
//   // Log all request headers
//   console.log("Request Headers:", req.headers);

//   // Get specific headers (case-insensitive)
//   const userAgent = req.headers["user-agent"];
//   const acceptLanguage = req.headers["accept-language"];

//   // res.writeHead(200, { "Content-Type": "text/plain" });
//   // res.end(`User-Agent: ${userAgent}\nAccept-Language: ${acceptLanguage}`);

//   res.setHeader("Content-Type", "text/html");
//   res.write("<html>");
//   res.write("<head><title>Node Learning</title></head>");
//   res.write(`<body><h2>Understanding Request and Response Object</h2><h3>User Agent: ${userAgent}</h3><h3>Accept Language: ${acceptLanguage}</h3></body>`);
//   res.write("</html>");
//   res.end();
// });
//

// //
// /// Understand Request and Response Object
// const server = http.createServer((req, res) => {
//   /// Log the request method, URL, and headers
//   console.log("Request URL: ", req.url);
//   console.log("Request Method: ", req.method);
//   console.log("Request Headers: ", req.headers);

//   /// Sending a response
//   res.setHeader("Content-Type", "text/html");
//   res.write("<!DOCTYPE html>");
//   res.write('<html lang="en">');
//   res.write("<head><title>Node Learning</title></head>");
//   res.write("<body><h2>Understanding Request and Response Object</h2></body>");
//   res.write("</html>");
//   res.end();
// });
// //

//
// /// Show different response in different routes
const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Welcome to the Home Page!");

  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("This is the About Page!");

  } else if (req.url === '/form') {
    // req.setHeader("Content-Type", "text/html");
    res.write("<!DOCTYPE html>");
    res.write('<html lang="en">');
    res.write("<head><title>Form through Node</title></head>");
    res.write("<body>");
    res.write("<form action='/message' method='POST'>")
    res.write("<input type='text' name='firstName'>")
    res.write("<input type='text' name='lastName'>")
    res.write("<button type='submit'>Submit</button>")
    res.write("</form>")
    res.write("</body>");
    res.write("</html>");
    return res.end();  // If i write (without return statement) like this then it will execute rest of the bellow lines too. which gives an error. So always write with return keyword so it will return and not execute bellow code.

  } else if (req.url === '/message' && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    })
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      fs.writeFileSync("message.json", JSON.stringify(parsedBody));
    })
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Data saved successfully!");
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<!DOCTYPE html>");
  res.write('<html lang="en">');
  res.write("<head><title>Node Learning</title></head>");
  res.write("<body><h2>Understanding Routes in Node</h2></body>");
  res.write("</html>");
  res.end();
});
//

// import fs from "fs/promises";
// import http from "http";
// const server = http.createServer((req, res) => {
//   let body = "";
//   if (req.method === "POST") {
//     fs.writeFile("message.txt", body, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.writeHead(200, { "content-type": "text/plain" });
//         res.write("Write file Successfully");
//         res.end();
//       }
//     });
//   }
// });

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
});

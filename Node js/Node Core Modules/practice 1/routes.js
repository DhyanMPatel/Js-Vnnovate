const fs = require("fs")
const responseHandler = (req, res) => {
    const url = req.url;
    const method = req.method
    const body = [];

    if (url === "/") {
        // res.writeHead(200, {"Content-Type": "text/plain"});
        // res.write("This is Practice Test 1")

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<!DOCTYPE html>");
        res.write('<html lang="en">');
        res.write("<head><title>Dummy Users</title></head>");
        res.write("<body>");
        res.write("<form action='/create-user' method='POST'>")
        res.write("<input name='userName' type='text' placeholder='Enter UserName here'></br>")
        res.write("<button type='submit'>Submit</button>");
        res.write("</form>")
        res.write("</body>");
        res.write('</html>');


        res.end();

    } else if (url === '/users') {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<!DOCTYPE html>");
        res.write('<html lang="en">');
        res.write("<head><title>Dummy Users</title></head>");
        res.write("<body>");
        res.write("<ul>")
        res.write("<li>User 1</li>")
        res.write("<li>User 2</li>")
        res.write("<li>User 3</li>")
        res.write("<li>User 4</li>")
        res.write("</ul>")
        res.write("</body>");
        res.write("</html>");
        res.end();
    } else if (url === '/create-user' && method === "POST") {

        req.on("data", (chunk) => {
            body.push(chunk)
        })
        req.on("end", () => {
            const parsedData = Buffer.concat(body).toString();
            console.log(parsedData.split("=")[1])

            fs.writeFile("user.txt", parsedData, (err) => {
                if (err) {
                    res.writeHead(302, { "Content-type": "text/plain", "Location": "/fail" })
                    return res.end()
                } else {
                    res.writeHead(302, { "Content-type": "text/plain", "Location": "/success" })
                    return res.end()
                }
            })
        })
    } else if (url === '/success') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.write("Successfully Created User!");
        res.end();
    } else if (url === '/fail') {
        res.statusCode = 400;
        res.setHeader("Content-Type", "text/plain")
        res.write("Bad Request");
        res.end();
    }
}

module.exports = responseHandler
const fs = require('fs');

const requestHandler = (req, res) => {
    if (req.url === '/') {
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
        return res.end(); // If i write (without return statement) like this then it will execute rest of the bellow lines too. which gives an error. So always write with return keyword so it will return and not execute bellow code.
    } else if (req.url === '/message' && req.method === "POST") {
        const body = [];

        req.on("data", (chunk) => {
            body.push(chunk)
        })

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString()

            fs.writeFile("message.txt", parsedBody, (err) => {
                if (err) {
                    console.log(err)
                    res.WriteHead(500, {"Content-Type": "text/plain"})
                    return res.end("Server Error");
                } else {
                    res.writeHead(201,{ "Content-Type": "text/plain" })
                    // res.setHeader("Content-Type", "text/plain");
                    // res.setStatusCode(201)
                    res.write("form Submitted Successfully!")
                    return res.end()
                }
            })
        })
    } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write("<!DOCTYPE html>");
        res.write('<html lang="en">');
        res.write("<head><title>Node Learning</title></head>");
        res.write("<body><h2>Understanding Routes in Node</h2></body>");
        res.write("</html>");
        res.end();
    }

}

module.exports = requestHandler;

//      OR

// module.exports = {requestHandler}
    // - Use for Multiple exports
    // - Then import like {requestHandler} = require('route')


// module.exports.handler = requestHandler
    // - But import using handler keyword
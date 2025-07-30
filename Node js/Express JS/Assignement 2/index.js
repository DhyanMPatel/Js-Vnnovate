const express = require("express");
const bodyParser = require("body-parser");  


const app = express();

app.use(bodyParser.urlencoded({extended: false})); // This will parse only simple key-value pairs

//
/// Task 2
// app.use((req,res,next) => {
//     console.log("First Middleware");
//     // res.send("Middleware 1 can pass response") // If i write this then it will not execute bellow code
//     next();
// })

// app.use((req,res,next) => {
//     console.log("Second Middleware");
// })

//
/// Task 3
// //      - pull most specific route to top and least specific route to bottom
// app.use("/users",(req,res, next) => {
//     console.log("Middleware 2");
//     // res.setHeader("Content-Type", "text/plain");
//     res.send("Middleware 2 can pass response") // If i write this then it will not execute bellow code
//     // next();
// });
// app.use("/",(req,res, next) => {
//     console.log("Middleware 1");
//     res.send("Middleware 1 can pass response") // If i write this then it will not execute bellow code
//     next();
// });


//      - Parsing Incoming Request
app.use("/add-product", (req,res,next) => {
    res.send("<form action='/product' method='POST'><input type='text' name='firstName'><input type='text' name='lastName'><button type='submit'>Submit</button></form>")
})

app.use('/product', (req,res,next)=> {
    console.log(req.body);  // Without bodyParser it will return undefined. because node by default does not parse the body. 
    res.send("Product Page")
})


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000 port...")
})
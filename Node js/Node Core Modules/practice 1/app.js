const http = require("http")
const routes = require("./routes");

const server = http.createServer(routes);

server.listen(3001, () => {
    console.log("Server is listening on 3001 port, http://localhost:3001/")
})
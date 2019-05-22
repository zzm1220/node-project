const http = require("http");
const serverHandler = require("../app");
const port = "3001";

const server = http.createServer(serverHandler);

server.listen(port);
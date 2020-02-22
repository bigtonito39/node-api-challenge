//npm install > npm install express > npm install nodemon

const express = require("express");
const welcome = require("./welcome/welcome")
const logger = require("./middleware/logger")

const server = express()
const port = 3000;

server.use(express.json())
server.use(logger("short")) //to log short version of moves i do

server.use("/", welcome),



server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)  
})
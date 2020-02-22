//npm install > npm install express > npm install nodemon

const express = require("express");
const welcome = require("./welcome/welcome")

const server = express()
const port = 3000;

server.use(express.json())


server.use("/", welcome),



server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)  
})
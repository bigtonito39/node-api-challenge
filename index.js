//npm install > npm install express > npm install nodemon > npm install dotenv (thi is to be able have port dinamically changing in order to be able to communicate with different
//enviroment and therefore be able to deploy our backend api to heroku )

//this is calling the .dev file which is use to setup our port to be dinamic, this has to be called always on top
//make sure to add .env in the gitignore file, so that its not visible in github
require("dotenv").config();

const express = require("express");
const welcome = require("./welcome/welcome")
const logger = require("./middleware/logger")
const projectsRouter = require("./projects/projects")
const actionsRouter = require("./actions/actions")
const helmet = require("helmet")

const server = express()
//Here we are calling our port from .env file
const port = process.env.PORT;

//using helmet here to add security to my API, from hackers lol
server.use(helmet());
server.use(express.json())
server.use(logger("short")) //to log short version of moves i do

server.use("/", welcome),
server.use("/api/projects", projectsRouter)
server.use("/api/actions",actionsRouter )




server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)  
})
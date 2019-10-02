const express = require("express") // import express module
const cors = require("cors") // import body-parser module
const users = require("./routes/users");
const posts = require("./routes/posts");
const auth = require("./routes/auth");

const server = express()

// process env is a value from Heroku
const port = process.env.PORT || 8000

// for using cors
server.use(cors())
// set bodyParser to use
server.use(express.json())

// router
server.use("/posts", posts);
server.use("/user", users)
server.use("/auth", auth)

// create server with port variable
server.listen(port, error => {
  if (error) {
    console.error("Server connection fail", error)
  } else {
    console.log(`Server started on port ${port}`)
  }
})
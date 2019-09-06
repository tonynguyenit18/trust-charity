const express = require("express") // import express module
const bodyParser = require("body-parser") // import body-parser module
const cors = require("cors") // import body-parser module

const server = express()

// process env is a value from Heroku
const port = process.env.PORT || 8000

// for using cors
server.use(cors())
// set bodyParser to use
server.use(bodyParser.json())

// router
server.use([require("./routes/users"), require("./routes/posts")])

server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

// create server with port variable
server.listen(port, error => {
  if (error) {
    console.error("Server connection fail", error)
  } else {
    console.log(`Server started on port ${port}`)
  }
})
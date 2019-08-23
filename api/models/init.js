const mongoose = require("mongoose") // import mongoose module
require('dotenv').config()

// use promise
mongoose.Promise = global.Promise

// set mongo
const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@trustcharity-f0uck.mongodb.net/test?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to mongo database")
  })
  .catch(error => {
    console.error("Error connecting to MongoDB database", error)
  })

module.exports = mongoose



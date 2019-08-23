const mongo = require("./init") // initialize connection with mondodb

// define model's schema
const userSchema = new mongo.Schema(
  {
    address: String,
    userName: String,
    email: String,
    password: String,
    role: Number,
  },
  {
    timestamps: true // add updated at and created at timestamps
  }
)

// cretae User model with the schema
const User = mongo.model("User", userSchema)

module.exports = User
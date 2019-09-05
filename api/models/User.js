const mongo = require("./init") // initialize connection with mondodb

// define model's schema
const userSchema = new mongo.Schema(
  {
    address: String,
    userName: String,
    email: String,
    password: String,
    role: { type: Number, default: 0 }, //0:donatee, 1:donator, 2:internal user
  },
  {
    timestamps: true // add updated at and created at timestamps
  }
)

// cretae User model with the schema
const User = mongo.model("User", userSchema)

module.exports = User
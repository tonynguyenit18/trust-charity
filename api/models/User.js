const mongo = require("./init") // initialize connection with mondodb

// define model's schema
const userSchema = new mongo.Schema(
  {
    publicAddress: String,
    userName: String,
    email: String,
    password: String,
    nonce: {
      allowNull: false,
      type: Number,
      default:Math.floor(Math.random() * 10000) // Initialize with a random nonce
    },
    role: { type: Number, default: 0 }, //0:donatee, 1:donator, 2:internal user
  },
  {
    timestamps: true // add updated at and created at timestamps
  }
)

// cretae User model with the schema
const User = mongo.model("User", userSchema)

module.exports = User
const mongo = require("./init") // initialize connection with mondodb

// define model's schema
const postSchema = new mongo.Schema(
  {
    title: String,
    imageUrl: String,
    status: Number,
    description: String,
    user_id: String,
    location: String,
  },
  {
    timestamps: true // add updated at and created at timestamps
  }
)

// cretae Post model with the schema
const Post = mongo.model("Post", postSchema)

module.exports = Post
const mongo = require("./init") // initialize connection with mondodb

// define model's schema
const postSchema = new mongo.Schema(
  {
    title: String,
    imageUrl: String,
    status: { type: Number, default: 0 }, // 0:pending 1:processing 2:rejected 3:success
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
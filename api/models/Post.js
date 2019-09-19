const mongo = require("./init") // initialize connection with mondodb
const mongoose = require("mongoose")
const autoIncrement = require('mongoose-auto-increment');

// initialize the autoIncrement npm
autoIncrement.initialize(mongoose.connection)

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
// set auto increment id plugin
postSchema.plugin(autoIncrement.plugin, 'Post');
// cretae Post model with the schema
const Post = mongo.model("Post", postSchema)

module.exports = Post
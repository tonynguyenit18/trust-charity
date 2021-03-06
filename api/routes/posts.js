const express = require("express");
const Post = require('../models/Post')
const S3 = require('../controller/S3Controller')

const router = new express.Router();

// get all posts
router.get("/", (req, res) => {
  Post.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.json({ error });
    });
});

// get new posts (status 0)
router.get("/new", (req, res) => {
  Post.find()
    .where('status').equals(0)
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.json({ error });
    });
});

//create
router.post("/", (req, res) => {
  const attributes = req.body;
  Post.create(attributes)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// update
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Post.findByIdAndUpdate(id, changes)
    .then(post => {
      if (post) {
        res.json({ message: `${post.title} is updated` });
      } else {
        res.status(404).json({ message: `could not find id with ${id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// upload image
router.post('/sign_s3', (req, res) => {
  S3.sign_s3(req, res)
})


module.exports = router;
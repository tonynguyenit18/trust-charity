const express = require("express");
const Post = require('../models/Post')

const router = new express.Router();

router.get("/posts", (req, res) => {
  Post.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.json({ error });
    });
});

//create
router.post("/posts", (req, res) => {
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
router.patch("/posts/:id", (req, res) => {
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


module.exports = router;
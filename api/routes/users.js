const express = require("express");
const User = require('../models/User')

const router = new express.Router();

router.get("/users", (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.json({ error });
    });
});

//create
router.post("/users", (req, res) => {
  const attributes = req.body;
  User.create(attributes)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});


router.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  User.findByIdAndUpdate(id, changes)
    .then(user => {
      if (user) {
        res.json({ message: `${user.userName} is updated` });
      } else {
        res.status(404).json({ message: `could not find id with ${id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});


module.exports = router;
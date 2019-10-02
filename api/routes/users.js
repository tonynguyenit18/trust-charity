const express = require("express");
const User = require('../models/User')
const bcrypt = require('bcrypt')

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
  const userData = req.body;
  User.findOne({
    email: req.body.email
  })
    .then(user => {

      //console.log(user.email_verification_status,'Status');
      console.log(user, 'Checking the user from from input with  mongo db user,(null) means no user in db');
      // We have a new user! Send them a confirmation email.
      if (!user) {
        console.log(user, 'Could not find user');
        //Encrypt the user password before sending it to db
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash

          console.log(userData.password, "Encrypted password")
          //No user with that email in db so create new one//
          User.create(userData)
            .then(user => {
              res.status(201).json(user);
            })
            .catch(error => {
              res.status(400).json({ error: error.message });
            });
        })
      }
      else{
        console.log("Already registered");

      }
    })
    .catch(err=>console.log(err))
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
const express = require("express");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/authMiddleware")


const router = new express.Router();

// get users by role
router.get("/", (req, res) => {
  const useRole = req.query.role
  User.find()
    .where('role').equals(useRole)
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.json({ error });
    });
});

router.post("/", async (req, res) => {
  let { userName, email, password, role, address } = req.body;
  email = email.toLowerCase();
  role = role.toLowerCase();

  if (!userName || !email || !password || !role) {
    return res.status(400).json({ msg: "A required field is missing!" })
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: "Email have already existed!" })
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.json({ msg: "An error occurs when hashing password. Please try again" })
    }
    const newUser = new User({
      userName,
      password: hash,
      email,
      role,
      address
    })

    try {
      await newUser.save().then(user => {
        user = user._doc
        delete user.password
        jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 }, (err, token) => {
          if (err) throw err;
          user.token = token;
          res.status(200)
            .json({
              user
            })
        })
      });
    } catch (error) {
      console.error(error);
      return res.json({ msg: "An error occurs when hashing password. Please try again" })
    }
  })
})

router.get("/me", authMiddleware, (req, res) => {
  try {
    User.findById(req.userId).select("-password").then(async user => {
      const userWithToken = await getUserWithToken(user);
      return res.status(200).json({ user: userWithToken })
    })
  } catch (error) {
    return res.status(400).json({ msg: "Current user info is not found!" })
  }
})

const getUserWithToken = (user) => {
  const promise = new Promise((resolve, reject) => {
    user = user._doc
    delete user.password
    jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 }, (err, token) => {
      if (err) reject(err);
      user.token = token;
      resolve(user)
    })
  })

  return promise;
}


module.exports = router;
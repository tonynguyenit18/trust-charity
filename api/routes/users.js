const express = require("express");
const User = require('../models/User');
const jwt = require("jsonwebtoken")

const router = new express.Router();

router.post("/", (req, res) => {
  const { address, userName, email, password } = req.body;
  console.log(req.body)
})



module.exports = router;
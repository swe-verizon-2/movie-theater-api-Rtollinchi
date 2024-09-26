const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  try {
    const allUser = await User.findAll();

    res.json(allUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

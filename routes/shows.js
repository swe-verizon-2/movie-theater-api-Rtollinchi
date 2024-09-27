const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Show } = require("../models");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  try {
    const allShows = await Show.findAll();

    res.json(allShows);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);

    res.json(show);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

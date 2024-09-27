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

router.get("/:id/users", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);

    const users = await show.getUsers();

    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    const updatedShow = await show.update({ available: req.body.available });

    res.json(updatedShow);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

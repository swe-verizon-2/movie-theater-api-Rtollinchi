const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Show } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const allUser = await User.findAll();

    res.json(allUser);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/shows", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const shows = await user.getShows();

    res.json(shows);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId/show/:showId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const show = await Show.findByPk(req.params.showId);

    await user.addShow(show);

    res.json({
      message: `User ${user.id} is now associated with Show ${show.id}`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

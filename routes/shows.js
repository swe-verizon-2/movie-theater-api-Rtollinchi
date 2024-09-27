const express = require("express");
const router = express.Router();
const { Show } = require("../models");


router.get("/", async (req, res, next) => {
  try {
    const genre = req.query.genre;
    let shows;

    if (genre) {
      shows = await Show.findAll({ where: { genre: genre } });
    } else {
      shows = await Show.findAll();
    }

    res.json(shows);
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

router.put("/:id/available", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    const updatedShow = await show.update({ available: req.body.available });

    res.json(updatedShow);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedShow = Show.destroy({ where: { id: req.params.id } });

    res.json(deletedShow);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

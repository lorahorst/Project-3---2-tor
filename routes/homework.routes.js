const express = require("express");
const mongoose = require("mongoose");
const Homework = require("../models/Homework.model");
const { authenticate } = require("../middlewares/jwt.middleware")

const router = express.Router();


// create homework

router.post("/", authenticate, async (req, res) => {
  const { title } = req.body;
  const { content } = req.body;
  const homework = await Homework.create({ title, content, user: req.jwtPayload.user._id });
  res.status(200).json(homework);
});


// get all homework

router.get("/", authenticate, async (req, res) => {
  const homeworks = await Homework.find().populate("user");
  res.status(200).json(homeworks);
});



// get all homework from a certain user

router.get("/owned", authenticate, async (req, res) => {
  // find homework associated with a user
  const homework = await Homework.find({
    user: req.jwtPayload.user._id,
  }).populate("user");
  res.status(200).json(homework);
});


// get one homework by id

router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const homework = await Homework.findById(id);
  res.status(200).json(homework);
});


// delete homework by id

router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const homework = await Homework.findById(id);
  if (homework.user.toString() === req.jwtPayload.user._id) {
    await Homework.findByIdAndDelete(id);
    res.status(200).json(homework);
  } else {
    res.status(400).json("unauthorized");
  }
});



// edit homework by id

router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  let homework = await Homework.findById(id);
  if (homework.user.toString() === req.jwtPayload.user._id) {
    homework.content = content;
    homework = await homework.save();
    res.status(200).json(homework);
  } else {
    res.status(400).json("unauthorized");
  }
});



module.exports = router;
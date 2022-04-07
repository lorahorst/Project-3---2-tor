const express = require("express");
const mongoose = require("mongoose");
const Solution = require("../models/Solution.model");
const { authenticate } = require("../middlewares/jwt.middleware")

const router = express.Router();


// create solution

router.post("/", authenticate, async (req, res) => {
    const { content } = req.body;
    const solution = await Solution.create({ content, user: req.jwtPayload.user._id });
    res.status(200).json(solution);
  });
  
  
  
  
  // get all solutions
  
  router.get("/", authenticate, async (req, res) => {
    const solutions = await Solution.find().populate("user");
    res.status(200).json(solutions);
  });
  
  
  
  
  // get all solutions from a certain user
  
  router.get("/owned", authenticate, async (req, res) => {
    // find homework associated with a user
    const solution = await Solution.find({
      user: req.jwtPayload.user._id,
    }).populate("user");
    res.status(200).json(solution);
  });
  
  
  
  
  // get one solution by id
  
  router.get("/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const solution = await Solution.findById(id);
    res.status(200).json(solution);
  });
  
  
  
  
  // delete solution by id
  
  router.delete("/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const solution = await Solution.findById(id);
    if (solution.user.toString() === req.jwtPayload.user._id) {
      await Solution.findByIdAndDelete(id);
      res.status(200).json(solution);
    } else {
      res.status(400).json("unauthorized");
    }
  });
  
  
  
  
  // edit solution by id
  
  router.put("/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    let solution = await Solution.findById(id);
    if (solution.user.toString() === req.jwtPayload.user._id) {
        solution.content = content;
        solution = await solution.save();
      res.status(200).json(solution);
    } else {
      res.status(400).json("unauthorized");
    }
  });
  
  

module.exports = router;
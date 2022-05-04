const express = require("express");
const mongoose = require("mongoose");
const Homework = require("../models/Homework.model")
const Solution = require("../models/Solution.model");
const { authenticate } = require("../middlewares/jwt.middleware")

const router = express.Router();


// create solution

router.post("/:id", authenticate, async (req, res) => {
    const { solutionContent } = req.body;
    const homework = await Homework.findById(req.params.id);
    const solution = await Solution.create({ solutionContent, user: req.jwtPayload.user._id });
    await solution.save();
    homework.solutions.push(solution.id)
    await homework.save();
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
    const { solutionContent } = req.body;
    let solution = await Solution.findById(id);
    if (solution.user.toString() === req.jwtPayload.user._id) {
        solution.solutionContent = solutionContent;
        solution = await solution.save();
      res.status(200).json(solution);
    } else {
      res.status(400).json("unauthorized");
    }
  });
  
  

module.exports = router;
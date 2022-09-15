const express = require("express");
const emp = require("../model/emp");
const route = express.Router();
const model = require("../model/emp");
const { body, validationResult } = require("express-validator");

// getting all data
route.get("/", async (req, res) => {
  try {
    const emp = await model.find();
    res.json(emp);
  } catch (err) {
    res.json(err.message);
  }
});

// getting one data
route.get("/:id", async (req, res) => {
  try {
    const emp = await model.findById(req.params.id);
    res.json(emp);
  } catch (err) {
    res.json(err.message);
  }
});

// craeting data
route.post(
  "/emp",
  [
    body("name", "name is invalid").isLength({ min: 5 }),
    body("email", "email is invalid").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const Employee = new model({
      name: req.body.name,
      email: req.body.email,
      destination: req.body.destination,
    });

    try {
      const emp = await Employee.save();
      res.json(emp);
    } catch (err) {
      res.json(err.message);
    }
  }
);
//updating data

route.patch("/emp/:id", async (req, res) => {
  try {
    const emp = {
      destination: req.body.destination,
    };
    const update = await model.findByIdAndUpdate(req.params.id, emp);
    res.json(update);
  } catch (err) {
    res.json(err.message);
  }
});

// delating data

route.delete("/emp/:id", async (req, res) => {
  try {
    const emp = await model.findOneAndDelete(req.params.id);

    res.json(emp);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = route;

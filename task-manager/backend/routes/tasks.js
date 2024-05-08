const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Tasks using: GET "/api/tasks/fetchalltasks"
router.get("/fetchalltasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addtask",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description"),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = new Task({
        title,
        description,
      });

      const savedTask = await task.save();

      res.json(savedTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;

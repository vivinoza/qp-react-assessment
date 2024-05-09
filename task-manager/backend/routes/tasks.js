const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Tasks using: GET "/api/tasks/fetchalltasks"
router.get("/fetchalltasks", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const tasks = await Task.find().skip(skip).limit(limit);

    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new task using: POST "/api/tasks/addtask"
router.post(
  "/addtask",
  [
    body("title", "Enter a valid title"),
    body("description", "Enter a valid description"),
  ],
  async (req, res) => {
    try {
      const { title, description, completed } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = new Task({
        title,
        description,
        completed
      });

      const savedTask = await task.save();

      res.json(savedTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Delete an existing task using: DELETE "/api/tasks/deletetask"
router.delete("/deletetask/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    task = await Task.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", task: task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Update an existing Task using: PUT "/api/tasks/updatestatus"
router.put('/updatestatus/:id', async (req, res) => {
  const { completed } = req.body;
  try {
      let task = await Task.findById(req.params.id);

      task = await Task.findByIdAndUpdate(req.params.id, { completed: completed }, { new: true })
      res.json({ task });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

module.exports = router;

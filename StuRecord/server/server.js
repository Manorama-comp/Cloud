const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  course: String
});

const Student = mongoose.model("Student", StudentSchema);

// GET all students
app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// POST student
app.post("/students", async (req, res) => {
  const newStudent = new Student(req.body);
  const saved = await newStudent.save();
  res.json(saved);
});

// PUT (update student)
app.put("/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5001, () => console.log("Server running on port 5001"));
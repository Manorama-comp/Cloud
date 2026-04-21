const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const PostSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", PostSchema);

// ================= ROUTES =================

// GET all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    console.log("GET /posts called");
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST new post
app.post("/posts", async (req, res) => {
  console.log("POST request:", req.body);

  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE post
app.delete("/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    console.log("Deleted post:", req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ==========================================

// Server Start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
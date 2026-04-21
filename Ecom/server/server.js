const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Product Schema
const Product = mongoose.model("Product", {
  name: String,
  price: Number
});

// Order Schema
const Order = mongoose.model("Order", {
  productName: String,
  price: Number
});

// Default Products (auto insert)
app.get("/products", async (req, res) => {
  let products = await Product.find();

  if (products.length === 0) {
    products = await Product.insertMany([
      { name: "Laptop", price: 50000 },
      { name: "Phone", price: 20000 },
      { name: "Headphones", price: 2000 }
    ]);
  }

  res.json(products);
});

// Simulate Purchase
app.post("/buy", async (req, res) => {
  const order = new Order(req.body);
  await order.save();

  console.log("Order placed:", req.body);

  res.json({ message: "Purchase Successful" });
});

// View Orders (optional)
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Cancel Order
app.delete("/orders/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order Cancelled" });
});

app.listen(5002, () => console.log("Server running on port 5002"));
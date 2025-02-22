const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));


app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Define a model (example)
const Item = mongoose.model("Item", new mongoose.Schema({
  name: String,
  description: String,
}));

// Fetch data from MongoDB
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items
    res.json(items);  // Send items as JSON response
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items", error: err });
  }
});

app.get("/", (req, res) => {
  res.send("Backend server is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//sks
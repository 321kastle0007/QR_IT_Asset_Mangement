const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const port = 5000;

// MongoDB Atlas URI (replace with your own)
const DB_URI =
  "mongodb+srv://Kastle:Kastle0007@inventory.yoh5i.mongodb.net/?retryWrites=true&w=majority&appName=Inventory";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Asset Schema (for asset information)
// Updated to reference the "hardwareinfos" collection
const assetSchema = new mongoose.Schema(
  {
    cpu: Object,
    ram: Object,
    disks: Array,
    os: Object,
    gpu: Array,
    network: Object,
    battery: Object,
    software: Array,
    asset_id: { type: String, required: true, unique: true },
    is_changed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "hardwareinfos" } // Explicitly defining the collection name
);

const Asset = mongoose.model("Asset", assetSchema);

// Signup Endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
});

// Assets Endpoint - Fetch asset information (no token required)
app.get("/assets", async (req, res) => {
  try {
    const assets = await Asset.find();
    if (assets.length === 0) {
      return res.status(404).json({ message: "No assets found" });
    }
    res.status(200).json(assets); // Send asset data to frontend
  } catch (err) {
    res.status(500).json({ message: "Error fetching assets", error: err });
  }
});

// POST endpoint to add a new asset (for testing purposes)
app.post("/assets", async (req, res) => {
  const { cpu, ram, disks, os, gpu, network, battery, software, asset_id } =
    req.body;
  try {
    const newAsset = new Asset({
      cpu,
      ram,
      disks,
      os,
      gpu,
      network,
      battery,
      software,
      asset_id,
      is_changed: false,
    });

    await newAsset.save();
    res
      .status(201)
      .json({ message: "Asset added successfully", asset: newAsset });
  } catch (err) {
    res.status(500).json({ message: "Error adding asset", error: err });
  }
});

// Summary Endpoint - Get a brief summary of assets
app.get("/assets/summary", async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const changedAssets = await Asset.countDocuments({ is_changed: true });
    const unchangedAssets = totalAssets - changedAssets;

    res.status(200).json({
      totalAssets,
      changedAssets,
      unchangedAssets,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching asset summary", error: err });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

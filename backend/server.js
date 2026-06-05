// Imports
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import managementRoutes from "./routes/managementRoute.js";
import connectDB from "./database/db.js";
import cors from "cors";
import formidable from "express-formidable";

// .env configuration
dotenv.config();

// MongoDB configuration
connectDB();

// Express configuration
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(formidable());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/management", managementRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Dramantram Backend</h1>");
  console.log("Welcome to Dramantram Backend");
});

// Port
app.listen(PORT, () => {
  console.log(`Dramantram Server is running on port ${PORT}`);
});

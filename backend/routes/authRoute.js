import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

// Router object
const router = express.Router();

// Routing

// REGISTER || Method POST
router.post("/register", registerController);

// LogIn
router.post("/login", loginController);

export default router;

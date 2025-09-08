import express from "express";
import { isAuthenticated } from "../middleware/authUser.js";
import { register, login, logout, getMyProfile } from "../controller/user.controller.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

// Protected route to get the logged-in user's profile
router.get("/my-profile", isAuthenticated, getMyProfile);

export default router;

import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
export const isAuthenticated = async (req, res, next) => {
  try {
    // Get JWT token from cookies
    const token = req.cookies.jwt;
    console.log("Middleware : ", token);

    // If no token is found
    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user from token's payload
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to request object for later use
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in Authentication: " + error);
    return res.status(401).json({ error: "User not authenticated" });
  }
};

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cors from "cors";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();

const port = process.env.PORT || 4001;
const MONGO_URL = process.env.MONGO_URI; // ✅ Corrected spelling

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

// Ensure upload temp directory exists
const tmpDirPath = path.resolve("./tmp");
if (!fs.existsSync(tmpDirPath)) {
  fs.mkdirSync(tmpDirPath, { recursive: true });
}

// MongoDB Connection
mongoose
  .connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// Server Start
app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});

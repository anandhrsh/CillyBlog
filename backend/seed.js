import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import { Blog } from "./models/blog.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const sampleBlogs = (userId) => [
  {
    title: "Getting Started with JavaScript",
    category: "Programming",
    about:
      "An introductory guide to JavaScript covering variables, functions, and basic DOM manipulation to kickstart your web development journey.",
    createdBy: userId,
    blogImage: {
      public_id: "seed-js",
      url: "https://via.placeholder.com/800x450.png?text=JavaScript+Basics",
    },
  },
  {
    title: "Top 5 Tips for React Beginners",
    category: "React",
    about:
      "Practical advice for new React developers: component structure, props vs state, hooks, and how to think in React effectively.",
    createdBy: userId,
    blogImage: {
      public_id: "seed-react",
      url: "https://via.placeholder.com/800x450.png?text=React+Tips",
    },
  },
  {
    title: "Understanding REST APIs",
    category: "Backend",
    about:
      "A simple explanation of REST principles, common HTTP methods, and how clients and servers communicate in modern web apps.",
    createdBy: userId,
    blogImage: {
      public_id: "seed-rest",
      url: "https://via.placeholder.com/800x450.png?text=REST+APIs",
    },
  },
];

async function run() {
  try {
    if (!MONGO_URI) {
      console.error("Missing MONGO_URI in environment");
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    // Ensure a demo user exists to own the blogs
    let demo = await User.findOne({ email: "demo@example.com" });
    if (!demo) {
      demo = await User.create({
        name: "Demo User",
        email: "demo@example.com",
        phone: 9999999999,
        education: "B.Tech",
        role: "user",
        password: "seeded-password-does-not-matter",
        photo: { public_id: "seed-user", url: "" },
      });
    }

    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(sampleBlogs(demo._id));
      console.log("Inserted sample blogs");
    } else {
      console.log(`Blogs already exist (count=${count}), skipping insert`);
    }

    console.log("Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
}

run();



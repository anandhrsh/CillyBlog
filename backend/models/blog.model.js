import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },

  blogImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength: [20, "Should contain atleast 20 characters!"],
  },

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publishDate: {
    type: Date,
  },
});
export const Blog = mongoose.model("Blog", blogSchema);

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [about, setAbout] = useState("");
    const [author, setAuthor] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [blogImage, setBlogImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!author || !publishDate || !title || !category || !about) {
            toast.error("Please fill author, publish date, title, category and content");
            return;
        }
        const wordCount = about.trim().split(/\s+/).length;
        if (wordCount < 150) {
            toast.error("Content must be at least 150 words");
            return;
        }
        try {
            setSubmitting(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("about", about);
            if (author) formData.append("author", author);
            if (publishDate) formData.append("publishDate", publishDate);
            formData.append("blogImage", blogImage);

            const { data } = await axios.post(
                "http://localhost:4001/api/blogs/create",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            toast.success(data.message || "Blog created");
            setTitle("");
            setCategory("");
            setAbout("");
            setAuthor("");
            setPublishDate("");
            setBlogImage(null);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to create blog";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto max-w-2xl p-6">
            <Toaster position="top-right" />
            <h1 className="text-2xl font-semibold mb-6">Write a Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Author name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    placeholder="Date of publish"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    rows="6"
                    placeholder="Write at least 150 words about your post"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBlogImage(e.target.files[0] || null)}
                    className="w-full"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md"
                >
                    {submitting ? "Publishing..." : "Publish"}
                </button>
            </form>
        </div>
    );
}



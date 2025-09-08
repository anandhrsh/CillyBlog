// console.log("All blogs:", blogs);
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Devotional() {
  const { blogs } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When blogs change, set loading to false
    setLoading(false);
  }, [blogs]);

  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");
  console.log(devotionalBlogs);

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <h1 className="text-2xl font-bold mb-6">Devotional</h1>
        <p className="text-center mb-8">
          The concept of gods varies widely across different cultures,
          religions, and belief systems
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {loading ? (
            <div className="flex h-screen items-center justify-center">
              Loading....
            </div>
          ) : devotionalBlogs && devotionalBlogs.length > 0 ? (
            devotionalBlogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">{blog?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            [
              { title: "Mahadev", img: "/mahadev.jpg", category: "Devotion" },
              { title: "Ramayan", img: "/ramayan.jpg", category: "Devotion" },
              { title: "Mahabharat", img: "/mahabharat.jpg", category: "Devotion" },
              { title: "Ganesha", img: "/Ganesha.jpg", category: "Devotion" },
              { title: "Laxmi", img: "/lord-laxmi.jpg", category: "Festival" },
              { title: "Eid", img: "/eid.jpg", category: "Festival" },
            ].map((f, i) => (
              <div
                key={i}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img src={f.img} alt={f.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{f.title}</h2>
                  <p className="text-sm">{f.category}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Devotional;

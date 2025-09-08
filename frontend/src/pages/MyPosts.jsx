import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/blogs/my-blog", {
          withCredentials: true,
        });
        setPosts(data || []);
      } catch (e) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Posts</h1>
      {posts.length === 0 ? (
        <p>You have not posted any blog to see!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <div key={p._id} className="bg-white rounded shadow overflow-hidden">
              <img src={p.blogImage?.url} alt={p.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{p.title}</h2>
                <p className="text-sm text-gray-500 mb-1">{p.category}</p>
                <p className="text-xs text-gray-400 mb-1">{new Date(p.createdAt).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500 mb-2">By {p.createdBy?.name || "You"}</p>
                <Link to={`/blog/${p._id}`} className="text-blue-600 text-sm">Read</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


